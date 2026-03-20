# QuantityMeasurementWebApp

## UC5: Save to History

+ Implemented API function saveHistory(record) in api.js.
+ Function sends POST request to /history endpoint using json-server.
+ Used fetch() with method "POST" and appropriate headers.
+ Converted record object into JSON using JSON.stringify().
+ Server automatically assigns a unique id to each record.
+ Returned the saved record from the server response.
+ Implemented error handling using try-catch.
+ Logged errors without interrupting application flow.
+ Ensured history saving is non-blocking and does not affect user experience.
