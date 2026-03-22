# QuantityMeasurementWebApp

## UC9: Arithmetic Operation

+ Implements arithmetic operations between two measurement values.
+ Defines performArithmetic(v1, v2normalised, op) in conversion.js.
+ Supports four operators: addition (+), subtraction (-), multiplication (*), and division (/).
+ Assumes second value is already normalized to the first value’s unit.
+ Returns result rounded to 6 decimal places for precision control.
+ Handles division safely by checking for divide-by-zero cases.
+ Throws descriptive error when division by zero occurs.
+ Throws error for unsupported or unknown operators.
+ Validates inputs to ensure both values are valid numbers.
+ Acts as core logic for Arithmetic action in the application.
