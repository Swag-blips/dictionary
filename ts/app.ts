"use strict";
import {
  displayDefinitions,
  displaySourceUrl,
  displaySynonyms,
  displayVerb,
} from "./display";
import { applySavedFont, switchFont } from "./font";
import { loadSound } from "./sound";
import { toggleDropdown } from "./toggle";
import { toggleCheckboxTheme, toggleTheme, applyTheme } from "./theme";
import { DictionaryResponse } from "./interface";

document.addEventListener("DOMContentLoaded", (): void => {
  // Get important DOM elements
  let search = document.getElementById("search-input") as HTMLInputElement;
  let playContainer = document.getElementById("play-container") as HTMLElement;
  let mainText = document.getElementById("main-text") as HTMLHeadingElement;
  let phonetics = document.getElementById("phonetics") as HTMLParagraphElement;
  let definitionsContainer = document.getElementById(
    "definitions"
  ) as HTMLUListElement;
  let synonymText = document.getElementById(
    "synonym-text"
  ) as HTMLParagraphElement;
  let verbContainer = document.getElementById("verb") as HTMLUListElement;
  let example = document.getElementById("example") as HTMLParagraphElement;
  let meaning = document.getElementById("meaning") as HTMLHeadingElement;
  let source = document.getElementById("source") as HTMLAnchorElement;
  let audioElement = document.getElementById("play-audio") as HTMLAudioElement;
  let playButton = document.getElementById("play") as HTMLImageElement;
  let pauseButton = document.getElementById("pause") as HTMLImageElement;
  let mainSection = document.getElementById("main-section") as HTMLElement;
  let errorText = document.getElementById(
    "error-element"
  ) as HTMLParagraphElement;
  let error404 = document.getElementById("404-error") as HTMLElement;

  let dropdownToggle = document.getElementById(
    "dropdown-toggle"
  ) as HTMLParagraphElement;
  let dropdownSection = document.getElementById(
    "dropdown-section"
  ) as HTMLDivElement;
  let sansSerifFont = document.getElementById(
    "sans-serif"
  ) as HTMLParagraphElement;
  let serifFont = document.getElementById("serif") as HTMLParagraphElement;
  let monoFont = document.getElementById("mono") as HTMLParagraphElement;
  let darkModeToggle = document.getElementById(
    "dark-mode-toggle"
  ) as HTMLImageElement;
  const darkModeToggleCheckbox = document.getElementById(
    "dark-mode-toggle-checkbox"
  ) as HTMLInputElement;
  let isToggle: boolean = false;
  let error: string;

  // Fetch the word using the search value as reference
  const fetchWord = async function (value: string): Promise<void> {
    try {
      const url: string = `https://api.dictionaryapi.dev/api/v2/entries/en/${value}`;
      const response: Response = await fetch(url);
      const data: DictionaryResponse[] = await response.json();

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
      const error: string = "An error occurred ";

      error404.classList.remove("hidden");
      mainSection.classList.add("hidden");
      error404.classList.add("flex");

      if (err instanceof Error) {
        console.error(err);
      }
    }
  };

  //fuction to handle submission
  const handleSubmit = (e: KeyboardEvent): void => {
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
  dropdownToggle.addEventListener("click", (): void =>
    toggleDropdown(dropdownSection)
  );
  serifFont.addEventListener("click", (): void => switchFont("font-Lora"));
  monoFont.addEventListener("click", (): void => switchFont("font-inconsolata"));
  sansSerifFont.addEventListener("click", (): void => switchFont("font-Inter"));
  darkModeToggle.addEventListener("click", (): void =>
    toggleTheme(darkModeToggleCheckbox)
  );
  darkModeToggleCheckbox.addEventListener("change", (): void =>
    toggleCheckboxTheme(darkModeToggleCheckbox)
  );
  applySavedFont();
  applyTheme(darkModeToggleCheckbox);
});
