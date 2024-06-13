"use strict";

document.addEventListener("DOMContentLoaded", () => {
  //get important dom elements
  let search = document.getElementById("search-input");
  let play = document.getElementById("play");

  // fetch the word using the searchValue as reference
  const fetchWord = async function (value) {
    try {
      const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${value}`;
      const response = await fetch(url);

      const data = await response.json();

      const firstWord = data[0];

      console.log(firstWord);
    } catch (err) {
      console.log(err);
    }
  };

  // Test addeventlistener function
  play.addEventListener("click", () => {
    let searchValue = search.value.trim();

    if (searchValue) {
      fetchWord(searchValue);
    } else {
      console.log("Enter a valid word");
    }
  });
});
