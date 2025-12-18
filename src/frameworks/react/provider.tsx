import React, { createContext, useContext, ReactNode } from 'react';
import '@atlaskit/css-reset'; // Ensure basic CSS reset is applied

// Placeholder for the Flag Context State
interface FlagContextState {
    flags: Record<string, boolean>;
    // Add other state as needed
}

const FlagContext = createContext<FlagContextState | undefined>(undefined);

interface FlagProviderProps {
    children: ReactNode;
    initialFlags?: Record<string, boolean>;
}

/**
 * FlagProvider wrapping the application with Feature Flag context.
 * Best used inside an Atlassian Design System provider if available, 
 * or can wrap it if we control the root.
 */
export const FlagProvider: React.FC<FlagProviderProps> = ({ children, initialFlags = {} }) => {
    const state: FlagContextState = {
        flags: initialFlags,
    };

    return (
        <FlagContext.Provider value={state}>
            {/* Potentially wrap with DesignSystemProvider from specific ADS packages if needed later */}
            {children}
        </FlagContext.Provider>
    );
};

export const useFlagContext = () => {
    const context = useContext(FlagContext);
    if (!context) {
        throw new Error('useFlagContext must be used within a FlagProvider');
    }
    return context;
};
