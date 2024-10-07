import { DictionaryResponse } from "./interface";

// Function to display definitions
export const displayDefinitions = (
  value: DictionaryResponse[],
  mainText: HTMLHeadingElement,
  definitionsContainer: HTMLUListElement,
  phonetics: HTMLParagraphElement
) => {
  const wordFromData = value[0];
  mainText.innerText = wordFromData.word;
  const phoneticsText = wordFromData.phonetics?.[0]?.text;
  definitionsContainer.innerHTML = "";

  if (phoneticsText) {
    phonetics.innerText = phoneticsText;
  } else {
    phonetics.innerText = "😕 not available";
  }

  const definitions = wordFromData.meanings[0].definitions.slice(0, 3);

  definitions.forEach((definition, index) => {
    let li: HTMLLIElement = document.createElement("li");
    li.innerText = `${definition.definition}`;
    definitionsContainer.appendChild(li);
  });
};

// Function to display synonyms
export const displaySynonyms = (
  value: DictionaryResponse[],
  synonymText: HTMLParagraphElement
) => {
  const wordFromData = value[0];
  const synonyms = wordFromData.meanings;
  synonymText.innerHTML = "";

  synonyms.forEach((synonym, index) => {
    let firstSynonym = synonym.synonyms?.[0];

    if (firstSynonym !== undefined && firstSynonym !== null) {
      synonymText.textContent = firstSynonym;
    }
  });
};

// Function to display verb
export const displayVerb = (
  value: DictionaryResponse[],
  meaning: HTMLHeadingElement,
  verbContainer: HTMLUListElement,
  example: HTMLParagraphElement
) => {
  const wordFromData = value[0];

  const verb = wordFromData.meanings.find(
    (meaning) => meaning.partOfSpeech === "verb"
  );

  meaning.innerText = "Meaning";
  verbContainer.innerHTML = "";
  example.innerText = "";

  let exampleText: string[] = [];

  if (verb) {
    verb.definitions.forEach((definition) => {
      const li: HTMLLIElement = document.createElement("li");
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
    const p: HTMLParagraphElement = document.createElement("p");
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
export const displaySourceUrl = (
  value: DictionaryResponse[],
  source: HTMLAnchorElement
) => {
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
