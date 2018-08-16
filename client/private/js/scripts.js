fetch('/auth/getuserinfo')
  .then(response => response.json())
  .then(object => {
    console.log(object);
  });
const header = document.getElementsByTagName('h1')[0];
// console.log() to look first
// set text to userProps.characterName
const image = document.getElementById('user-image');
// set src property to character image
