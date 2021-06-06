// Link all the required page elements:
var lengthRange = document.querySelector("#lengthRange");
var lengthNumber = document.querySelector("#lengthNumber");
var inclUpperElement = document.querySelector("#wantUpper");
var inclNumElement = document.querySelector("#wantNumbers");
var inclSpecialElement = document.querySelector("#wantSpecialChars");
var generateBtn = document.querySelector("#generate");

// Set up the range of ASCII codes for lower, upper, numbers and special chars:
// ASCII source: https://www.petefreitag.com/cheatsheets/ascii-codes/
var allLowers = generateRelevantRange(97, 122);
var allUppers = generateRelevantRange(65, 90);
var allNumbers = generateRelevantRange(48, 57);
var allSpecChars = generateRelevantRange(58, 64);

// sync up the length slider with the length number input,
// so when you change one, it changes the other too
lengthNumber.addEventListener('input', syncLength);
lengthRange.addEventListener('input', syncLength);

function syncLength(val) {
  var value = val.target.value;
  lengthNumber.value = value;
  lengthRange.value = value;
}

// Add event listener to generate button
// When the button is clicked, trigger the function to write the password
generateBtn.addEventListener("click", writePassword);

// build the arrays with the relevant ASCII codes, based on start and end points
function generateRelevantRange(start, end) {
  var array = []
  for (var i = start; i <= end; i++) {
    array.push(i);
  }
  return array;
}

// Generate the password, then write it to the #password text area
function writePassword() {
  // determine which options the user chose
  var pwordLength = lengthNumber.value;
  var inclUpper = inclUpperElement.checked;
  var inclNum = inclNumElement.checked;
  var inclSpecial = inclSpecialElement.checked;

  // warn the user if their length is too small or too long, and don't go any further
  if (pwordLength < 8 || pwordLength >128) {
    alert("Password length needs to be between 8 and 128 characters.");
    return;
  }

  // find the text area, and set its value once the password has been generated
  var password = generatePassword(pwordLength, inclUpper, inclNum, inclSpecial);
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
}

// the logic of the password generation
function generatePassword(pwordLength, inclUpper, inclNum, inclSpecial) {
  // Start with lowercase as the default, compulsory choice
  var charCode = allLowers;
  
  // build the overall list of available codes based on the user's selections:
  if (inclUpper) charCode = charCode.concat(allUppers);
  if (inclNum) charCode = charCode.concat(allNumbers);
  if (inclSpecial) charCode = charCode.concat(allSpecChars);
  
  // build the new password by picking randomly from the list of available codes:
  // (the String.fromCharCode statement is to get the code's value
  var pwordChars = [];
  for (var v = 0; v < pwordLength; v++ ) {
    var character = charCode[Math.floor(Math.random() * charCode.length)]
    pwordChars.push(String.fromCharCode(character));
  }
  // return the newly build password as a string for further use
  return pwordChars.join("");
}

