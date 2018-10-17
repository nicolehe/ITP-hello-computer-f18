const functions = require('firebase-functions');
const { dialogflow, BasicCard, Button, Image } = require('actions-on-google');
const Sentiment = require('sentiment');
const sentiment = new Sentiment();
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

const docRef = db.collection('fortuneSeekers').doc('latest');

const _ = require('lodash');

const fs = require('fs');
const veggiesRaw = fs.readFileSync('veggies.json');
const veggies = JSON.parse(veggiesRaw);

const app = dialogflow();

app.intent('Default Welcome Intent', conv => {
  let tester = docRef.set({
    name: 'bob',
    age: 12,
    favFoods: ['ice cream', 'noodles']
  });

  console.log(tester);

  conv.ask(
    '<speak> Hi <break time="2s"/>, you can ask for your fortune. <audio src="https://actions.google.com/sounds/v1/horror/aggressive_zombie_snarls.ogg"></audio></speak>'
  );
});

app.intent('get fortune', (conv, params) => {
  docRef.set({ name: params.name });
  conv.ask(`Hello, ${params.name}, what did you dream about last night?`);
});

app.intent('dreams', conv => {
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

app.intent('animal', (conv, params) => {
  conv.data.favAnimal = params.animal;
  conv.ask(
    `So your favorite animal is ${
      conv.data.favAnimal
    }. Fascinating. One more question: what city do you live in?`
  );
});

app.intent('city', (conv, params) => {
  conv.data.city = params.city;
  conv.ask(
    `${conv.data.firstResponse} A ${
      conv.data.favAnimal
    } is going to come and visit you in ${
      conv.data.city
    } and give you ${_.sample(veggies.vegetables)}!`
  );
});

app.intent('card', conv => {
  if (!conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT')) {
    conv.ask(
      'Sorry, try this on a screen device or select the ' +
        'phone surface in the simulator.'
    );
    return;
  }
  conv.ask('card!');
  // Create a basic card
  conv.ask(
    new BasicCard({
      text: `This is a basic card.  Text in a basic card can include "quotes" and
  most other unicode characters including emoji 📱.  Basic cards also support
  some markdown formatting like *emphasis* or _italics_, **strong** or
  __bold__, and ***bold itallic*** or ___strong emphasis___ as well as other
  things like line  \nbreaks`, // Note the two spaces before '\n' required for
      // a line break to be rendered in the card.
      subtitle: 'This is a subtitle',
      title: 'Title: this is a title',
      buttons: new Button({
        title: 'This is a button',
        url: 'https://assistant.google.com/'
      }),
      image: new Image({
        url:
          'https://vectortoons.com/wp-content/uploads/2015/03/zombie-collection-3-005.jpg',
        alt: 'Image alternate text'
      }),
      display: 'CROPPED'
    })
  );
});

exports.fortuneTeller = functions.https.onRequest(app);
