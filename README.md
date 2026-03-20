# QuantityMeasurementWebApp

## UC4: Fetch Conversion Record

+ Implemented API function getConversion(from, to) in api.js.
+ Function retrieves conversion data from json-server using query parameters.
+ API request format: /conversions?from=X&to=Y.
+ Used fetch() to call the backend conversion endpoint.
+ Verified response status using res.ok before parsing JSON.
+ Parsed server response which returns an array for query requests.
+ Extracted the first element using data[0] as the conversion record.
+ Implemented error handling when no conversion entry exists.
+ Allows the application to dynamically retrieve conversion factors or formulas.
