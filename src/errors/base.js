import { ErrorSeverity } from './types.js';

export class FeatureFlagError extends Error {
    constructor(
        message,
        code,
        severity = ErrorSeverity.ERROR,
        metadata
    ) {
        super(message);
        this.name = this.constructor.name;
        this.code = code;
        this.severity = severity;
        this.metadata = metadata;
        this.timestamp = Date.now();
    }

    toJSON() {
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
