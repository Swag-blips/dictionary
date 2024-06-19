export const displayDefinitions = (value, mainTxt, defContainer, phonTxt) => {
  const wordFromData = value[0];
  mainTxt.innerText = wordFromData.word;
  const phoneticsText = wordFromData.phonetics[0].text;
  defContainer.innerHTML = "";

  if (phoneticsText) {
    phonTxt.innerText = phoneticsText;
  } else {
    phonTxt.innerText = "😕 not available";
  }

  const definitions = wordFromData.meanings[0].definitions.slice(0, 3);

  definitions.forEach((definition, index) => {
    let li = document.createElement("li");
    li.innerText = `${definition.definition}`;
    defContainer.appendChild(li);
  });
};

// Function to display synonyms
export const displaySynonyms = (value, synTxt) => {
  const wordFromData = value[0];
  const synonyms = wordFromData.meanings;
  synTxt.innerHTML = "";

  synonyms.forEach((synonym, index) => {
    let firstSynonym = synonym.synonyms[0];

    if (firstSynonym !== undefined && firstSynonym !== null) {
      synTxt.textContent = firstSynonym;
    }
  });
};
