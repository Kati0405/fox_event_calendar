import { registerDecorator, ValidationOptions, ValidationArguments, IsString, IsOptional } from '@nestjs/class-validator';

export const allowedColors = ['red-dark',
    'red',
    'orange',
    'yellow',
    'yellow-dark',
    'green',
    'green-light',
    'green-dark',
    'blue',
    'blue-light',
    'purple',
    'purple-light'] as const;
type AllowedColor = typeof allowedColors[number];

export function IsColor(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isColor',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    return allowedColors.includes(value);
                },
                defaultMessage(args: ValidationArguments) {
                    return `${args.property} must be one of the following colors: ${allowedColors.join(', ')}`;
                },
            },
        });
    };
}

export class CreateCalendarDto {
    @IsString()
    title: string;

    @IsString()
    @IsColor({ message: `colorClass must be a valid color  ${allowedColors.join(', ')}` })
    colorClass: AllowedColor;

    @IsOptional()
    isDefault?: boolean;

    userId: string;

}
