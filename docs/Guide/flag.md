# Feature Flag Definition

## Core Entity: `Flag`

A Feature Flag represents a dynamic configuration point in the system. It allows modifying behavior without deploying new code.

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `key` | `string` | Unique identifier for the flag (e.g., `new-checkout-flow`). |
| `type` | `FlagType` | The data type of the flag's value. |
| `status` | `FlagStatus` | Operational state of the flag. |
| `variations` | `Variation[]` | List of possible values this flag can return. |
| `rules` | `Rule[]` | Ordered list of targeting rules. |
| `defaultVariation` | `VariationID` | Fallback value if no rules match and flag is ON. |
| `offVariation` | `VariationID` | Value returned when the flag is globally disabled or OFF. |

### Enums

#### `FlagType`
- `BOOLEAN`: True/False toggle.
- `STRING`: Text configuration.
- `NUMBER`: Numeric threshold or limit.
- `JSON`: Structured configuration object.

#### `FlagStatus`
- `ACTIVE`: Flag is being evaluated normally.
- `ARCHIVED`: Flag is deprecated and should probably be removed.

### Evaluation Flow (High-Level)
1. **Check Status**: If `ARCHIVED` or disabled -> Return `offVariation`.
2. **Evaluate Rules**: Iterate through `rules` top-to-bottom. First match wins.
3. **Default**: If no rules match -> Return `defaultVariation`.
