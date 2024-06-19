"use strict";
import { displayDefinitions } from "./display.js";
import { applySavedFont, switchFont } from "./font.js";
import { loadSound } from "./sound.js";
import { toggleCheckboxTheme, toggleTheme, applyTheme } from "./theme.js";

document.addEventListener("DOMContentLoaded", () => {
  // Get important DOM elements
  let search = document.getElementById("search-input");
  let playContainer = document.getElementById("play-container");
  let mainText = document.getElementById("main-text");
  let phonetics = document.getElementById("phonetics");
  let definitionsContainer = document.getElementById("definitions");
  let synonymText = document.getElementById("synonym-text");
  let verbContainer = document.getElementById("verb");
  let example = document.getElementById("example");
  let meaning = document.getElementById("meaning");
  let source = document.getElementById("source");
  let audioElement = document.getElementById("play-audio");
  let playButton = document.getElementById("play");
  let pauseButton = document.getElementById("pause");
  let mainSection = document.getElementById("main-section");
  let errorText = document.getElementById("error-element");
  let error404 = document.getElementById("404-error");
  let error = "";
  let dropdownToggle = document.getElementById("dropdown-toggle");
  let dropdownSection = document.getElementById("dropdown-section");
  let sansSerifFont = document.getElementById("sans-serif");
  let serifFont = document.getElementById("serif");
  let monoFont = document.getElementById("mono");
  let darkModeToggle = document.getElementById("dark-mode-toggle");
  const darkModeToggleCheckbox = document.getElementById(
    "dark-mode-toggle-checkbox"
  );
  let isToggle = false;

  // Fetch the word using the search value as reference
  const fetchWord = async function (value) {
    try {
      const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${value}`;
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        throw new Error("Network response was not okay");
      }

      error404.classList.add("hidden");
      mainSection.classList.add("block");

      displayDefinitions(data, mainText, definitionsContainer, phonetics);
      displayVerb(data);
      displaySynonyms(data);
      displaySourceUrl(data);
      loadSound(data, audioElement, playContainer, playButton, pauseButton);
    } catch (err) {
      console.log(err);
      error404.classList.remove("hidden");
      mainSection.classList.add("hidden");
      error404.classList.add("flex");
    }
  };

  // Function to display definitions

  // Function to display synonyms
  const displaySynonyms = (value) => {
    const wordFromData = value[0];
    const synonyms = wordFromData.meanings;
    synonymText.innerHTML = "";

    synonyms.forEach((synonym, index) => {
      let firstSynonym = synonym.synonyms[0];

      if (firstSynonym !== undefined && firstSynonym !== null) {
        synonymText.textContent = firstSynonym;
      }
    });
  };

  // Function to display verbs
  const displayVerb = (value) => {
    const wordFromData = value[0];

    const verb = wordFromData.meanings.find(
      (meaning) => meaning.partOfSpeech === "verb"
    );
    console.log(verb);

    meaning.innerText = "Meaning";
    verbContainer.innerHTML = "";
    example.innerText = "";

    let exampleText = [];

    if (verb) {
      verb.definitions.forEach((definition) => {
        const li = document.createElement("li");
        if (definition.example) {
          exampleText.push(definition.example);
        }

        li.innerText = definition.definition;
        li.classList.add("md:text-[18px]", "dark:text-white");
        verbContainer.appendChild(li);
      });
    } else {
      meaning.innerText = "😕 oops no verb is available";
    }

    if (exampleText) {
      exampleText.splice(1);
      exampleText.forEach((example) => {
        const p = document.createElement("p");
        p.classList.add(
          "mt-[16px]",
          "text-[15px]",
          "md:text-[18px]",
          "text-[#757575]"
        );
        p.innerText = `"${example}"`;
        verbContainer.appendChild(p);
      });
    } else {
      const p = document.createElement("p");
      p.classList.add(
        "mt-[16px]",
        "text-[15px]",
        "md:text-[18px]",
        "text-[#757575]"
      );
      p.innerText = " 😕 oops no examples available";
    }
  };

  // Function to display source URL
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

  // Function to toggle dropdown
  const toggleDropdown = () => {
    isToggle = !isToggle;
    console.log(isToggle);

    if (isToggle) {
      dropdownSection.classList.remove("hidden");
      dropdownSection.classList.add("flex");
    } else {
      dropdownSection.classList.add("hidden");
      dropdownSection.classList.remove("flex");
    }
  };

  //fuction to handle submission
  const handleSubmit = (e) => {
    if (e.key === "Enter") {
      let searchValue = search.value.trim();
      if (searchValue) {
        fetchWord(searchValue);
        mainSection.classList.remove("hidden");
        error404.classList.add("hidden");
        search.classList.remove("border-[1px]", "border-[#FF5252]");
        errorText.innerHTML = "";
      } else {
        console.log("Enter a valid word");
        error = "Whoops can't be empty";
        search.classList.remove("focus:border-[1px]", "focus:border-[#A445ED]");
        search.classList.add("border-[1px]", "border-[#FF5252]");
        errorText.innerText = error;
        mainSection.classList.add("hidden");
        console.log(mainSection);
      }
    }
  };

  // Event listeners and functions
  search.addEventListener("keydown", handleSubmit);
  dropdownToggle.addEventListener("click", toggleDropdown);
  serifFont.addEventListener("click", () => switchFont("font-Lora"));
  monoFont.addEventListener("click", () => switchFont("font-inconsolata"));
  sansSerifFont.addEventListener("click", () => switchFont("font-Inter"));
  darkModeToggle.addEventListener("click", () => toggleTheme());
  darkModeToggleCheckbox.addEventListener("change", () =>
    toggleCheckboxTheme(darkModeToggleCheckbox)
  );
  applySavedFont();
  applyTheme(darkModeToggleCheckbox);
});
