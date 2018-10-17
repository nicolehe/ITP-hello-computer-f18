The `dialogflow_web` folder contains an example of how to use Dialogflow with client-side JavaScript, via an express server and websockets.

The `functions` folder contains an Dialogflow fulfillment webhook to be hosted on Firebase Cloud Functions (`index.js`), which also writes to a Firebase Firestore Database.

The `node_firebase_reader` folder contains a simple Node script that listens to the Firebase Firestore Database.

## Useful Links

- [Cloud Firestore](https://firebase.google.com/docs/firestore/) 
- [Express](https://expressjs.com/)
- [Socket.io](https://socket.io/)
- [Dialogflow SDKs](https://dialogflow.com/docs/sdks)