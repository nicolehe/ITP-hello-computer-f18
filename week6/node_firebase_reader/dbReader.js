const admin = require('firebase-admin');

const serviceAccount = require('PATH TO YOUR SERVICE KEY JSON');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

db.collection('fortuneSeekers')
  .doc('latest')
  .onSnapshot(function(doc) {
    console.log('Current data: ', doc.data());
    if (doc.data().name == 'nicole') {
        console.log('move servo');
    }
  });

