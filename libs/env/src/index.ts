import { Logger } from '@nestjs/common';

import { plainToInstance } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsPort, IsString, IsStrongPassword, validateSync, type ValidationError } from 'class-validator';

/**
 * Class that represents the structure and contents of the .env file. To be used in the code.
 */
class EnvironmentVariables {
    @IsString()
    @IsNotEmpty()
    DB_USER: string;

    @IsString()
    @IsNotEmpty()
    @IsStrongPassword()
    DB_PASSWORD: string;

    @IsString()
    @IsNotEmpty()
    DB_DATABASE: string;

    @IsNumber()
    @IsPort()
    PORT: number;
}

export function validate(config: Record<string, unknown>) {
    const logger = new Logger(validate.name);
    const instance = plainToInstance(EnvironmentVariables, config, { enableImplicitConversion: true });
    const errors = validateSync(instance, { skipMissingProperties: false });

    if (errors.length) {
        errors.forEach((e: ValidationError) => logger.fatal(e.toString()));
    }

    return instance;
}

