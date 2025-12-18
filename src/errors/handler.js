import { ErrorSeverity } from './types.js';

export class ErrorHandler {
    constructor() {
        this.reporters = [];
    }

    static getInstance() {
        if (!ErrorHandler.instance) {
            ErrorHandler.instance = new ErrorHandler();
        }
        return ErrorHandler.instance;
    }

    /**
     * Register a custom error reporter (e.g., Sentry, Datadog).
     */
    addReporter(reporter) {
        this.reporters.push(reporter);
    }

    /**
     * Process an error: Log to console and notify reporters.
     */
    handle(error) {
        this.logToConsole(error);
        this.notifyReporters(error);
    }

    logToConsole(error) {
        // Only log WARN and above by default to avoid noise
        if (error.severity === ErrorSeverity.INFO) return;

        const logMethod = error.severity === ErrorSeverity.FATAL ? 'error' :
            error.severity === ErrorSeverity.ERROR ? 'error' : 'warn';

        console[logMethod](`[FeatureFlag SDK] ${error.code}: ${error.message}`, error.metadata || '');
    }

    notifyReporters(error) {
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
