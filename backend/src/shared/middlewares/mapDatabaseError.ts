import { QueryFailedError } from "typeorm";
import { AppError } from "../errors/app.error";

const databaseErrors: Record<string, {
    message: string;
    statusCode: number;
    code: string;
}> = {
    ER_DUP_ENTRY: {
        message: "Duplicate entry",
        statusCode: 409,
        code: "DUPLICATE_ENTRY",
    },

    ER_NO_REFERENCED_ROW_2: {
        message: "Referenced record not found",
        statusCode: 400,
        code: "FOREIGN_KEY_ERROR",
    },

    ER_DATA_TOO_LONG: {
        message: "Data is too long",
        statusCode: 422,
        code: "DATA_TOO_LONG",
    },
};

export function mapDatabaseError(error: unknown): Error {
    // TODO: check 
    if (!(error instanceof QueryFailedError)) {
        return error instanceof Error ? error : new Error("Unknown error");
    }

    const driverError = error.driverError as { code?: string };

    const mapped = driverError.code
        ? databaseErrors[driverError.code]
        : undefined;

    if (!mapped) return error;

    return new AppError(mapped.message, mapped.statusCode, {
        code: mapped.code,
    });
}