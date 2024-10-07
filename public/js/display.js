// Function to display definitions
export const displayDefinitions = (value, mainText, definitionsContainer, phonetics) => {
    var _a, _b;
    const wordFromData = value[0];
    mainText.innerText = wordFromData.word;
    const phoneticsText = (_b = (_a = wordFromData.phonetics) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.text;
    definitionsContainer.innerHTML = "";
    if (phoneticsText) {
        phonetics.innerText = phoneticsText;
    }
    else {
        phonetics.innerText = "😕 not available";
    }
    const definitions = wordFromData.meanings[0].definitions.slice(0, 3);
    definitions.forEach((definition, index) => {
        let li = document.createElement("li");
        li.innerText = `${definition.definition}`;
        definitionsContainer.appendChild(li);
    });
};
// Function to display synonyms
export const displaySynonyms = (value, synonymText) => {
    const wordFromData = value[0];
    const synonyms = wordFromData.meanings;
    synonymText.innerHTML = "";
    synonyms.forEach((synonym, index) => {
        var _a;
        let firstSynonym = (_a = synonym.synonyms) === null || _a === void 0 ? void 0 : _a[0];
        if (firstSynonym !== undefined && firstSynonym !== null) {
            synonymText.textContent = firstSynonym;
        }
    });
};
// Function to display verb
export const displayVerb = (value, meaning, verbContainer, example) => {
    const wordFromData = value[0];
    const verb = wordFromData.meanings.find((meaning) => meaning.partOfSpeech === "verb");
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
    }
    else {
        meaning.innerText = "😕 oops no verb is available";
    }
    if (exampleText) {
        exampleText.splice(1);
        exampleText.forEach((example) => {
            const p = document.createElement("p");
            p.classList.add("mt-[16px]", "text-[15px]", "md:text-[18px]", "text-[#757575]");
            p.innerText = `"${example}"`;
            verbContainer.appendChild(p);
        });
    }
    else {
        const p = document.createElement("p");
        p.classList.add("mt-[16px]", "text-[15px]", "md:text-[18px]", "text-[#757575]");
        p.innerText = " 😕 oops no examples available";
    }
};
// Function to display source URL
export const displaySourceUrl = (value, source) => {
    const wordFromData = value[0];
    source.innerHTML = "";
    if (wordFromData.sourceUrls) {
        wordFromData.sourceUrls.forEach((sourceUrl) => {
            source.href = sourceUrl;
            source.textContent = sourceUrl;
        });
    }
    else {
        source.href = "";
        source.textContent = "😕 oops no source is available";
    }
};
