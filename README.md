# QuantityMeasurementWebApp

## UC8: Compare Two Values

+ Implements comparison logic for two measurement values.
+ Defines compareValues(v1, u1, v2, u2, base1, base2) in conversion.js.
+ Compares values after normalizing both to a common base unit.
+ Returns human-readable comparison results (GREATER, LESS, EQUAL).
+ Ensures accurate comparison across different units (e.g., km vs m).
+ Handles equal values correctly after normalization.
+ Validates inputs to ensure both values are finite numbers.
+ Returns error message if invalid (NaN) values are provided.
+ Keeps comparison logic separate from UI for clean architecture.
+ Serves as core logic for Comparison action in the application.
