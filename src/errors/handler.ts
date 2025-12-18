import { FeatureFlagError } from './base';
import { ErrorSeverity } from './types';

export interface ErrorReporter {
    capture(error: FeatureFlagError): void;
}

export class ErrorHandler {
    private static instance: ErrorHandler;
    private reporters: ErrorReporter[] = [];

    private constructor() { }

    public static getInstance(): ErrorHandler {
        if (!ErrorHandler.instance) {
            ErrorHandler.instance = new ErrorHandler();
        }
        return ErrorHandler.instance;
    }

    /**
     * Register a custom error reporter (e.g., Sentry, Datadog).
     */
    public addReporter(reporter: ErrorReporter): void {
        this.reporters.push(reporter);
    }

    /**
     * Process an error: Log to console and notify reporters.
     */
    public handle(error: FeatureFlagError): void {
        this.logToConsole(error);
        this.notifyReporters(error);
    }

    private logToConsole(error: FeatureFlagError): void {
        // Only log WARN and above by default to avoid noise
        if (error.severity === ErrorSeverity.INFO) return;

        const logMethod = error.severity === ErrorSeverity.FATAL ? 'error' :
            error.severity === ErrorSeverity.ERROR ? 'error' : 'warn';

        console[logMethod](`[FeatureFlag SDK] ${error.code}: ${error.message}`, error.metadata || '');
    }

    private notifyReporters(error: FeatureFlagError): void {
        this.reporters.forEach(reporter => {
            try {
                reporter.capture(error);
            } catch (reportingError) {
                console.error('[FeatureFlag SDK] Failed to report error:', reportingError);
            }
        });
    }
}

// Export a singleton accessor for ease of use
export const errorHandler = ErrorHandler.getInstance();
