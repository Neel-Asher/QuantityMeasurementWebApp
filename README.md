# QuantityMeasurementWebApp

## UC11: Set Active Button

+ Implements logic to highlight the currently selected UI element.
+ Defines setActive(parentEl, clickedEl, childSelector) in ui.js.
+ Removes the "active" class from all sibling elements before applying it.
+ Adds the "active" class only to the clicked element.
+ Ensures only one element is active within a group at any time.
+ Used for type cards, action buttons, and operator buttons.
+ Improves user experience with persistent selection feedback.
+ Handles missing parent element safely with a warning.
+ Works in conjunction with CSS .active styles for visual highlighting.
+ Separates UI state management from business logic cleanly.
