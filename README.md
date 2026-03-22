# QuantityMeasurementWebApp

## UC16: Handle Action Tab Click

+ Handles user interaction for type cards (Length, Weight, etc.) and action tabs (Comparison, Conversion, Arithmetic)
+ Clicking a type card updates state.type and reloads unit dropdowns from API
+ Resets input values and clears previous result on type change
+ Clicking an action tab updates state.action and switches app mode
+ Operator row (+ − × ÷) is shown only in Arithmetic mode
+ Result panel is also visible only for Arithmetic operations
+ Uses setActive() to ensure only one card/tab is highlighted at a time
+ Dropdowns are repopulated dynamically using populateDropdown()
+ History is loaded on page load and rendered using renderHistory()
+ All interactions are managed via a centralized state object for consistency
