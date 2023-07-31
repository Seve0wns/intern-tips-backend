import { registerDecorator, ValidationOptions } from 'class-validator';

const FAIL_MESSAGE =
  ' must be 12 characters long and must contain at least one number and one symbol: !@#$%^&*_-=+';
export function IsValidPassword(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isValidPassword',
      target: object.constructor,
      propertyName: propertyName,
      options: { message: propertyName + FAIL_MESSAGE, ...validationOptions },
      validator: {
        validate(value: any) {
          return (
            checkLength(value) && checkNumber(value) && checkSpecial(value)
          );
        },
      },
    });
  };
}
function checkLength(value: string): boolean {
  return value.length === 12;
}
function checkSpecial(value: string): boolean {
  return value.match(/[\!@#\$%\^&\*_\-=\+]+/) ? true : false;
}
function checkNumber(value: string): boolean {
  return value.match(/\d+/) ? true : false;
}
