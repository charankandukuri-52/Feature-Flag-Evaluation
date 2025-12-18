# API Contract

> [!IMPORTANT]
> This contract is frozen. Changes to these signatures require a major version bump and extensive review.

## Public API Signature

### `isEnabled`

The primary entry point for flag evaluation.

```typescript
function isEnabled(flagKey: string, context: Context): boolean
```

- **Returns**: `boolean` - `true` if the flag is enabled for the context, `false` otherwise.

## Error Handling

- **No Throwing**: The public API MUST NOT throw errors under any circumstances.
- **Default Behavior**: On any failure (network, parsing, internal error), the SDK MUST return `false`.

## Rationale
Ensures application stability even if the flagging system fails.
