# QuantityMeasurementWebApp

## UC3: Fetch Units by Type

+ Implemented an API utility module api.js for server communication.
+ Defined a constant BASE_URL = "http://localhost:3000" for all API requests.
+ Created an async function getUnits(type) to retrieve units from the server.
+ Implemented server-side filtering using the query parameter ?type=.
+ Used fetch() to call the endpoint /units?type=X.
+ Added validation using res.ok before parsing the response.
+ Returned parsed JSON data containing an array of unit objects.
+ Implemented error handling to catch network failures.
+ The application now retrieves unit data dynamically from json-server.
