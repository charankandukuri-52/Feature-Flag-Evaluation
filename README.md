# Feature Flag Evaluation SDK

A framework-agnostic feature flag evaluation SDK designed for reliability and ease of use. This SDK provides a robust way to manage feature flags in your React applications, ensuring safe defaults and deterministic evaluation.

## Installation

Install the package via npm:

```bash
npm install feature-flag-evaluation
```

## Structure

- `src/api`: Public API layer
- `src/core`: Core evaluation engine
- `src/rules`: Rule evaluation logic
- `src/bucketing`: Deterministic bucketing
- `src/persistence`: Caching and storage
- `src/config`: Configuration schema

## Usage

### 1. Setup the Provider

Wrap your application (or the part of the tree where you need feature flags) with `FlagProvider`.

```tsx
import React from 'react';
import { FlagProvider } from 'feature-flag-evaluation/frameworks/react';

const App = () => {
    const initialFlags = {
        'new-feature-enabled': true,
        'beta-ui': false,
    };

    return (
        <FlagProvider initialFlags={initialFlags}>
            <YourApplication />
        </FlagProvider>
    );
};
```

### 2. Consuming Flags

Use the `useFlagContext` hook to access feature flags within your components.

```tsx
import React from 'react';
import { useFlagContext } from 'feature-flag-evaluation/frameworks/react';

const MyComponent = () => {
    const { flags } = useFlagContext();

    if (flags['new-feature-enabled']) {
        return <div>New Feature is active!</div>;
    }

    return <div>Old Feature is active.</div>;
};
```

## Development

### Building the SDK

To build the project TypeScript files:

```bash
npm run build
```

This commands runs `tsc` and outputs the compiled JavaScript to the `dist` directory.

### Testing

*(Testing commands to be added)*

## License

ISC
