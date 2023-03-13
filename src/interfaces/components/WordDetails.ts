export interface ILicense {
  name: string
  url: string
}

export interface IPhonetic {
  text: string
  audio: string
  sourceUrl: string
  license: ILicense
}

export interface IDefinition {
  definition: string
  synonyms: string[]
  antonyms: string[]
  example: string
}

export interface IMeaning {
  partOfSpeech: string
  definitions: IDefinition[]
  synonyms: string[]
  antonyms: string[]
}

export interface IWord {
  word: string
  phonetic: string
  phonetics: IPhonetic[]
  meanings: IMeaning[]
  license: ILicense
  sourceUrls: string[]
}

export interface IWordDetailsProps {
  wordDetails?: IWord
  isLoadingWord?: boolean
}

export interface IMeaningsProps {
  meanings?: IMeaning[]
}

export interface IPhoneticsProps {
  phonetics?: IPhonetic[]
}