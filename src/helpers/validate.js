import Validator from 'validatorjs';

import { isdev } from 'src/config';

const validationsDisabled = false;
const logValidations = false;

const createValidation =
  ({ title, rules, attributeNames } = {}) =>
  (payload) => {
    if (validationsDisabled) {
      return null;
    }

    const result = new Validator(payload, rules);

    if (attributeNames) {
      result.setAttributeNames(attributeNames);
    }

    if (result.passes()) {
      return null;
    } else {
      isdev &&
        logValidations &&
        console.log(`Validations from ${title}`, result.errors.all());
      return result.errors.all();
    }
  };

export const validateUser = createValidation({
  title: 'user',
  rules: {
    firstName: 'required',
    lastName: 'required',
    email: 'required|email',
    role: 'required',
  },
  attributeNames: {
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
    role: 'Role',
  },
});

// converter
export const convertValidations = (validations) => {
  try {
    let convertedValidations = {};
    for (const entry in validations) {
      // we get an array in each validation, but only need the
      // first element
      convertedValidations[entry] = validations[entry][0];
    }
    return convertedValidations;
  } catch (err) {
    isdev &&
      console.error('Error occured while converting validations! error:', err);
    return {};
  }
};
