"use strict";

document.addEventListener("DOMContentLoaded", () => {
  //get important dom elements
  let search = document.getElementById("search-input");
  let play = document.getElementById("play");
  let mainText = document.getElementById("main-text");
  let phonetics = document.getElementById("phonetics");
  let definitionsContainer = document.getElementById("definitions");
  let error = "";

  // fetch the word using the searchValue as reference
  const fetchWord = async function (value) {
    try {
      const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${value}`;
      const response = await fetch(url);
      const data = await response.json();

      displayText(data);
    } catch (err) {
      console.log(err);
    }
  };

  // function to display text
  const displayText = (value) => {
    const mainWord = value[0];
    mainText.innerText = mainWord.word;
    phonetics.innerText = mainWord.phonetics[0].text;

    definitionsContainer.innerHTML = "";
    const definitions = mainWord.meanings[0].definitions.slice(0, 3);

    definitions.forEach((definition, index) => {
      let li = document.createElement("li");
      li = `${definition}`;
      definitionsContainer.appendChild(li);
    });
  };

  // Test add eventlistener function
  play.addEventListener("click", () => {
    let searchValue = search.value.trim();
    if (searchValue) {
      fetchWord(searchValue);
    } else {
      console.log("Enter a valid word");
    }
  });
});
