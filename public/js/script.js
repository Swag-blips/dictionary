"use strict";
import {
  displayDefinitions,
  displaySourceUrl,
  displaySynonyms,
  displayVerb,
} from "./display.js";
import { applySavedFont, switchFont } from "./font.js";
import { loadSound } from "./sound.js";
import { toggleCheckboxTheme, toggleTheme, applyTheme } from "./theme.js";
import { toggleDropdown } from "./toggle.js";

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

      console.log(data);
      if (!response.ok) {
        throw new Error("Network response was not okay");
      }

      error404.classList.add("hidden");
      mainSection.classList.add("block");

      displayDefinitions(data, mainText, definitionsContainer, phonetics);
      displayVerb(data, meaning, verbContainer, example);
      displaySynonyms(data, synonymText);
      displaySourceUrl(data, source);
      loadSound(data, audioElement, playContainer, playButton, pauseButton);
    } catch (err) {
      console.log(err);
      error404.classList.remove("hidden");
      mainSection.classList.add("hidden");
      error404.classList.add("flex");
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
        error = "Whoops can't be empty";
        search.classList.remove("focus:border-[1px]", "focus:border-[#A445ED]");
        search.classList.add("border-[1px]", "border-[#FF5252]");
        errorText.innerText = error;
        mainSection.classList.add("hidden");
      }
    }
  };

  // Event listeners and functions
  search.addEventListener("keydown", handleSubmit);
  dropdownToggle.addEventListener("click", () =>
    toggleDropdown(dropdownSection)
  );
  serifFont.addEventListener("click", () => switchFont("font-Lora"));
  monoFont.addEventListener("click", () => switchFont("font-inconsolata"));
  sansSerifFont.addEventListener("click", () => switchFont("font-Inter"));
  darkModeToggle.addEventListener("click", () =>
    toggleTheme(darkModeToggleCheckbox)
  );
  darkModeToggleCheckbox.addEventListener("change", () =>
    toggleCheckboxTheme(darkModeToggleCheckbox)
  );
  applySavedFont();
  applyTheme(darkModeToggleCheckbox);
});
