import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

const FAIL_MESSAGE = ' is not equal to';
export function IsMatch(
  comparison: any,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isMatch',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [comparison],
      options: {
        message: propertyName + FAIL_MESSAGE + comparison,
        ...validationOptions,
      },
      validator: {
        validate(value: any, args: ValidationArguments) {
          return value === (args.object as any)[comparison];
        },
      },
    });
  };
}
