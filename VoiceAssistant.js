// VoiceAssistant.js
class VoiceAssistant {
    constructor(config) {
      this.config = {
        lang: 'en-US',
        continuous: true,
        interimResults: false,
        ...config,
      };
      this.isListening = false;
      this.recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      this.recognition.lang = this.config.lang;
      this.recognition.continuous = this.config.continuous;
      this.recognition.interimResults = this.config.interimResults;
      this.intents = {};
      this.setupListeners();
    }
  
    setupListeners() {
      this.recognition.onstart = () => {
        this.isListening = true;
        console.log('Voice assistant has started listening.');
      };
  
      this.recognition.onend = () => {
        this.isListening = false;
        if (this.config.autoRestart) {
          this.start();
        }
      };
  
      this.recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          transcript += event.results[i][0].transcript;
        }
        console.log('Heard:', transcript);
        this.processTranscript(transcript.trim());
      };
    }
  
    start() {
      if (this.isListening) {
        console.warn('Voice assistant is already started.');
        return;
      }
      this.recognition.start();
    }
  
    stop() {
      if (!this.isListening) {
        console.warn('Voice assistant is not listening.');
        return;
      }
      this.recognition.stop();
    }
  
    say(message) {
      const utterance = new SpeechSynthesisUtterance(message);
      speechSynthesis.speak(utterance);
    }
  
    processTranscript(transcript) {
      console.log('Processing transcript:', transcript);
  
      // Go through each intent to see if there's a match
      for (const [key, action] of Object.entries(this.intents)) {
        if (transcript.toLowerCase().includes(key.toLowerCase())) {
          action(transcript);
          return;
        }
      }
  
      // Fallback if no intent is matched
      this.say("Sorry, I didn't understand that. Can you please repeat?");
    }
  
    addIntent(keyword, action) {
      if (typeof keyword === 'string' && typeof action === 'function') {
        this.intents[keyword] = action;
      } else {
        throw new Error('Intent keyword must be a string and action must be a function');
      }
    }
  
    removeIntent(keyword) {
      delete this.intents[keyword];
    }
  
    listIntents() {
      return Object.keys(this.intents);
    }
  }
  
  // Export the class for use in other files if modules are supported
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = VoiceAssistant;
  }
  
  // Example usage:
  // const myAssistant = new VoiceAssistant({ autoRestart: true });
  // myAssistant.addIntent('hello', () => myAssistant.say('Hello, how can I help you?'));
  // myAssistant.start();
  