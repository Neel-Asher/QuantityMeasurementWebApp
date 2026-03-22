# QuantityMeasurementWebApp

## UC12: Show Result

+ Displays calculation results in a dedicated result panel.
+ Defines showResult(value, unitSymbol) in ui.js.
+ Updates #result-value and #result-unit dynamically.
+ Adds temporary highlight animation for visual feedback.
+ Handles null or undefined values by displaying "—".
+ Designed specifically for Arithmetic action output.
+ Conversion results are shown in the TO input field instead.
+ Comparison results are displayed separately (e.g., alert/message).
+ Ensures separation of UI behavior based on action type.
+ Maintains clean architecture by controlling usage from script.js.
