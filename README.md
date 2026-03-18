# QuantityMeasurementWebApp

## UC1: Create db.json

+ Created a db.json file at the project root to act as a mock backend database.
+ Configured json-server to simulate a REST API for the web application.
+ Defined a units collection containing measurement units for Length, Weight, Temperature, and Volume.
+ Each unit object includes fields: id, type, label, and symbol.
+ Defined a conversions collection storing conversion logic between units.
+ Factor-based conversions use the format { from, to, factor, formula: null }.
+ Temperature conversions use formula strings such as (x*9/5)+32.
+ Added a history collection initialized as an empty array to store runtime conversion logs.
+ Verified the setup by running json-server --watch db.json --port 3000 and accessing http://localhost:3000/units.
