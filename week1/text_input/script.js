console.log('hello from script');
const synth = window.speechSynthesis;


const speak = text => {
  if (synth.speaking) {
    console.error('speechSynthesis.speaking');
    return;
  }
  let utterThis = new SpeechSynthesisUtterance(text);
  // utterThis.pitch = 2;
  utterThis.rate = 0.5;
  synth.speak(utterThis);
};

document.querySelector('#button').onclick = () => {
  console.log('button clicked');
  let textInput = document.querySelector('#text-input').value;
  speak(textInput);
};
