console.log('hi');
const SpeechRecognition = webkitSpeechRecognition;
const socket = io.connect();

socket.emit('hi', { name: 'nicole' });

const getSpeech = () => {
    console.log('get speech');
  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';

  recognition.start();

  recognition.onresult = event => {
    const speechResult = event.results[0][0].transcript;
    console.log('result: ' + speechResult);
    socket.emit('send to dialogflow', {query: speechResult});
  };

  recognition.onend = () => {};
};

document.querySelector('#my-button').onclick = () => {
  getSpeech();
};
