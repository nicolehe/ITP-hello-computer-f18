const synth = window.speechSynthesis;
let phrase = '';

const speak = text => {
  if (synth.speaking) {
    console.error('speechSynthesis.speaking');
    return;
  }
  let utterThis = new SpeechSynthesisUtterance(text);
  synth.speak(utterThis);
};

document.querySelector('#button').onclick = () => {
  console.log('button clicked');
  let textInput = document.querySelector('#text-input').value;
  let split = textInput.split('');

  split.forEach(letter => {
    console.log(letter);

    switch (letter) {
      case 'h':
        phrase += 'heh';
        break;
      case 'e':
        phrase += 'ee';

        break;
      case 'l':
        phrase += 'luh';
        break;
      case 'o':
        phrase += 'oh';
        break;
      case 'w':
        phrase += 'wuh';
        break;
      case 'r':
        phrase += 'err';
        break;

      case 'd':
        phrase += 'duh';
        break;
      default:
    }
  });

  console.log(phrase);
  speak(phrase);
};
