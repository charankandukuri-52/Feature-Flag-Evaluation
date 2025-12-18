import { ErrorCode, ErrorSeverity, ErrorMetadata } from './types';

export abstract class FeatureFlagError extends Error {
    public readonly code: ErrorCode;
    public readonly severity: ErrorSeverity;
    public readonly metadata?: ErrorMetadata;
    public readonly timestamp: number;

    constructor(
        message: string,
        code: ErrorCode,
        severity: ErrorSeverity = ErrorSeverity.ERROR,
        metadata?: ErrorMetadata
    ) {
        super(message);
        this.name = this.constructor.name;
        this.code = code;
        this.severity = severity;
        this.metadata = metadata;
        this.timestamp = Date.now();

        // Restore prototype chain for proper instanceof checks
        Object.setPrototypeOf(this, new.target.prototype);
    }

    public toJSON() {
        return {
            name: this.name,
            message: this.message,
            code: this.code,
            severity: this.severity,
            metadata: this.metadata,
            timestamp: this.timestamp,
        };
    }
}
