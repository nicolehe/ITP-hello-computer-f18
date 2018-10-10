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
    let firstResponse;
    
    if (dreamSentiment.score < -2) {
        firstResponse = 'You are going to have a horrible day!';
    } else if (dreamSentiment.score >= -2 && dreamSentiment.score < 2) {
        firstResponse = 'Your day is gonna be fine.';
    } else {
        firstResponse = 'OMG you are gonna have the best day ever!';
    }
    
    
    conv.data.firstResponse = firstResponse;
    conv.data.myCat = 'Disco';
    
    console.log(conv.data);
    conv.ask('Very interesting! Tell me, what is your favorite animal?');
});

exports.fortuneTeller = functions.https.onRequest(app);
