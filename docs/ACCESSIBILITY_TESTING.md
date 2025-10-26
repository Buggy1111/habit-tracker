# Accessibility Testing Guide - Screen Readers

## Overview

This guide explains how to test the Habit Tracker application with screen readers to ensure accessibility for visually impaired users.

## What is a Screen Reader?

A screen reader is assistive technology that converts digital text into synthesized speech or Braille output, enabling blind or visually impaired users to navigate and interact with applications.

---

## Screen Readers to Test With

### Windows

**NVDA (NonVisual Desktop Access)** - FREE & RECOMMENDED

- Download: https://www.nvaccess.org/download/
- Free and open-source
- Most popular Windows screen reader

**JAWS (Job Access With Speech)** - COMMERCIAL

- Download: https://www.freedomscientific.com/products/software/jaws/
- Industry standard (expensive)
- Free 40-minute demo mode

### macOS

**VoiceOver** - FREE & BUILT-IN

- Built into macOS
- Enable: System Settings → Accessibility → VoiceOver
- Keyboard shortcut: Cmd+F5

### Linux

**Orca** - FREE & BUILT-IN

- Built into most Linux distributions
- Enable through accessibility settings

### Mobile

**iOS VoiceOver** - Built-in

- Settings → Accessibility → VoiceOver

**Android TalkBack** - Built-in

- Settings → Accessibility → TalkBack

---

## Screen Reader Keyboard Shortcuts

### NVDA (Windows)

| Command                    | Shortcut                      |
| -------------------------- | ----------------------------- |
| Start/Stop NVDA            | Ctrl+Alt+N                    |
| Read next item             | Down Arrow                    |
| Read previous item         | Up Arrow                      |
| Activate item              | Enter or Space                |
| Stop reading               | Ctrl                          |
| Read all                   | NVDA+Down Arrow               |
| Navigate headings          | H (next) / Shift+H (previous) |
| Navigate links             | K (next) / Shift+K (previous) |
| Navigate buttons           | B (next) / Shift+B (previous) |
| Navigate form fields       | F (next) / Shift+F (previous) |
| Navigate regions/landmarks | D (next) / Shift+D (previous) |

### VoiceOver (macOS)

| Command            | Shortcut       |
| ------------------ | -------------- |
| Enable/Disable     | Cmd+F5         |
| VO key             | Control+Option |
| Read next item     | VO+Right Arrow |
| Read previous item | VO+Left Arrow  |
| Activate item      | VO+Space       |
| Stop reading       | Control        |
| Read all           | VO+A           |
| Navigate headings  | VO+Cmd+H       |
| Navigate links     | VO+Cmd+L       |
| Open rotor         | VO+U           |

---

## Implemented Accessibility Features

### ✅ Skip to Content Link

**Location:** Top of dashboard layout
**Purpose:** Allows keyboard users to skip navigation and jump directly to main content
**Test:**

1. Press Tab on dashboard page
2. First focusable element should be "Přejít na hlavní obsah"
3. Press Enter to skip to main content area

### ✅ ARIA Labels on HabitCard

**Card Element:**

- `role="article"`
- `aria-label="Návyk: [název] - dokončeno/nedokončeno"`

**Options Button:**

- `aria-label="Možnosti pro návyk [název]"`

**Implementation Intention:**

- `role="region"`
- `aria-label="Implementační záměr"`

**Streak Display:**

- `role="status"`
- `aria-label="Aktuální série: X dní"`

**Science Metrics:**

- `role="region"` with `aria-label="Vědecké metriky návyku"`
- Habit Strength: `role="status"` with detailed label
- Neuroplasticity Phase: `role="status"` with detailed label

**Extinction Burst Warning:**

- `role="alert"`
- `aria-live="polite"` - announces immediately to screen readers

**Complete Button:**

- Descriptive `aria-label` for different states
- Changes based on completion status

**Decorative Icons:**

- All decorative icons have `aria-hidden="true"` to prevent clutter

### ✅ Form Accessibility

**All Forms Have:**

- Proper `<Label>` components with `htmlFor` attributes
- Associated form controls with matching `id` attributes
- Required field indicators
- Error messages linked to inputs

**Fixed Issues:**

- ❌ Removed `autoFocus` attributes (reduces accessibility)
- ✅ Let dialog components handle focus management
- ✅ Added `aria-labelledby` for Radix UI Select components

### ✅ ESLint Accessibility Linting

**Configured Rules:**

- `jsx-a11y/alt-text` - Ensure images have alt text
- `jsx-a11y/aria-props` - Validate ARIA properties
- `jsx-a11y/label-has-associated-control` - Ensure labels are connected
- `jsx-a11y/role-has-required-aria-props` - Validate ARIA roles
- And 6 more rules...

Run `npm run lint` to check for accessibility violations.

---

## Testing Checklist

### Navigation Testing

- [ ] **Tab Navigation**
  - All interactive elements reachable via Tab
  - Focus visible on all elements
  - Logical tab order (top to bottom, left to right)
  - Skip link appears first

- [ ] **Screen Reader Navigation**
  - All headings announced correctly (H1, H2, H3)
  - All buttons, links, form fields announced
  - Landmark regions (navigation, main, etc.) identified
  - Page title read on load

### HabitCard Testing

- [ ] **Card Announcement**
  - Screen reader announces: "Návyk: [název] - dokončeno/nedokončeno"
  - Role="article" recognized

- [ ] **Metrics Announced**
  - Current streak value announced
  - Habit strength score and level announced
  - Neuroplasticity phase announced
  - All values clear and understandable

- [ ] **Extinction Burst Alert**
  - Alert announced immediately when present (role="alert")
  - Message clear and actionable

- [ ] **Complete Button**
  - Button state announced correctly
  - Disabled state communicated
  - Loading state communicated

- [ ] **Options Menu**
  - Menu button identified with habit name
  - Menu items announced
  - Keyboard accessible (Enter/Space to open, arrows to navigate)

### Form Testing

- [ ] **Add Habit Dialog**
  - Dialog title announced when opened
  - All labels read correctly
  - Required fields indicated
  - Focus trapped within dialog
  - ESC key closes dialog

- [ ] **Create Identity Dialog**
  - Same checks as Add Habit Dialog
  - Examples buttons announced correctly

- [ ] **Edit Habit Dialog**
  - Pre-filled values announced
  - Changes announced when made

### Dashboard Testing

- [ ] **Sidebar Navigation**
  - All navigation items announced
  - Current page indicated
  - User menu accessible

- [ ] **Main Content**
  - Skip link functional
  - Main heading announced
  - Habit list navigable
  - Empty states announced

### Error Handling

- [ ] **Validation Errors**
  - Error messages read aloud
  - Focus moved to first error
  - Errors linked to form fields

- [ ] **Toast Notifications**
  - Success/error toasts announced
  - Messages clear and concise

---

## Common Screen Reader Testing Scenarios

### Scenario 1: New User Onboarding

1. Navigate to registration page
2. Complete form using only keyboard
3. Verify all labels and errors announced
4. Create account and navigate to dashboard

### Scenario 2: Creating a Habit

1. Open "Přidat nový návyk" dialog
2. Fill all form fields using keyboard
3. Navigate between fields with Tab
4. Verify all tooltips and help text announced
5. Submit and verify success message

### Scenario 3: Completing a Habit

1. Navigate to habit card
2. Tab to "Označit jako hotové" button
3. Activate with Enter or Space
4. Verify completion status announced
5. Verify visual change has audio equivalent

### Scenario 4: Viewing Science Metrics

1. Navigate to a habit card
2. Listen to all metric announcements
3. Verify values make sense
4. Open info tooltips
5. Navigate to habit detail page

### Scenario 5: Using Skip Link

1. Load dashboard page
2. Press Tab once
3. Verify "Přejít na hlavní obsah" focused
4. Press Enter
5. Verify focus moved to main content

---

## Known Issues & Limitations

### Current Limitations

- **Calendar navigation**: May need improved keyboard shortcuts
- **Drag & drop**: Not yet implemented (required for future Habit Stacking)
- **Charts/graphs**: Need text alternatives for data visualization

### Future Improvements

- [ ] Add ARIA live regions for dynamic content updates
- [ ] Improve mobile screen reader experience
- [ ] Add keyboard shortcuts help dialog
- [ ] Test with more screen readers (JAWS, Orca)
- [ ] Add focus management for complex interactions

---

## Automated Accessibility Testing

### ESLint (Already Configured)

```bash
npm run lint
```

Checks for accessibility issues in code.

### axe DevTools (Browser Extension - RECOMMENDED)

- Install: [Chrome](https://chrome.google.com/webstore/detail/axe-devtools-web-accessib/lhdoppojpmngadmnindnejefpokejbdd) | [Firefox](https://addons.mozilla.org/en-US/firefox/addon/axe-devtools/)
- Run on every page
- Fix all violations

### Lighthouse (Built into Chrome DevTools)

```
1. Open Chrome DevTools (F12)
2. Go to "Lighthouse" tab
3. Select "Accessibility" category
4. Click "Analyze page load"
5. Fix issues with score < 90
```

### WAVE (Browser Extension)

- Install: [WAVE Extension](https://wave.webaim.org/extension/)
- Visual feedback for accessibility issues
- Identifies ARIA problems

---

## Manual Testing Best Practices

### 1. Test with Eyes Closed

Close your eyes and navigate using only the keyboard and screen reader. Can you:

- Understand what page you're on?
- Navigate to all interactive elements?
- Complete all tasks (create habit, mark complete, etc.)?
- Understand all information presented?

### 2. Test with Different Screen Readers

Each screen reader behaves differently:

- NVDA (most common on Windows)
- JAWS (enterprise standard)
- VoiceOver (macOS/iOS)
- TalkBack (Android)

### 3. Test with Different Browsers

Screen readers work differently with different browsers:

- NVDA + Firefox (best combination)
- NVDA + Chrome
- VoiceOver + Safari
- JAWS + Edge

### 4. Test with Real Users

If possible, get feedback from actual screen reader users. Their experience is invaluable.

---

## Resources

### Screen Reader Basics

- [WebAIM: Screen Reader Testing](https://webaim.org/articles/screenreader_testing/)
- [Deque: Screen Reader Keyboard Shortcuts](https://dequeuniversity.com/screenreaders/)

### ARIA Documentation

- [MDN: ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA)
- [W3C ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)

### WCAG Guidelines

- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM: WCAG Checklist](https://webaim.org/standards/wcag/checklist)

### Testing Tools

- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE](https://wave.webaim.org/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

---

## Contact

If you discover any accessibility issues, please:

1. File an issue on GitHub with tag `accessibility`
2. Include screen reader name and version
3. Include browser name and version
4. Provide steps to reproduce
5. Describe expected vs. actual behavior

---

**Last Updated:** 2025-10-26
**Tested With:** NVDA 2024.1, VoiceOver (macOS 14), Chrome Lighthouse
**WCAG Compliance Target:** Level AA
