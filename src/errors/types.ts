export enum ErrorCode {
    // Configuration Errors (1xxx)
    FF_CONFIG_INVALID = 'FF_1001',
    FF_CONFIG_MISSING = 'FF_1002',
    FF_CONFIG_FETCH_FAILED = 'FF_1003',

    // Evaluation Errors (2xxx)
    FF_EVALUATION_FAILED = 'FF_2001',
    FF_RULE_INVALID = 'FF_2002',
    FF_CONTEXT_INVALID = 'FF_2003',

    // Provider/Integration Errors (3xxx)
    FF_PROVIDER_INIT_FAILED = 'FF_3001',
    FF_PROVIDER_NOT_READY = 'FF_3002',

    // Network Errors (4xxx)
    FF_NETWORK_ERROR = 'FF_4001',
    FF_TIMEOUT = 'FF_4002',

    // Internal/Unknown Errors (5xxx)
    FF_INTERNAL_ERROR = 'FF_5001',
    FF_UNKNOWN_ERROR = 'FF_5002',
}

export enum ErrorSeverity {
    INFO = 'INFO',
    WARN = 'WARN',
    ERROR = 'ERROR',
    FATAL = 'FATAL',
}

export interface ErrorMetadata {
    [key: string]: unknown;
}
