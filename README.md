# QuantityMeasurementWebApp

## UC17: Execute Calculation

+ Executes calculation based on selected mode (Conversion, Comparison, Arithmetic)
+ Triggered automatically on input or unit changes
+ Fetches conversion data from API (getConversion)
+ Applies conversion logic using applyConversion()
+ Performs comparison using compareValues() when selected
+ Handles arithmetic operations using performArithmetic()
+ Validates inputs and prevents invalid calculations
+ Displays result instantly in the UI with correct units
+ Saves calculation history with expression and timestamp
+ Handles errors gracefully without breaking the app
