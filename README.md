# QuantityMeasurementWebApp

## UC7: Apply Conversion

+ Implements core conversion logic using factor or formula-based approach.
+ Defines applyConversion(value, convObj) function in conversion.js.
+ Supports factor-based conversions using multiplication.
+ Supports formula-based conversions using predefined expressions from db.json.
+ Ensures input value is a valid finite number before processing.
+ Handles same-unit conversions by returning the original value.
+ Uses eval() safely only on trusted formula strings from backend.
+ Rounds all results to 6 decimal places to avoid floating-point errors.
+ Throws descriptive errors for invalid numbers or malformed formulas.
+ Acts as the core calculation engine for all future conversion features.
