// main.js
import { intentHandlers } from '/intents/handlers.js';



const handleGreeting = intentHandlers.handleGreeting;
const myAssistant = new VoiceAssistant({ autoRestart: true });

// Load intents from separate scripts
// Suppose you have separate scripts that define functions like `handleGreeting`, `handleTimeQuery`, etc.
myAssistant.addIntent('hello', handleGreeting);
myAssistant.addIntent('time', handleTimeQuery);
// ...

myAssistant.start();
