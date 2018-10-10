const functions = require('firebase-functions');
const { dialogflow } = require('actions-on-google');
const Sentiment = require('sentiment');
const sentiment = new Sentiment();

const app = dialogflow();

app.intent('Default Welcome Intent', conv => {
  conv.ask('Hello, you can ask for your fortune.');
});

app.intent('get fortune', (conv, params) => {
  conv.ask(`Hello, ${params.name}, what did you dream about last night?`);
});

app.intent('dreams', (conv) => {
    const dreamSentiment = sentiment.analyze(conv.query);
    console.log(dreamSentiment);
    let day;
    
    if (dreamSentiment.score < -2) {
        day = 'You are going to have a horrible day!';
    } else if (dreamSentiment.score >= -2 && dreamSentiment.score < 2) {
        day = 'Your day is gonna be fine.';
    } else {
        day = 'OMG you are gonna have the best day ever!';
    }
    
    conv.close(`${day}`);
});

exports.fortuneTeller = functions.https.onRequest(app);
