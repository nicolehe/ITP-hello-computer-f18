const express = require('express');
const app = express();
const dialogflow = require('dialogflow');
const sessionClient = new dialogflow.SessionsClient({
  keyFilename:
    'PATH TO YOUR SERVICE ACCOUNT JSON'
});

const projectId = 'YOUR PROJECT ID';

app.use(express.static('public'));

const server = app.listen(5004, () => {
  console.log('listening on port 5004!');
});

const io = require('socket.io').listen(server);

io.on('connection', socket => {
  console.log('new user: ' + socket.id);

  socket.on('hi', data => {
    console.log(data);
  });

  socket.on('send to dialogflow', data => {
    console.log(data.query);
    sessionClient
      .detectIntent({
        session: sessionClient.sessionPath(projectId, '12345'),
        queryInput: { text: { text: data.query, languageCode: 'en-US' } }
      })
      .then(responses => {
        const result = responses[0].queryResult;
        console.log(result);
        // do stuff here
      });
  });
});
