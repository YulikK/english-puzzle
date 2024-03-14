import { MIN_LENGTH_LAST_NAME, MIN_LENGTH_FIRST_NAME } from '@/constant.ts';
import { FieldName } from "./types.ts";

type ValidationType = {
  isValid: boolean;
  error: string;
}

function getValidationConstant(field: FieldName):{message: string, minLength: number, regex: RegExp} {
  const regex = /[a-zA-Z-]/;
  let message = '';
  let minLength = 0;
  if (field === FieldName.firstName) {
    message = 'First name';
    minLength = MIN_LENGTH_FIRST_NAME;
  } else if (field === FieldName.lastName){
    message = 'Last name';
    minLength = MIN_LENGTH_LAST_NAME;
  }
  return { message, minLength, regex };

}

export default function validateField(value: string, field: FieldName): ValidationType {
  const validation: ValidationType = {
    isValid: false,
    error: '',
  }
  const { message, minLength, regex } = getValidationConstant(field);

  if (value.length < minLength) {
    validation.error = `${message} must be at least ${minLength} characters long`;
  } else if (!regex.test(value)) {
    validation.error = `${message} must contain only letters and hyphens`;
  } else if (value.slice(0, 1) !== value.slice(0, 1).toUpperCase()) {
    validation.error = `${message} must start with a capital letter`;
  } else {
    validation.isValid = true;
  }
  return validation;
}

