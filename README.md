# QuantityMeasurementWebApp

## UC2: Initialize App on Page Load

+ Implemented application startup using the DOMContentLoaded event.
+ Wrapped all JavaScript logic inside the DOMContentLoaded listener to ensure the DOM is fully loaded before execution.
+ Created a shared state object to track selected type, action, units, values, and operator.
+ Added attachEventListeners() to bind click handlers for type cards and action buttons.
+ Set the default active type (Length) and default action (Conversion) on page load.
+ Called loadUnits("Length") to fetch unit data from the JSON Server API.
+ Populated both FROM and TO dropdowns with the fetched unit data.
+ Called loadHistory() to prepare the application for displaying previous conversions.
+ Implemented basic error handling if the JSON server is unavailable.
