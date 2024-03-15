export type OptionsType = {
  onSound: boolean;
  onTranslate: boolean;
  onPicture: boolean;
} 

export enum HintName {
  onSound = 'onSound',
  onTranslate = 'onTranslate',
  onPicture = 'onPicture'
}

export enum FieldName {
  firstName = 'firstName',
  lastName = 'lastName'
}

export type UserType = {
  firstName: string,
  lastName: string
}

export type TittleType = {
  id: string,
  name: string,
  imageSrc: string,
  cutSrc: string,
  author: string,
  year: string
}

export type RoundType = {
  audioExample: string,
  textExample: string,
  textExampleTranslate: string,
  id: number,
  word: string,
  wordTranslate: string
}

export type LessonType = {
  levelData: TittleType,
  words: RoundType[]
}