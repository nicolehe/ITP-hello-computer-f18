console.log('hello from script');
const synth = window.speechSynthesis;

const speak = text => {
  if (synth.speaking) {
    console.error('speechSynthesis.speaking');
    return;
  }
  let utterThis = new SpeechSynthesisUtterance(text);
  synth.speak(utterThis);
};

document.querySelector('#door1').onclick = () => {
  speak('Sorry, there is nothing behind this door.');
};

document.querySelector('#door2').onclick = () => {
  speak('You find a soggy potato.');
};


document.querySelector('#door3').onclick = () => {
  speak('Wow, you find a magic lamp.');
};

document.querySelector('#door4').onclick = () => {
  speak('You find an old hedgehog minding his own business. He looks very tired.');
};