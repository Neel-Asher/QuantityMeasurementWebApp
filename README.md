# QuantityMeasurementWebApp

## UC6: Load History

+ Implemented API function getHistory() in api.js.
+ Function retrieves history records from json-server.
+ Used query parameters _sort=timestamp and _order=desc for sorting.
+ Ensured newest records appear first in the response.
+ Used fetch() to call /history endpoint.
+ Added validation using res.ok before parsing response.
+ Implemented error handling with try-catch.
+ Returned an empty array if no records or on failure.
+ Prepared application to display history data in the UI.
