# Design Principles

> [!NOTE]
> These principles guide all architectural decisions to prevent "refactoring into oblivion".

## Core Principles

### 1. Freeze the Contract
We lock key decisions early to maintain stability and focus on reliability over constant API churn.

### 2. Determinism
**Rule**: Same Inputs $\rightarrow$ Same Output.
Evaluation must be purely functional based on the provided `flagKey` and `context`. No side effects should alter the result.

### 3. Evaluation Order
Flag evaluation proceeds in a strict, defined order (e.g., Local Overrides -> Rules -> Defaults). *Specific order details to be implemented in Core.*

## Stability Goals
- The SDK should be "boring" and predictable.
- Avoid cleverness in the public API.
