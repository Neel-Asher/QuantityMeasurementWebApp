# QuantityMeasurementWebApp

## UC10: Populate Unit Dropdown

+ Implements UI logic to populate unit dropdowns dynamically.
+ Defines populateDropdown(selectEl, units) in ui.js.
+ Clears existing options before adding new ones.
+ Adds a default disabled option: "-- Select Unit --".
+ Populates dropdown with unit label and symbol (e.g., Kilometer (km)).
+ Ensures dropdown reflects latest data from API.
+ Handles empty unit arrays by showing only the default option.
+ Validates select element to prevent runtime errors.
+ Logs warning if select element is not found.
+ Separates UI rendering logic from business and API layers.
