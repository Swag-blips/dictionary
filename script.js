"use strict";

document.addEventListener("DOMContentLoaded", () => {
  //get important dom elements
  let search = document.getElementById("search-input");
  let play = document.getElementById("play");
  let mainText = document.getElementById("main-text");
  let phonetics = document.getElementById("phonetics");
  let definitionsContainer = document.getElementById("definitions");
  let synonymContainer = document.getElementById("synonym-container");
  let verbContainer = document.getElementById("verb");
  let error = "";

  // fetch the word using the searchValue as reference
  const fetchWord = async function (value) {
    try {
      const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${value}`;
      const response = await fetch(url);
      const data = await response.json();

      displayText(data);
      getVerb(data);
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
    synonymContainer.innerHTML = "";

    const definitions = mainWord.meanings[0].definitions.slice(0, 3);
    const synonyms = mainWord.meanings;

    definitions.forEach((definition, index) => {
      let li = document.createElement("li");
      li.innerText = `${definition.definition}`;
      definitionsContainer.appendChild(li);
    });
    synonyms.forEach((synonym, index) => {
      let firstSynonym = synonym.synonyms[0];

      if (firstSynonym !== undefined && firstSynonym !== null) {
        let p1 = document.createElement("p");
        let p2 = document.createElement("p");
        p1.innerText = "Synonyms";
        p2.innerText = firstSynonym;
        p1.classList.add("text-[#757575]", "text-[16px]");
        p2.classList.add("text-[16px]", "text-[#A445ED]", "opacity-100");
        synonymContainer.appendChild(p1);
        synonymContainer.appendChild(p2);
      }
    });
  };

  const getVerb = (value) => {
    const mainWord = value[0];
    const verb = mainWord.meanings.find(
      (meaning) => meaning.partOfSpeech === "verb"
    );
    console.log(verb);
    verbContainer.innerHTML = "";
    if (verb) {
      verb.definitions.forEach((definition) => {
        const li = document.createElement("li");

        li.innerText = definition.definition;
        verbContainer.appendChild(li);
      });
    }

    console.log(verb);
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
