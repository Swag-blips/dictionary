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
  let meaning = document.getElementById("meaning");
  let source = document.getElementById("source");
  let error = "";

  // fetch the word using the searchValue as reference
  const fetchWord = async function (value) {
    try {
      const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${value}`;
      const response = await fetch(url);
      const data = await response.json();

      displayDefinitions(data);
      displayVerb(data);
      displaySynonyms(data);
      displaySourceUrl(data);
    } catch (err) {
      console.log(err);
    }
  };

  // function to display definitions
  const displayDefinitions = (value) => {
    const wordFromData = value[0];
    mainText.innerText = wordFromData.word;
    phonetics.innerText = wordFromData.phonetics[0].text;
    definitionsContainer.innerHTML = "";
    synonymContainer.innerHTML = "";

    const definitions = wordFromData.meanings[0].definitions.slice(0, 3);

    definitions.forEach((definition, index) => {
      let li = document.createElement("li");
      li.innerText = `${definition.definition}`;
      definitionsContainer.appendChild(li);
    });
  };

  // function to display synonyms
  const displaySynonyms = (value) => {
    const wordFromData = value[0];
    const synonyms = wordFromData.meanings;

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

  // function to display verbs
  const displayVerb = (value) => {
    const wordFromData = value[0];
    const verb = wordFromData.meanings.find(
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
    } else {
      meaning.innerText = "😕 oops no verb is available";
    }

    console.log(verb);
  };

  const displaySourceUrl = (value) => {
    const wordFromData = value[0];
    source.innerHTML = "";

    if (wordFromData.sourceUrls) {
      wordFromData.sourceUrls.forEach((sourceUrl) => {
        source.href = sourceUrl;
        source.textContent = sourceUrl;
      });
    } else {
      source.href = "";
      source.textContent = "😕 oops no source is available";
    }
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
