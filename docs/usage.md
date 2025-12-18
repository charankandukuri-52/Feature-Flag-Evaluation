# Usage Guide & Cookbook

This guide provides 10 complete, end-to-end scenarios for using the Feature Flag SDK in your React application. Each scenario demonstrates a different pattern or capability.

## Prerequisites

Ensure you have wrapped your application with the `FlagProvider`:

```tsx
// src/App.tsx
import React from 'react';
import { FlagProvider } from 'feature-flag-evaluation/frameworks/react';
import { initialFlags } from './config/flags'; // Your flag source

const App = () => (
  <FlagProvider initialFlags={initialFlags}>
    <MainContent />
  </FlagProvider>
);
```

---

## Scenario 1: Simple Boolean Toggle
**Goal**: Hide or show a component based on a flag.

```tsx
import React from 'react';
import { useFlagContext } from 'feature-flag-evaluation/frameworks/react';

const Header = () => {
  const { flags } = useFlagContext();
  const showNewLogo = flags['new-brand-logo']; // Boolean flag

  return (
    <header>
      {showNewLogo ? <NewLogo /> : <OldLogo />}
    </header>
  );
};
```

## Scenario 2: Multivariate Flags (A/B Testing)
**Goal**: Render different button colors for an experiment.

```tsx
const CallToAction = () => {
  const { flags } = useFlagContext();
  // Flag value could be 'red', 'green', or 'blue'
  const btnColor = flags['cta-color-experiment'] as string || 'blue'; 

  return (
    <button style={{ backgroundColor: btnColor }}>
      Buy Now
    </button>
  );
};
```

## Scenario 3: Permission Gating (Role Based)
**Goal**: Only show the "Admin Settings" link to admin users.
*Note: This assumes your flag rules evaluate the user role in the backend/provider.*

```tsx
const Sidebar = () => {
  const { flags } = useFlagContext();
  const isAdminEnabled = flags['admin-module-enabled'];

  return (
    <nav>
      <Link to="/dashboard">Dashboard</Link>
      {isAdminEnabled && <Link to="/admin">Admin Settings</Link>}
    </nav>
  );
};
```

## Scenario 4: Percentage Rollout (Staged Release)
**Goal**: Enable a new feature for 10% of users.
*The 10% calculation happens in the SDK engine based on User ID.*

```tsx
const UserProfile = () => {
  const { flags } = useFlagContext();
  const showRedesignedProfile = flags['profile-v2-rollout'];

  return (
    <div>
      {showRedesignedProfile ? (
        <ComplexProfileV2 />
      ) : (
        <SimpleProfileV1 />
      )}
    </div>
  );
};
```

## Scenario 5: Beta User Targeting (Allowlist)
**Goal**: Enable features only for specific User IDs (e.g., internal team).

```tsx
const BetaFeatureWrapper = ({ children }) => {
  const { flags } = useFlagContext();
  const isBetaActive = flags['beta-access-allowlist'];

  if (!isBetaActive) return null;

  return (
    <div className="beta-badge-container">
      <span className="badge">BETA</span>
      {children}
    </div>
  );
};
```

## Scenario 6: Subscription Tier Features
**Goal**: Show premium charts only to "Gold" tier users.

```tsx
const AnalyticsDashboard = () => {
  const { flags } = useFlagContext();
  // Logic: IF user.plan == 'gold' THEN 'advanced-charts' = TRUE
  const showAdvancedCharts = flags['advanced-charts'];

  return (
    <div>
      <BasicStats />
      {showAdvancedCharts ? (
        <PremiumForecastingChart />
      ) : (
        <UpgradePrompt />
      )}
    </div>
  );
};
```

## Scenario 7: Dynamic Configuration (JSON Flags)
**Goal**: Control the number of items displayed in a list without deploying.

```tsx
const RecommendationWidget = () => {
  const { flags } = useFlagContext();
  // Flag value is a number, e.g., 3, 5, or 10
  const maxItems = flags['rec-widget-count'] as number || 3; 

  const items = useRecommendations(); // Hook to fetch data

  return (
    <ul>
      {items.slice(0, maxItems).map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
};
```

## Scenario 8: Ops Toggle (Kill Switch)
**Goal**: Disable a buggy integration instantly.

```tsx
const PaymentForm = () => {
  const { flags } = useFlagContext();
  const isPayPalEnabled = flags['enable-paypal-integration'];

  return (
    <form>
      <CreditCardInput />
      {isPayPalEnabled && (
        <div className="paypal-btn">
          <PayPalButton />
        </div>
      )}
      {!isPayPalEnabled && (
        <p className="maintenance-notice">
          PayPal is temporarily unavailable.
        </p>
      )}
    </form>
  );
};
```

## Scenario 9: Geo-Gating (Compliance)
**Goal**: Show a GDPR consent banner only for users in the EU.

```tsx
const CookieConsent = () => {
  const { flags } = useFlagContext();
  // Logic: IF user.region == 'EU' THEN 'show-gdpr-banner' = TRUE
  const showBanner = flags['show-gdpr-banner'];

  if (!showBanner) return null;

  return (
    <div className="cookie-banner">
      We use cookies. Accept? <button>Yes</button>
    </div>
  );
};
```

## Scenario 10: Device-Specific UI
**Goal**: Render a completely different layout for Mobile users vs Desktop.

```tsx
const MainLayout = () => {
  const { flags } = useFlagContext();
  // Logic: IF user.deviceType == 'mobile' THEN 'use-mobile-layout' = TRUE
  const isMobileLayout = flags['use-mobile-layout'];

  return (
    <div className="app-container">
      {isMobileLayout ? (
        <BottomNavigationMenu />
      ) : (
        <SideBarNavigation />
      )}
      <ContentArea />
    </div>
  );
};
```
