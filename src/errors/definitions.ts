import { FeatureFlagError } from './base';
import { ErrorCode, ErrorSeverity, ErrorMetadata } from './types';

/**
 * Thrown when there are issues with the configuration (parsing, validation).
 */
export class ConfigurationError extends FeatureFlagError {
    constructor(message: string, metadata?: ErrorMetadata) {
        super(message, ErrorCode.FF_CONFIG_INVALID, ErrorSeverity.FATAL, metadata);
    }
}

/**
 * Thrown when a flag cannot be evaluated correctly.
 */
export class EvaluationError extends FeatureFlagError {
    constructor(message: string, code: ErrorCode = ErrorCode.FF_EVALUATION_FAILED, metadata?: ErrorMetadata) {
        super(message, code, ErrorSeverity.ERROR, metadata);
    }
}

/**
 * Thrown when network requests fail (e.g. fetching config).
 */
export class NetworkError extends FeatureFlagError {
    constructor(message: string, metadata?: ErrorMetadata) {
        super(message, ErrorCode.FF_NETWORK_ERROR, ErrorSeverity.WARN, metadata);
    }
}

/**
 * Thrown when the provider encounters an issue.
 */
export class ProviderError extends FeatureFlagError {
    constructor(message: string, code: ErrorCode = ErrorCode.FF_PROVIDER_INIT_FAILED, metadata?: ErrorMetadata) {
        super(message, code, ErrorSeverity.ERROR, metadata);
    }
}

/**
 * Thrown for internal library errors or unhandled exceptions.
 */
export class InternalError extends FeatureFlagError {
    constructor(message: string, originalError?: unknown) {
        super(
            message,
            ErrorCode.FF_INTERNAL_ERROR,
            ErrorSeverity.ERROR,
            { originalError }
        );
    }
}
