export interface DictionaryResponse {
  word: string;
  phonetic?: string;
  phonetics?: Phonetic[];
  meanings: Meaning[];
  license?: License;
  sourceUrls?: string[]; // Note the plural 'sourceUrls'
}

interface License {
  name: string;
  url: string;
}

interface Phonetic {
  text?: string;
  audio?: string;
  sourceUrl?: string;
  license?: License;
}

interface Meaning {
  partOfSpeech: string;
  definitions: Definition[];
  synonyms?: string[];
  antonyms?: string[];
}

interface Definition {
  definition: string;
  example?: string;
  synonyms?: string[];
  antonyms?: string[];
}
