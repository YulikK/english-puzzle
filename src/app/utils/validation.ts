import { MIN_LENGTH_LAST_NAME, MIN_LENGTH_FIRST_NAME } from '@/constant.ts';
import type { UserType, OptionsType , LessonType } from "./types.ts";
import { FieldName } from "./types.ts";

type ValidationType = {
  isValid: boolean;
  error: string;
}

function getValidationConstant(field: FieldName):{message: string, minLength: number, regexAll: RegExp, regexFirst: RegExp} {
  const regexAll = /^[a-zA-Z-]*$/;
  const regexFirst = /^[A-Z][a-zA-Z-]*$/;
  let message = '';
  let minLength = 0;
  if (field === FieldName.firstName) {
    message = 'First name';
    minLength = MIN_LENGTH_FIRST_NAME;
  } else if (field === FieldName.lastName){
    message = 'Last name';
    minLength = MIN_LENGTH_LAST_NAME;
  }
  return { message, minLength, regexAll, regexFirst };

}

export function validateField(value: string, field: FieldName): ValidationType {
  const validation: ValidationType = {
    isValid: false,
    error: '',
  }
  const { message, minLength, regexAll, regexFirst } = getValidationConstant(field);

  if (value.length < minLength) {
    validation.error = `${message} must be at least ${minLength} characters long`;
  } else if (!regexAll.test(value)) {
    validation.error = `${message} must contain only letters and hyphens`;
  } else if (!regexFirst.test(value)) {
    validation.error = `${message} must start with a capital letter`;
  } else {
    validation.isValid = true;
  }
  return validation;
}

export function isOptionsType(entity: unknown): entity is OptionsType {
  return Boolean(
    typeof entity === 'object' &&
      entity &&
      'onSound' in entity &&
      typeof entity.onSound === 'boolean' &&
      'onTranslate' in entity &&
      typeof entity.onTranslate === 'boolean' &&
      'onPicture' in entity &&
      typeof entity.onPicture === 'boolean',
  );
}

export function isUserType(entity: unknown): entity is UserType {
  return Boolean(
    typeof entity === 'object' &&
      entity &&
      'firstName' in entity &&
      typeof entity.firstName === 'string' &&
      'lastName' in entity &&
      typeof entity.lastName === 'string'
  );
}

export function isLessonType(entity: unknown): entity is LessonType {
  return Boolean(
    typeof entity === 'object' &&
      Array.isArray(entity) &&
      entity && entity.length > 0 &&
      'levelData' in entity[0] &&
      'words' in entity[0]
  );
}