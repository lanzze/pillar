export default {
  "sample.post-some": "/api/post-url",    // Use post request
  "sample.full": {
    url: "/api/url",                      // The request url
    method: "get|post|...",               // The request method
    field: "data|params",                 // Specify witch field as put request data. By default, post use 'data', get use 'params'.
    silent: true,                         // Don't show notify when error happened.
    original: false,                      // Don't extract data from response.
    ...                                   // Other axios options.
  }
}