# Table of Contents

- [(root) (1 files)](#root)
- [lib (2 files)](#lib)
- [lib/adapters (4 files)](#libadapters)
- [lib/cancel (3 files)](#libcancel)
- [lib/core (9 files)](#libcore)
- [lib/defaults (2 files)](#libdefaults)
- [lib/env (1 files)](#libenv)
- [lib/helpers (28 files)](#libhelpers)
- [lib/platform (1 files)](#libplatform)
- [lib/platform/common (1 files)](#libplatformcommon)
- [lib/platform/node (1 files)](#libplatformnode)
- [lib/platform/node/classes (2 files)](#libplatformnodeclasses)
# (root)

## Section Contents

- [index.js](#indexjs)

[Back to top](#table-of-contents)

## index.js

### Exports and re-exports Axios functionalities for modular use

The `index.js` file serves as a central module that re-exports the default Axios instance along with its various functionalities and utilities. This design ensures that the module can be used consistently in both ES module and CommonJS environments. 

The file begins by importing the default Axios instance from the `lib/axios.js` file. This instance is pre-configured with default settings and enhanced with various utilities and methods that make it a robust HTTP client library.

The imported Axios instance includes several key components and utilities:
- `Axios`: The core class responsible for handling HTTP requests.
- `AxiosError`: A custom error class for handling HTTP errors.
- `CanceledError`: A custom error class for handling canceled operations.
- `isCancel`: A utility function to check if a value represents a cancellation.
- `CancelToken`: Provides a mechanism to cancel asynchronous operations.
- `VERSION`: The version of the Axios library.
- `all`: An alias for `Promise.all`, allowing for the concurrent execution of multiple promises.
- `Cancel`: A class for creating cancel tokens.
- `isAxiosError`: A function to check if an error is from Axios.
- `spread`: A utility function for spreading array elements as function arguments.
- `toFormData`: Converts JavaScript objects to `FormData` for HTTP requests.
- `AxiosHeaders`: A class for managing HTTP headers.
- `HttpStatusCode`: An enumeration of HTTP status codes and their descriptions.
- `formToJSON`: Converts `FormData` or HTML forms to a nested JavaScript object.
- `getAdapter`: Selects the appropriate adapter based on the provided configuration.
- `mergeConfig`: Merges two configuration objects into a coherent combination.

The primary purpose of this file is to ensure that all these components and utilities are available as named exports. This is achieved by destructuring the Axios instance to extract its properties and then re-exporting them. The file maintains the top-level export as the default Axios instance while also providing named exports for each of the components and utilities.

By doing so, the module ensures that users can import the default Axios instance or any of its specific functionalities as needed. For example, a user can import the default Axios instance for general HTTP requests or import specific utilities like `CancelToken` or `AxiosError` for more specialized use cases.

This modular approach enhances the flexibility and usability of the Axios library. It allows developers to leverage the full power of Axios while also providing the option to import only the specific functionalities they need. This can lead to more efficient code and better performance, especially in large applications where minimizing dependencies is crucial.

In summary, the `index.js` file re-exports the default Axios instance along with its various components and utilities. This design ensures that the module can be used consistently in both ES module and CommonJS environments, providing a flexible and powerful tool for making HTTP requests. The file leverages the pre-configured Axios instance from `lib/axios.js` and makes all its functionalities available as named exports, enhancing the usability and flexibility of the Axios library.

[Back to (root)](#root) | [Back to top](#table-of-contents)

# lib

## Section Contents

- [lib/axios.js](#libaxiosjs)
- [lib/utils.js](#libutilsjs)

[Back to top](#table-of-contents)

## lib/axios.js

### Axios HTTP Client Library Initialization and Configuration

This file, `lib/axios.js`, initializes and configures the Axios HTTP client library, providing a flexible and powerful tool for making HTTP requests. The primary purpose of this file is to create an Axios instance with default settings and expose various functionalities and utilities that enhance the library's capabilities.

The `createInstance` function is central to this file. It takes a default configuration object and returns a new Axios instance. This instance is created by initializing a new `Axios` object with the provided configuration and binding its `request` method to the context. The `utils.extend` function is used to copy properties from the `Axios` prototype and context to the instance, ensuring that all methods and properties are available on the new instance.

The default Axios instance is created using the `defaults` configuration, which includes settings for request and response transformations, timeout, headers, and more. This instance is then exported as the default export of the module.

Several key classes and utilities are exposed through the Axios instance:

- `Axios`: The core class that handles HTTP requests.
- `CanceledError`: A custom error class for handling canceled operations.
- `CancelToken`: Provides a mechanism to cancel asynchronous operations.
- `isCancel`: A utility function to check if a value represents a cancellation.
- `VERSION`: The version of the Axios library.
- `toFormData`: Converts JavaScript objects to `FormData` for HTTP requests.
- `AxiosError`: A custom error class for handling HTTP errors.
- `spread`: A utility function for spreading array elements as function arguments.
- `isAxiosError`: A function to check if an error is from Axios.
- `AxiosHeaders`: A class for managing HTTP headers.
- `adapters`: Manages different adapters for handling HTTP requests using various methods such as HTTP, XHR, and Fetch.
- `HttpStatusCode`: An enumeration of HTTP status codes and their descriptions.

The `create` method on the Axios instance allows for the creation of new Axios instances with merged configurations, providing flexibility in managing different configurations for different use cases.

The `axios.all` method is an alias for `Promise.all`, allowing for the concurrent execution of multiple promises. The `spread` utility function is also exposed, simplifying the invocation of functions with an array of arguments.

The `formToJSON` method converts `FormData` or HTML forms to a nested JavaScript object, leveraging the `formDataToJSON` utility. This is useful for handling form submissions in a structured manner.

The `getAdapter` method selects the appropriate adapter based on the provided configuration, ensuring that the correct method is used for making HTTP requests in different environments.

The `mergeConfig` function is exposed to allow for the merging of two configuration objects, ensuring that the resulting configuration is a coherent combination of the input configurations.

The `axios.default` property is set to the Axios instance, ensuring that the module has a default export.

In summary, `lib/axios.js` initializes and configures the Axios HTTP client library, providing a flexible and powerful tool for making HTTP requests. It exposes various classes, utilities, and methods that enhance the library's capabilities, ensuring robust and adaptable HTTP operations. The file leverages a range of dependencies for type checking, object manipulation, error handling, and more, ensuring a comprehensive and reliable HTTP client library.

[Back to lib](#lib) | [Back to top](#table-of-contents)

## lib/utils.js

### Utility functions for type checking, object manipulation, and more.

This `lib/utils.js` file provides a comprehensive set of utility functions for various common tasks, including type checking, object manipulation, and string operations. The file imports a `bind` function from `lib/helpers/bind.js` to bind context to functions, ensuring consistent behavior of the `this` keyword.

Key functionalities include type-checking functions such as `isArray`, `isBuffer`, `isString`, `isFunction`, `isObject`, `isDate`, and many more. These functions help determine the type of a given value, enhancing code reliability and readability.

The file also includes object manipulation utilities like `merge`, which immutably merges properties of multiple objects, and `extend`, which mutably adds properties from one object to another. The `forEach` function iterates over arrays or objects, invoking a callback for each item, while `toFlatObject` resolves objects with deep prototype chains into flat objects.

String operations are covered with functions like `trim`, which removes excess whitespace, and `toCamelCase`, which converts strings to camel case. The `stripBOM` function removes byte order markers from strings, ensuring clean data processing.

Additional utilities include `toArray`, which converts array-like objects to arrays, `matchAll`, which finds all matches of a regular expression in a string, and `generateString`, which creates random strings of specified length using a given alphabet.

The file also provides specialized functions like `isSpecCompliantForm` to check for FormData compliance, `toJSONObject` to convert objects to JSON, and `isThenable` to check for promise-like objects. Overall, `lib/utils.js` is a versatile library of helper functions designed to streamline common programming tasks.

[Back to lib](#lib) | [Back to top](#table-of-contents)

# lib/adapters

## Section Contents

- [lib/adapters/adapters.js](#libadaptersadaptersjs)
- [lib/adapters/http.js](#libadaptershttpjs)
- [lib/adapters/xhr.js](#libadaptersxhrjs)
- [lib/adapters/fetch.js](#libadaptersfetchjs)

[Back to top](#table-of-contents)

## lib/adapters/adapters.js

### Adapter management for Axios with support for HTTP, XHR, and Fetch

This code manages different adapters for the Axios HTTP client library, enabling it to handle HTTP requests using various methods such as HTTP, XMLHttpRequest (XHR), and Fetch API. It imports utility functions from `lib/utils.js`, HTTP adapter from `lib/adapters/http.js`, XHR adapter from `lib/adapters/xhr.js`, Fetch adapter from `lib/adapters/fetch.js`, and a custom error class from `lib/core/AxiosError.js`.

The code defines a set of known adapters in the `knownAdapters` object, mapping adapter names ('http', 'xhr', 'fetch') to their respective implementations. It then iterates over these adapters using the `utils.forEach` function, which ensures consistent behavior across different environments. During this iteration, it attempts to define properties `name` and `adapterName` on each adapter function, providing a standardized way to reference them.

The `renderReason` function is a helper that formats rejection reasons for easier readability. The `isResolvedHandle` function checks if an adapter is a function, null, or false, determining if it is a valid adapter handle.

The main functionality is encapsulated in the exported object, which includes the `getAdapter` method and the `adapters` property. The `getAdapter` method is responsible for selecting the appropriate adapter based on the provided configuration. It accepts a single adapter or an array of adapters, normalizing the input to an array for consistent processing.

Within `getAdapter`, the code iterates over the provided adapters, attempting to resolve each one. If an adapter name is provided, it looks up the corresponding adapter function in the `knownAdapters` object. If the adapter is not found, it throws an `AxiosError` indicating an unknown adapter. If an adapter is found and valid, the loop breaks, and the adapter is returned.

If no suitable adapter is found after iterating through all provided options, the code constructs a detailed error message. It uses the `rejectedReasons` object to collect reasons for each rejected adapter, formatting them with the `renderReason` function. The final error message is constructed based on whether any adapters were specified and the collected rejection reasons. An `AxiosError` is then thrown with this message, indicating that no suitable adapter could be found.

The `adapters` property simply exposes the `knownAdapters` object, allowing external code to access the available adapters directly.

In summary, this code provides a robust mechanism for managing multiple adapters in the Axios library. It ensures that the appropriate adapter is selected based on the provided configuration, with detailed error handling and informative messages for unsupported or unavailable adapters. The use of utility functions from `lib/utils.js` enhances the code's reliability and readability, while the custom error handling with `AxiosError` ensures consistent and informative error reporting. This approach allows Axios to flexibly support different environments and request methods, making it a versatile HTTP client library.

[Back to lib/adapters](#libadapters) | [Back to top](#table-of-contents)

## lib/adapters/http.js

### HTTP adapter for Axios handling HTTP/HTTPS requests with advanced features

The `lib/adapters/http.js` file implements an HTTP adapter for Axios, enabling it to handle HTTP and HTTPS requests in Node.js environments. It leverages various dependencies to provide a comprehensive solution for making HTTP requests, handling redirects, managing proxies, and processing different types of data.

The adapter starts by importing essential modules and utilities, including `utils` for common tasks, `settle` for resolving or rejecting promises based on HTTP response status, and `buildFullPath` and `buildURL` for constructing URLs. It also imports Node.js core modules like `http`, `https`, and `zlib` for handling HTTP requests and compression, as well as third-party libraries like `followRedirects` for managing HTTP redirects and `proxy-from-env` for proxy configuration.

The adapter defines several utility functions and constants, such as `zlibOptions` and `brotliOptions` for compression settings, and `isBrotliSupported` to check for Brotli support. It also includes functions like `dispatchBeforeRedirect` and `setProxy` to manage proxy settings and handle redirects.

The main function, `httpAdapter`, is an asynchronous function that dispatches HTTP requests based on the provided Axios configuration. It first checks if the adapter is supported in the current environment. If supported, it wraps the request execution in a promise using the `wrapAsync` function to handle asynchronous operations.

The function processes the request configuration, including setting up event listeners for cancellation tokens and signals, parsing the URL, and managing request headers. It supports various data types, including `FormData`, `Blob`, and streams, and handles data transformation and encoding accordingly.

For HTTP basic authentication, the adapter constructs the `auth` header if credentials are provided in the configuration or URL. It then builds the request path using `buildURL` and sets the `Accept-Encoding` header to support gzip, deflate, and Brotli compression.

The adapter selects the appropriate transport method (HTTP or HTTPS) based on the protocol and configuration, and creates the HTTP request using the `transport.request` method. It handles request timeouts, socket settings, and error events to ensure robust request execution.

Upon receiving the response, the adapter processes the response stream, handling decompression if necessary and managing progress events for download and upload operations. It uses the `AxiosTransformStream` class to throttle and monitor data transfer rates, ensuring efficient data handling.

The response data is collected and processed based on the specified `responseType`, such as `stream`, `arraybuffer`, or `text`. The adapter resolves or rejects the promise using the `settle` function, providing the final response or error.

The adapter also includes error handling mechanisms, such as creating custom `AxiosError` instances for different error scenarios, including timeouts, unsupported protocols, and data transformation issues.

Overall, the `lib/adapters/http.js` file provides a robust HTTP adapter for Axios, leveraging various utilities and dependencies to handle complex HTTP requests and responses efficiently. It supports advanced features like proxy configuration, data streaming, compression, and progress monitoring, making it a versatile solution for HTTP communication in Node.js environments.

[Back to lib/adapters](#libadapters) | [Back to top](#table-of-contents)

## lib/adapters/xhr.js

### XMLHttpRequest adapter for Axios handling HTTP requests

This code defines an XMLHttpRequest (XHR) adapter for the Axios HTTP client library, enabling it to handle HTTP requests in environments where XHR is supported. The adapter is designed to work with Axios configurations and provides robust error handling, request cancellation, and progress event reporting.

The code begins by importing several dependencies, including utility functions, error classes, and configuration resolvers. It checks if the XMLHttpRequest object is available in the current environment, ensuring compatibility with browsers.

The main function returns a Promise that dispatches an XHR request based on the provided Axios configuration. It starts by resolving the configuration using the `resolveConfig` function, which merges default and user-provided settings. The request data and headers are extracted and normalized using the `AxiosHeaders` class.

An XMLHttpRequest object is created and configured with the HTTP method, URL, and timeout settings. Event listeners are attached to handle various stages of the request lifecycle:

- `onloadend`: Processes the response when the request completes. It extracts response headers and data, then calls the `settle` function to resolve or reject the Promise based on the HTTP status code.
- `onabort`: Handles request cancellation, rejecting the Promise with an `AxiosError` indicating the request was aborted.
- `onerror`: Handles network errors, rejecting the Promise with an `AxiosError` for network issues.
- `ontimeout`: Handles request timeouts, rejecting the Promise with an `AxiosError` indicating a timeout.

The code also manages request headers, adding them to the XHR object if applicable. It supports setting the `withCredentials` and `responseType` properties based on the configuration. Progress event listeners are added for upload and download progress reporting, using the `progressEventReducer` function to throttle and report progress events.

Cancellation is handled through the `cancelToken` and `signal` properties. If a cancellation token or signal is provided, the code subscribes to cancellation events and aborts the request if triggered. The `CanceledError` class is used to represent cancellation errors.

The protocol of the request URL is parsed using the `parseProtocol` function, and the request is rejected if the protocol is unsupported. Finally, the request is sent with the provided data.

In summary, this XHR adapter integrates seamlessly with Axios, providing a comprehensive solution for making HTTP requests in environments that support XMLHttpRequest. It handles various aspects of the request lifecycle, including configuration resolution, error handling, request cancellation, and progress reporting, ensuring robust and reliable HTTP communication.

[Back to lib/adapters](#libadapters) | [Back to top](#table-of-contents)

## lib/adapters/fetch.js

### Implements Axios adapter using Fetch API for HTTP requests with progress tracking and error handling

The `lib/adapters/fetch.js` file implements an adapter for the Axios HTTP client library using the Fetch API. This adapter provides a mechanism for making HTTP requests, tracking progress, and handling errors in a consistent manner. It leverages several dependencies to enhance its functionality, including platform-specific configurations, utility functions, custom error handling, and progress tracking utilities.

The code begins by importing necessary dependencies such as `platform`, `utils`, `AxiosError`, `composeSignals`, `trackStream`, `AxiosHeaders`, `progressEventReducer`, `resolveConfig`, and `settle`. These dependencies provide essential functionalities like environment detection, type checking, error handling, and configuration resolution.

The `fetchProgressDecorator` function is defined to create a progress event handler that reports the progress of data transfers. It takes the total size and a callback function as parameters, returning a function that invokes the callback with progress details.

The code checks for Fetch API support by verifying the existence of `fetch`, `Request`, and `Response` functions. It also checks for `ReadableStream` support to determine if request and response streaming is possible. The `encodeText` function is defined to encode text into a `Uint8Array`, using `TextEncoder` if available.

The `supportsRequestStream` and `supportsResponseStream` constants are defined to check if the environment supports request and response streaming, respectively. The `resolvers` object is initialized to map response types to their corresponding handlers, ensuring that unsupported response types throw an appropriate error.

The `getBodyLength` and `resolveBodyLength` functions are defined to calculate the length of the request body, supporting various data types like `Blob`, `FormData`, `ArrayBufferView`, `URLSearchParams`, and strings.

The main export is an asynchronous function that takes a configuration object and performs the HTTP request using the Fetch API. It begins by resolving the configuration using `resolveConfig` and extracting relevant properties like `url`, `method`, `data`, `signal`, `cancelToken`, `timeout`, `onDownloadProgress`, `onUploadProgress`, `responseType`, `headers`, `withCredentials`, and `fetchOptions`.

If a signal, cancel token, or timeout is provided, the `composeSignals` function is used to create a composed abort signal. The `onFinish` function is defined to handle cleanup after the request is completed.

The code checks if upload progress tracking is needed and if the environment supports request streaming. If so, it creates a new `Request` object with the appropriate method, body, and headers. The `trackStream` function is used to track the progress of the request body.

The `Request` object is then created with the resolved configuration, including the composed signal, method, headers, body, and credentials. The Fetch API is used to perform the request, and the response is processed based on the response type.

If download progress tracking or response streaming is needed, the `trackStream` function is used to track the progress of the response body. The response data is then resolved using the appropriate resolver function.

The `settle` function is used to resolve or reject the promise based on the response status. If an error occurs, it is handled appropriately, converting it to an `AxiosError` if necessary.

Overall, this file provides a robust implementation of an Axios adapter using the Fetch API, supporting progress tracking, error handling, and various data types for request and response bodies.

[Back to lib/adapters](#libadapters) | [Back to top](#table-of-contents)

# lib/cancel

## Section Contents

- [lib/cancel/isCancel.js](#libcanceliscanceljs)
- [lib/cancel/CanceledError.js](#libcancelcancelederrorjs)
- [lib/cancel/CancelToken.js](#libcancelcanceltokenjs)

[Back to top](#table-of-contents)

## lib/cancel/isCancel.js

### Utility function to check for cancellation

This module exports a single function, `isCancel`, which determines if a given value represents a cancellation. The function takes one argument, `value`, and returns a boolean. It checks if the `value` is truthy and contains a property named `__CANCEL__`. If both conditions are met, it returns `true`; otherwise, it returns `false`. This utility is typically used in scenarios where operations can be canceled, and there is a need to verify if a particular value signifies such a cancellation. The function is straightforward and does not rely on any external dependencies, ensuring lightweight and efficient execution.

[Back to lib/cancel](#libcancel) | [Back to top](#table-of-contents)

## lib/cancel/CanceledError.js

### Custom error class for handling canceled operations in Axios

The `CanceledError.js` file defines a specialized error class, `CanceledError`, which is used to represent errors that occur when an operation is canceled within the Axios HTTP client library. This class extends the custom `AxiosError` class, providing additional context and functionality specific to canceled operations.

The `CanceledError` constructor takes three optional parameters: `message`, `config`, and `request`. The `message` parameter allows for a custom error message, defaulting to 'canceled' if not provided. The `config` parameter can include configuration settings related to the HTTP request, and the `request` parameter can contain the original request object. These parameters help encapsulate detailed information about the canceled operation, aiding in debugging and error handling.

The constructor calls the `AxiosError` constructor using `AxiosError.call(this, ...)`, passing the provided message, a predefined error code `AxiosError.ERR_CANCELED`, and the optional `config` and `request` parameters. This ensures that the `CanceledError` instance inherits all properties and methods from the `AxiosError` class, including the detailed error context.

The `name` property of the `CanceledError` instance is explicitly set to 'CanceledError', making it easy to identify this specific type of error.

To establish inheritance from `AxiosError`, the `utils.inherits` function from `lib/utils.js` is used. This utility function sets up the prototype chain so that `CanceledError` inherits from `AxiosError`. Additionally, it adds a custom property `__CANCEL__` set to `true`, which can be used to easily identify instances of `CanceledError`.

By extending `AxiosError`, the `CanceledError` class benefits from the robust error handling mechanisms provided by `AxiosError`, such as detailed error messages, error codes, and the ability to serialize the error object into JSON format. This makes it easier to manage and debug errors related to canceled operations in the Axios library.

In summary, `CanceledError.js` provides a specialized error class for handling canceled operations in Axios. It extends the `AxiosError` class to include additional context and functionality specific to cancellations, making it easier to identify, manage, and debug such errors. The use of utility functions from `lib/utils.js` ensures efficient inheritance and adds custom properties for better error identification.

[Back to lib/cancel](#libcancel) | [Back to top](#table-of-contents)

## lib/cancel/CancelToken.js

### Provides a mechanism to cancel asynchronous operations in Axios.

The `CancelToken` class in `lib/cancel/CancelToken.js` is designed to facilitate the cancellation of asynchronous operations within the Axios HTTP client library. This class allows developers to create tokens that can be used to signal and handle the cancellation of requests, enhancing the control over HTTP operations.

The `CancelToken` constructor takes an executor function as its parameter. This executor function is responsible for defining the cancellation logic. If the provided executor is not a function, a `TypeError` is thrown. Within the constructor, a `Promise` is created, which will be resolved when a cancellation is requested. The `resolvePromise` function is stored to be called later when the cancellation occurs.

The `promise` property of the `CancelToken` instance is a `Promise` that resolves when the cancellation is requested. When this promise resolves, it triggers any subscribed listeners, notifying them of the cancellation. The promise also has a custom `then` method that allows for subscription to the cancellation signal and provides a mechanism to unsubscribe if needed.

The `executor` function passed to the `CancelToken` constructor is called with a `cancel` function. This `cancel` function, when invoked, creates a new `CanceledError` instance (imported from `CanceledError.js`) with optional parameters: `message`, `config`, and `request`. This error instance encapsulates detailed information about the canceled operation. The `resolvePromise` function is then called with the `CanceledError` instance, resolving the promise and signaling the cancellation.

The `throwIfRequested` method throws the `CanceledError` if a cancellation has already been requested, allowing for immediate termination of the operation.

The `subscribe` method allows listeners to be added to the cancellation signal. If the cancellation has already been requested, the listener is immediately invoked with the `CanceledError`. Otherwise, the listener is added to the `_listeners` array.

The `unsubscribe` method removes a listener from the `_listeners` array, preventing it from being notified of the cancellation.

The static `source` method provides a convenient way to create a new `CancelToken` and a corresponding `cancel` function. This method returns an object containing the `CancelToken` instance and the `cancel` function, which can be called to request cancellation.

In summary, the `CancelToken` class provides a robust mechanism for handling the cancellation of asynchronous operations in Axios. By leveraging promises and custom error handling, it allows developers to manage and respond to cancellation requests effectively. The integration with the `CanceledError` class ensures that detailed information about the cancellation is available, aiding in debugging and error handling. This class is essential for scenarios where operations may need to be aborted, such as user-initiated cancellations or timeout conditions.

[Back to lib/cancel](#libcancel) | [Back to top](#table-of-contents)

# lib/core

## Section Contents

- [lib/core/Axios.js](#libcoreaxiosjs)
- [lib/core/AxiosError.js](#libcoreaxioserrorjs)
- [lib/core/InterceptorManager.js](#libcoreinterceptormanagerjs)
- [lib/core/dispatchRequest.js](#libcoredispatchrequestjs)
- [lib/core/transformData.js](#libcoretransformdatajs)
- [lib/core/AxiosHeaders.js](#libcoreaxiosheadersjs)
- [lib/core/settle.js](#libcoresettlejs)
- [lib/core/buildFullPath.js](#libcorebuildfullpathjs)
- [lib/core/mergeConfig.js](#libcoremergeconfigjs)

[Back to top](#table-of-contents)

## lib/core/Axios.js

### Axios.js: Core HTTP Client for Configurable Requests

The `Axios.js` file defines the core functionality of the Axios HTTP client, enabling configurable and interceptable HTTP requests. The primary class, `Axios`, is designed to handle HTTP requests with a high degree of flexibility and customization.

The `Axios` class constructor initializes an instance with a default configuration (`instanceConfig`) and sets up two interceptor managers for request and response interceptors. These interceptors allow for pre-processing and post-processing of requests and responses, respectively.

The `request` method is the main entry point for making HTTP requests. It accepts either a URL string or a configuration object, merging it with the instance's default configuration using the `mergeConfig` function. This merged configuration is then processed to handle transitional options, parameter serialization, and method normalization.

Headers are flattened and merged using utilities from `lib/utils.js` and the `AxiosHeaders` class, ensuring consistent header management. The request and response interceptors are then applied. If any request interceptors are synchronous, they are executed in sequence before the request is dispatched using the `dispatchRequest` function. This function handles the actual HTTP request, applying data transformations and managing cancellations.

The `getUri` method constructs the full request URL by combining the base URL with the requested URL and appending query parameters. This is achieved using the `buildFullPath` and `buildURL` utilities.

The `Axios` class also provides aliases for common HTTP methods (`delete`, `get`, `head`, `options`, `post`, `put`, `patch`). These aliases simplify making requests by pre-configuring the method and optionally setting headers for form data.

The `InterceptorManager` class, used for managing interceptors, allows for dynamic addition, removal, and iteration of interceptors. This enables complex asynchronous workflows by modifying requests and responses at various stages.

The `dispatchRequest` function is responsible for handling the entire lifecycle of an HTTP request. It checks for cancellations, normalizes headers, transforms request data, selects the appropriate adapter, and processes the response. This function ensures that data is consistently transformed and cancellations are appropriately managed.

The `mergeConfig` function combines two configuration objects into a new one, applying specific merging strategies for different properties. This ensures that the resulting configuration is a coherent combination of the input configurations.

The `buildFullPath` function constructs a complete URL by combining a base URL with a requested URL, ensuring proper formatting and validation. It uses the `isAbsoluteURL` and `combineURLs` utilities to handle URL construction robustly.

The `validator` utility provides functions for validating options and handling transitional configurations. It ensures that options passed to Axios functions are correctly validated, preventing runtime errors and maintaining consistency.

The `AxiosHeaders` class manages HTTP headers, allowing for setting, getting, deleting, and normalizing headers. It ensures consistent and efficient header handling across various use cases.

In summary, `Axios.js` is the core of the Axios HTTP client, providing a flexible and configurable way to make HTTP requests. It leverages a range of utilities and classes to handle data transformation, cancellation, interceptor management, and configuration merging, ensuring robust and adaptable HTTP operations.

[Back to lib/core](#libcore) | [Back to top](#table-of-contents)

## lib/core/AxiosError.js

### Custom error class for Axios library

The `AxiosError.js` file defines a custom error class, `AxiosError`, tailored for the Axios HTTP client library. This class extends the native JavaScript `Error` object to provide additional context and functionality specific to HTTP requests and responses.

The `AxiosError` constructor takes parameters such as `message`, `code`, `config`, `request`, and `response`. These parameters help encapsulate detailed information about the error, including the error message, error code (e.g., 'ECONNABORTED'), configuration settings, the original request, and the received response. The constructor also captures the stack trace for better debugging.

The file uses utility functions from `lib/utils.js` to enhance the functionality of `AxiosError`. For instance, `utils.inherits` is used to set up inheritance from the native `Error` object and to add a `toJSON` method. This `toJSON` method serializes the error object into a JSON format, including standard error properties like `message`, `name`, and `stack`, as well as Axios-specific properties like `config`, `code`, and `status`.

A set of predefined error codes such as 'ERR_BAD_OPTION_VALUE', 'ECONNABORTED', and 'ERR_NETWORK' are defined and attached to the `AxiosError` class using `Object.defineProperties`. These codes help in categorizing and handling different types of errors more effectively.

The prototype of `AxiosError` is extended with an `isAxiosError` property set to `true`, allowing for easy identification of Axios-specific errors.

Additionally, a static method `AxiosError.from` is provided to create an `AxiosError` instance from an existing error object. This method copies properties from the original error to the new `AxiosError` instance, preserving the original error's context while adding Axios-specific details. Custom properties can also be merged into the new error object using `Object.assign`.

Overall, `AxiosError.js` provides a robust mechanism for error handling in the Axios library, offering detailed error information and facilitating easier debugging and error management. The use of utility functions from `lib/utils.js` ensures efficient type checking, object manipulation, and serialization, making the error handling process more streamlined and effective.

[Back to lib/core](#libcore) | [Back to top](#table-of-contents)

## lib/core/InterceptorManager.js

### Manages a stack of interceptors for handling promises.

The `InterceptorManager` class in `lib/core/InterceptorManager.js` is designed to manage a stack of interceptors, which are functions that can process or modify requests and responses in a promise-based workflow. This class is particularly useful in scenarios where you need to add, remove, or iterate over multiple interceptors that handle asynchronous operations, such as HTTP requests.

The class constructor initializes an empty array called `handlers`, which will store the interceptors. Each interceptor is an object containing `fulfilled` and `rejected` functions, which handle the resolution and rejection of promises, respectively. Additionally, interceptors can have options like `synchronous` and `runWhen` to control their execution behavior.

The `use` method allows you to add a new interceptor to the stack. It accepts three parameters: `fulfilled`, `rejected`, and an optional `options` object. The method pushes an interceptor object into the `handlers` array and returns the index of the newly added interceptor. This index can be used later to remove the interceptor.

To remove an interceptor, the `eject` method is provided. It takes an `id` (the index returned by `use`) and sets the corresponding interceptor in the `handlers` array to `null`. This effectively removes the interceptor from the stack, although the array slot remains.

The `clear` method is a utility function that empties the `handlers` array, removing all interceptors at once. This is useful for resetting the interceptor stack to its initial state.

The `forEach` method iterates over all registered interceptors, invoking a provided callback function for each one. This method skips any interceptors that have been set to `null` by the `eject` method, ensuring that only active interceptors are processed. The iteration is facilitated by the `forEach` utility function from `lib/utils.js`, which abstracts the iteration logic.

Overall, `InterceptorManager` provides a robust mechanism for managing a series of interceptors, making it easier to handle complex asynchronous workflows by allowing dynamic addition, removal, and iteration of interceptor functions.

[Back to lib/core](#libcore) | [Back to top](#table-of-contents)

## lib/core/dispatchRequest.js

### Handles HTTP requests with transformation, cancellation, and adapter management.

The `dispatchRequest.js` file is a core component responsible for managing HTTP requests within a JavaScript library. It leverages several dependencies to handle data transformation, cancellation, and adapter selection, ensuring robust and flexible HTTP operations.

The primary function, `dispatchRequest`, takes a configuration object (`config`) as its parameter and returns a Promise that resolves with the HTTP response or rejects with an error. The process begins by checking for any cancellation requests using the `throwIfCancellationRequested` function. This function examines the `cancelToken` and `signal` properties of the `config` object to determine if the request has been canceled. If a cancellation is detected, a `CanceledError` is thrown.

Next, the function normalizes the request headers using the `AxiosHeaders` class, ensuring consistent header management. The request data is then transformed using the `transformData` function, which applies a series of transformation functions specified in the `config.transformRequest` array. This preprocessing step ensures that the data conforms to the expected format before being sent.

For HTTP methods like `post`, `put`, and `patch`, the content type of the request is set to `application/x-www-form-urlencoded` if it hasn't been explicitly defined. This is done using the `setContentType` method of the `AxiosHeaders` class.

The appropriate adapter for the request is selected using the `getAdapter` method from the `adapters` module. The adapter is responsible for making the actual HTTP request. The `config.adapter` property or the default adapter from the `defaults` module is used to determine which adapter to use.

Once the adapter is selected, the request is dispatched, and the response is handled in the `onAdapterResolution` function. This function first checks for any cancellation requests again to ensure the request hasn't been canceled during the process. The response data is then transformed using the `transformData` function, applying the transformation functions specified in the `config.transformResponse` array. The response headers are also normalized using the `AxiosHeaders` class.

If the request fails, the `onAdapterRejection` function handles the error. It first checks if the error is due to a cancellation using the `isCancel` function. If not, it checks for any cancellation requests again. If the error contains a response object, the response data and headers are transformed and normalized similarly to the successful response handling. The error is then rejected with the transformed response data.

In summary, `dispatchRequest.js` orchestrates the entire lifecycle of an HTTP request, from preprocessing the request data and headers to handling the response or error. It ensures that data is consistently transformed and that cancellations are appropriately managed. The use of adapters allows for flexible handling of HTTP requests, supporting various methods such as HTTP, XHR, and Fetch. This modular approach makes the code robust and adaptable to different environments and requirements.

[Back to lib/core](#libcore) | [Back to top](#table-of-contents)

## lib/core/transformData.js

### Function to Transform Request/Response Data

The `transformData` function in `lib/core/transformData.js` is designed to transform the data for HTTP requests or responses using a series of transformation functions. This function is crucial for preprocessing data before sending it in a request or after receiving it in a response, ensuring that the data conforms to the expected format and structure.

The function accepts two parameters: `fns`, which can be a single function or an array of functions, and `response`, which is an optional response object. The purpose of these parameters is to apply the transformation functions to the data within the context of either the current configuration or the provided response.

The function begins by determining the configuration context. If `this` is available, it uses `this`; otherwise, it defaults to the global `defaults` configuration imported from `lib/defaults/index.js`. The `context` variable is set to either the provided `response` object or the determined configuration.

Next, the function creates an instance of `AxiosHeaders` from the headers present in the context. The `AxiosHeaders` class, imported from `lib/core/AxiosHeaders.js`, provides a robust solution for managing HTTP headers, including setting, getting, deleting, and normalizing headers. This ensures that the headers are consistently formatted and ready for transformation.

The data to be transformed is extracted from the context's `data` property. The function then iterates over the `fns` array (or single function) using the `forEach` utility function from `lib/utils.js`. This utility function is part of a comprehensive set of helper functions provided by `lib/utils.js`, which includes type checking, object manipulation, and more.

For each transformation function in `fns`, the function calls it with the current data, normalized headers, and optionally the response status if a response object is provided. The transformation function is invoked with the configuration context (`config`) as its `this` value, ensuring that it has access to the necessary configuration settings.

After all transformation functions have been applied, the headers are normalized again to ensure consistency. Finally, the transformed data is returned.

In summary, the `transformData` function is a key component for data transformation in HTTP operations. It leverages utility functions and classes from its dependencies to ensure that data and headers are consistently and correctly processed. This function is essential for handling various data types and ensuring that the data conforms to the expected format before being sent in a request or after being received in a response.

[Back to lib/core](#libcore) | [Back to top](#table-of-contents)

## lib/core/AxiosHeaders.js

### A class for managing HTTP headers in Axios

The `AxiosHeaders` class in `lib/core/AxiosHeaders.js` provides a robust solution for managing HTTP headers within the Axios library. This class allows for the setting, getting, deleting, and normalizing of HTTP headers, ensuring they are handled consistently and efficiently.

The class constructor initializes headers if provided. The `set` method allows setting headers, either individually or in bulk, with support for various input formats such as plain objects, strings, or instances of the `AxiosHeaders` class. It normalizes header names and values, ensuring they are in a consistent format. The method also handles rewriting of existing headers based on specific conditions.

The `get` method retrieves the value of a specified header, with optional parsing capabilities. It supports various parsers, including functions, regular expressions, and a boolean flag for token parsing. The `has` method checks for the existence of a header, optionally matching its value against a provided filter.

The `delete` method removes specified headers, optionally matching their values against a filter. The `clear` method removes all headers, optionally filtering them based on a provided matcher. The `normalize` method ensures all headers are in a consistent format, optionally applying a specific formatting function.

The `concat` method merges multiple header objects into a single `AxiosHeaders` instance. The `toJSON` method converts the headers to a JSON-compatible object, with an option to represent array values as comma-separated strings. The class also implements the iterator protocol, allowing headers to be iterated over using a `for...of` loop.

Static methods include `from`, which creates an `AxiosHeaders` instance from various input types, and `concat`, which merges multiple header objects. The `accessor` method defines getter, setter, and checker methods for specified headers, enhancing ease of access and manipulation.

The class uses utility functions from `lib/utils.js` for tasks such as type checking, object manipulation, and string operations. It also leverages the `parseHeaders` function from `lib/helpers/parseHeaders.js` to convert raw header strings into structured objects.

Overall, `AxiosHeaders` provides a comprehensive and flexible solution for managing HTTP headers in Axios, ensuring they are handled consistently and efficiently across various use cases.

[Back to lib/core](#libcore) | [Back to top](#table-of-contents)

## lib/core/settle.js

### Function to resolve or reject a promise based on HTTP response status

The `lib/core/settle.js` file defines a function that resolves or rejects a promise based on the HTTP response status. This function, `settle`, is designed to handle the outcome of HTTP requests made using the Axios library. It takes three parameters: `resolve`, `reject`, and `response`.

The `resolve` and `reject` parameters are functions that correspond to the promise's resolution and rejection handlers, respectively. The `response` parameter is an object representing the HTTP response received from the server.

The primary purpose of the `settle` function is to determine whether the HTTP request was successful or not, based on the status code of the response. It does this by checking the `validateStatus` function defined in the response's configuration (`response.config.validateStatus`). This `validateStatus` function is a user-defined function that takes a status code as input and returns `true` if the status code is considered valid (indicating a successful request), or `false` otherwise.

If the response status code is either not present, or the `validateStatus` function returns `true` for the given status code, the `settle` function calls the `resolve` function, passing the `response` object to it. This indicates that the HTTP request was successful, and the promise is resolved with the response data.

If the `validateStatus` function returns `false` for the given status code, the `settle` function creates a new instance of the `AxiosError` class, which is a custom error class tailored for the Axios library. The `AxiosError` instance is created with a message indicating that the request failed due to the status code, an error code that categorizes the error (either `ERR_BAD_REQUEST` or `ERR_BAD_RESPONSE`), and additional context such as the request configuration, the original request, and the response.

The `AxiosError` class, defined in `lib/core/AxiosError.js`, extends the native JavaScript `Error` object to provide more detailed information about HTTP errors, including the error message, error code, configuration settings, the original request, and the received response. This enhanced error handling mechanism helps in better debugging and managing errors specific to HTTP requests made using Axios.

Finally, the `settle` function calls the `reject` function, passing the `AxiosError` instance to it. This indicates that the HTTP request failed, and the promise is rejected with the error information.

In summary, the `settle` function in `lib/core/settle.js` is a crucial part of the Axios library's error handling mechanism, determining the success or failure of HTTP requests based on response status codes and resolving or rejecting promises accordingly.

[Back to lib/core](#libcore) | [Back to top](#table-of-contents)

## lib/core/buildFullPath.js

### Combines base URL with relative URL unless the URL is already absolute.

This module provides a function `buildFullPath` that constructs a complete URL by combining a base URL with a requested URL, but only if the requested URL is not already absolute. The function takes two parameters: `baseURL` and `requestedURL`. It first checks if the `requestedURL` is absolute using the `isAbsoluteURL` utility. The `isAbsoluteURL` function determines if a URL starts with a scheme like `http://` or `https://`, or is protocol-relative (starting with `//`). If the `requestedURL` is absolute, `buildFullPath` returns it unchanged.

If the `requestedURL` is not absolute, the function uses the `combineURLs` utility to concatenate the `baseURL` with the `requestedURL`. The `combineURLs` function ensures that any trailing slashes from the `baseURL` and leading slashes from the `requestedURL` are removed before concatenation, preventing malformed URLs. This utility is essential for dynamically generating complete URLs from base and relative paths, ensuring proper formatting.

In summary, `buildFullPath` is a utility function designed to handle URL construction in a flexible and robust manner. It ensures that absolute URLs are returned as-is, while relative URLs are correctly combined with a base URL. This function is particularly useful in web development scenarios where URLs need to be dynamically generated and validated, ensuring that resources and links are correctly identified and formatted. The use of `isAbsoluteURL` and `combineURLs` makes the function lightweight and easy to integrate into various projects, providing a reliable solution for URL management.

[Back to lib/core](#libcore) | [Back to top](#table-of-contents)

## lib/core/mergeConfig.js

### Merges two Axios configuration objects into a new configuration object.

The `mergeConfig` function in `lib/core/mergeConfig.js` is designed to merge two Axios configuration objects into a single, new configuration object. This function ensures that the resulting configuration is a combination of the properties from both input configurations, with specific rules governing how each property is merged.

The function begins by ensuring that the second configuration object (`config2`) is defined, defaulting to an empty object if it is not provided. It then initializes an empty object (`config`) to hold the merged configuration.

A helper function, `getMergedValue`, is defined to handle the merging of individual values. This function checks the types of the target and source values, using utility functions from `lib/utils.js` to determine if they are plain objects or arrays. If both values are plain objects, they are merged using the `utils.merge` function. If the source value is an array, it is cloned using the `slice` method. Otherwise, the source value is returned as is.

Several other helper functions are defined to handle different merging strategies:
- `mergeDeepProperties` merges properties deeply, ensuring nested objects are combined.
- `valueFromConfig2` prioritizes values from the second configuration.
- `defaultToConfig2` uses values from the second configuration if they exist, otherwise falling back to the first configuration.
- `mergeDirectKeys` directly merges properties if they exist in either configuration.

A `mergeMap` object is defined to specify the merging strategy for specific configuration properties. For example, properties like `url`, `method`, and `data` use the `valueFromConfig2` strategy, while properties like `baseURL`, `timeout`, and `headers` use the `defaultToConfig2` or `mergeDeepProperties` strategies. The `headers` property is handled specially, using the `headersToObject` function to convert `AxiosHeaders` instances to plain objects before merging.

The `utils.forEach` function iterates over all unique keys from both configuration objects, applying the appropriate merging strategy based on the `mergeMap`. If a key is not explicitly listed in the `mergeMap`, the `mergeDeepProperties` strategy is used by default. The merged value for each property is then added to the `config` object, unless it is `undefined` and the merging strategy is not `mergeDirectKeys`.

Finally, the merged configuration object is returned.

Overall, `mergeConfig` leverages utility functions for type checking and object manipulation from `lib/utils.js`, and it handles HTTP headers using the `AxiosHeaders` class from `lib/core/AxiosHeaders.js`. This ensures a robust and flexible merging process that accommodates various configuration scenarios in Axios.

[Back to lib/core](#libcore) | [Back to top](#table-of-contents)

# lib/defaults

## Section Contents

- [lib/defaults/index.js](#libdefaultsindexjs)
- [lib/defaults/transitional.js](#libdefaultstransitionaljs)

[Back to top](#table-of-contents)

## lib/defaults/index.js

### Default configuration for HTTP requests and responses in a JavaScript library

This file defines the default configuration settings for HTTP requests and responses in a JavaScript library, leveraging various utility functions and custom error handling mechanisms. The `defaults` object encapsulates these settings, ensuring consistent behavior across different HTTP operations.

The `stringifySafely` function attempts to parse a string and, if it fails, returns the stringified version of the input. This ensures that the data is safely converted to a string format, avoiding syntax errors during JSON parsing.

The `defaults` object includes several key properties:

- `transitional`: Uses settings from `transitionalDefaults` to manage JSON parsing and timeout error handling.
- `adapter`: Specifies the adapters (`xhr`, `http`, `fetch`) used for making HTTP requests.
- `transformRequest`: An array of functions to transform the request data before sending it. This includes handling various data types such as `FormData`, `ArrayBuffer`, `Buffer`, `Stream`, `File`, `Blob`, and `URLSearchParams`. It also converts HTML forms to `FormData` and objects to URL-encoded or JSON strings based on the content type.
- `transformResponse`: An array of functions to transform the response data after receiving it. It handles JSON parsing based on the response type and transitional settings, throwing errors for bad responses when strict JSON parsing is enabled.
- `timeout`: Sets the request timeout in milliseconds. A value of 0 means no timeout.
- `xsrfCookieName` and `xsrfHeaderName`: Define the names for the XSRF token cookie and header, respectively.
- `maxContentLength` and `maxBodyLength`: Set the maximum allowed content and body length for requests.
- `env`: Specifies environment-specific classes like `FormData` and `Blob` from the `platform` module.
- `validateStatus`: A function to validate HTTP response status codes, considering responses with status codes between 200 and 299 as successful.
- `headers`: Defines default headers for common HTTP methods (`delete`, `get`, `head`, `post`, `put`, `patch`), including the `Accept` header for all requests.

The file imports several dependencies to achieve its functionality:

- `utils` from `lib/utils.js` provides utility functions for type checking, object manipulation, and more.
- `AxiosError` from `lib/core/AxiosError.js` offers a custom error class for handling HTTP errors.
- `transitionalDefaults` from `lib/defaults/transitional.js` provides default settings for JSON parsing and timeout error handling.
- `toFormData` from `lib/helpers/toFormData.js` converts JavaScript objects to `FormData`.
- `toURLEncodedForm` from `lib/helpers/toURLEncodedForm.js` converts objects to URL-encoded form data.
- `platform` from `lib/platform/index.js` combines Node.js environment configurations and utility functions.
- `formDataToJSON` from `lib/helpers/formDataToJSON.js` converts `FormData` to a nested JavaScript object.

Overall, this file establishes a comprehensive default configuration for handling HTTP requests and responses, ensuring robust data transformation, error handling, and compatibility with various data types and environments.

[Back to lib/defaults](#libdefaults) | [Back to top](#table-of-contents)

## lib/defaults/transitional.js

### Configuration object for JSON parsing and timeout error handling

This file defines a default configuration object for handling JSON parsing and timeout errors in a JavaScript application. The configuration includes three properties: `silentJSONParsing`, `forcedJSONParsing`, and `clarifyTimeoutError`. 

`silentJSONParsing` is set to `true`, indicating that JSON parsing errors should not throw exceptions, allowing the application to handle them silently. `forcedJSONParsing` is also set to `true`, ensuring that the application attempts to parse JSON responses even if the `Content-Type` header is not set to `application/json`. Lastly, `clarifyTimeoutError` is set to `false`, meaning that timeout errors will not include additional clarification messages by default. 

These settings provide a robust way to manage JSON parsing and error handling, making the application more resilient to common issues related to data interchange and network timeouts.

[Back to lib/defaults](#libdefaults) | [Back to top](#table-of-contents)

# lib/env

## Section Contents

- [lib/env/data.js](#libenvdatajs)

[Back to top](#table-of-contents)

## lib/env/data.js

### Defines the version of the application

This file, `lib/env/data.js`, is responsible for defining and exporting the version number of the application. The version is stored in a constant named `VERSION` and is currently set to "1.7.2". This versioning information is crucial for maintaining and tracking the application's updates and releases. By exporting the version constant, other parts of the application can import and utilize this version information, ensuring consistency across the codebase. This approach helps in managing dependencies and compatibility, especially when dealing with multiple environments or modules that need to be aware of the application's version.

[Back to lib/env](#libenv) | [Back to top](#table-of-contents)

# lib/helpers

## Section Contents

- [lib/helpers/bind.js](#libhelpersbindjs)
- [lib/helpers/buildURL.js](#libhelpersbuildurljs)
- [lib/helpers/AxiosURLSearchParams.js](#libhelpersaxiosurlsearchparamsjs)
- [lib/helpers/toFormData.js](#libhelperstoformdatajs)
- [lib/helpers/toURLEncodedForm.js](#libhelperstourlencodedformjs)
- [lib/helpers/formDataToJSON.js](#libhelpersformdatatojsonjs)
- [lib/helpers/parseHeaders.js](#libhelpersparseheadersjs)
- [lib/helpers/isAbsoluteURL.js](#libhelpersisabsoluteurljs)
- [lib/helpers/combineURLs.js](#libhelperscombineurlsjs)
- [lib/helpers/fromDataURI.js](#libhelpersfromdataurijs)
- [lib/helpers/parseProtocol.js](#libhelpersparseprotocoljs)
- [lib/helpers/AxiosTransformStream.js](#libhelpersaxiostransformstreamjs)
- [lib/helpers/throttle.js](#libhelpersthrottlejs)
- [lib/helpers/speedometer.js](#libhelpersspeedometerjs)
- [lib/helpers/formDataToStream.js](#libhelpersformdatatostreamjs)
- [lib/helpers/readBlob.js](#libhelpersreadblobjs)
- [lib/helpers/ZlibHeaderTransformStream.js](#libhelperszlibheadertransformstreamjs)
- [lib/helpers/callbackify.js](#libhelperscallbackifyjs)
- [lib/helpers/progressEventReducer.js](#libhelpersprogresseventreducerjs)
- [lib/helpers/resolveConfig.js](#libhelpersresolveconfigjs)
- [lib/helpers/isURLSameOrigin.js](#libhelpersisurlsameoriginjs)
- [lib/helpers/cookies.js](#libhelperscookiesjs)
- [lib/helpers/composeSignals.js](#libhelperscomposesignalsjs)
- [lib/helpers/trackStream.js](#libhelperstrackstreamjs)
- [lib/helpers/validator.js](#libhelpersvalidatorjs)
- [lib/helpers/spread.js](#libhelpersspreadjs)
- [lib/helpers/isAxiosError.js](#libhelpersisaxioserrorjs)
- [lib/helpers/HttpStatusCode.js](#libhelpershttpstatuscodejs)

[Back to top](#table-of-contents)

## lib/helpers/bind.js

### Utility function for binding context to a function

This module exports a single function, `bind`, which is designed to bind a given function (`fn`) to a specified context (`thisArg`). The `bind` function returns a new function, `wrap`, which, when invoked, calls the original function (`fn`) with the `thisArg` context and any arguments passed to `wrap`. This ensures that the `this` keyword inside `fn` refers to `thisArg`, regardless of how `wrap` is called. This utility is useful for maintaining the intended context of `this` in callback functions or event handlers, ensuring consistent behavior. The module does not rely on any external dependencies, making it lightweight and easy to integrate into various projects.

[Back to lib/helpers](#libhelpers) | [Back to top](#table-of-contents)

## lib/helpers/buildURL.js

### Utility for constructing URLs with query parameters

The `lib/helpers/buildURL.js` file provides a utility function designed to construct URLs by appending query parameters to a base URL. This is particularly useful for preparing URLs for HTTP requests, ensuring that parameters are correctly formatted and encoded.

The file imports utility functions from `lib/utils.js` and a class from `lib/helpers/AxiosURLSearchParams.js`. The `utils` module offers various utility functions, including type checking and object manipulation, while `AxiosURLSearchParams` helps convert JavaScript objects into URL-encoded query strings.

The `encode` function within this file is responsible for encoding special characters in the query parameters. It uses `encodeURIComponent` to perform the initial encoding and then replaces specific characters like `:`, `$`, `,`, `+`, `[`, and `]` with their URI-encoded counterparts. This ensures that the query parameters are safely included in the URL.

The main function, `buildURL`, takes three arguments: `url`, `params`, and `options`. The `url` is the base URL to which the parameters will be appended. The `params` is an object containing key-value pairs to be included as query parameters. The `options` parameter allows for additional configuration, such as custom encoding and serialization functions.

If no `params` are provided, the function simply returns the base URL. Otherwise, it proceeds to encode and serialize the parameters. The function first checks if a custom encoding function is provided in the `options`; if not, it defaults to the `encode` function defined earlier. It also checks for a custom serialization function. If a custom serialization function is provided, it uses that to serialize the parameters. Otherwise, it uses the `AxiosURLSearchParams` class to convert the parameters into a URL-encoded query string.

The `utils.isURLSearchParams` function is used to check if the `params` object is already an instance of `URLSearchParams`. If it is, the `toString` method of `URLSearchParams` is used to generate the query string. If not, a new instance of `AxiosURLSearchParams` is created, and its `toString` method is called to generate the query string.

Once the parameters are serialized, the function checks if the base URL contains a hash (`#`). If a hash is present, it removes the hash and everything following it, as query parameters should not be appended after a hash. The function then appends the serialized parameters to the base URL, using either a `?` or `&` depending on whether the base URL already contains query parameters.

Finally, the function returns the constructed URL with the appended query parameters. This utility ensures that URLs are correctly formatted and encoded, making it a versatile tool for preparing URLs for HTTP requests.

[Back to lib/helpers](#libhelpers) | [Back to top](#table-of-contents)

## lib/helpers/AxiosURLSearchParams.js

### Utility for converting parameters to URL-encoded query strings

The `AxiosURLSearchParams.js` file provides a utility class, `AxiosURLSearchParams`, designed to convert JavaScript objects into URL-encoded query strings. This is particularly useful for preparing data to be sent in HTTP requests, ensuring that parameters are correctly formatted for transmission over the web.

The file starts by importing the `toFormData` function from `toFormData.js`, which is responsible for converting JavaScript objects into `FormData` objects. This dependency is crucial for handling complex data structures and ensuring they are properly formatted.

The `encode` function is defined to handle the encoding of strings by replacing characters that are not in the unreserved set with their percent-encoded equivalents. This function uses a character map to replace specific characters like `!`, `'`, `(`, `)`, `~`, space (`%20`), and null byte (`%00`) with their corresponding encoded values. The `encodeURIComponent` function is used to perform the initial encoding, and a replacer function is applied to handle the specific characters.

The `AxiosURLSearchParams` constructor function is defined to initialize an instance with an empty `_pairs` array. If `params` are provided, the `toFormData` function is called to convert the parameters into a `FormData` object, appending each key-value pair to the `_pairs` array. The `options` parameter allows for additional configuration to be passed to the `toFormData` function.

The prototype of `AxiosURLSearchParams` is extended with two methods: `append` and `toString`. The `append` method allows for adding new key-value pairs to the `_pairs` array. This method is useful for dynamically building the query string by appending parameters as needed.

The `toString` method is responsible for converting the `_pairs` array into a URL-encoded query string. It accepts an optional `encoder` function, which can be used to customize the encoding process. If no encoder is provided, the default `encode` function is used. The method maps over the `_pairs` array, encoding each key and value, and joins them with an `=` sign. The resulting key-value pairs are then concatenated with an `&` sign to form the final query string.

In summary, `AxiosURLSearchParams.js` provides a robust solution for converting JavaScript objects into URL-encoded query strings. It leverages the `toFormData` function to handle complex data structures and ensures compatibility with various data types. The utility class includes methods for appending parameters and generating the final query string, making it a versatile tool for preparing data for HTTP requests.

[Back to lib/helpers](#libhelpers) | [Back to top](#table-of-contents)

## lib/helpers/toFormData.js

### Converts JavaScript objects to FormData for HTTP requests

The `toFormData.js` file provides a utility function, `toFormData`, designed to convert JavaScript objects into `FormData` objects, which are commonly used in HTTP requests to submit form data. This function is particularly useful for handling complex data structures and ensuring they are correctly formatted for transmission over the web.

The function begins by importing necessary utilities from `lib/utils.js`, a custom error class `AxiosError` from `lib/core/AxiosError.js`, and a `FormData` wrapper from `lib/platform/node/classes/FormData.js`. These dependencies provide essential functionalities such as type checking, error handling, and form data manipulation.

The `isVisitable` function checks if an object or array can be traversed, while `removeBrackets` and `renderKey` help in formatting keys for the `FormData` object. The `isFlatArray` function determines if an array is flat, meaning it does not contain nested objects or arrays.

The main function, `toFormData`, accepts three parameters: `obj` (the object to convert), `formData` (an optional existing `FormData` object to append to), and `options` (an optional configuration object). It first validates that `obj` is an object and initializes `formData` if it is not provided. The options are then processed using `utils.toFlatObject` to ensure they have default values for `metaTokens`, `dots`, and `indexes`.

The function defines a `convertValue` helper to handle different data types, converting dates to ISO strings, and handling `ArrayBuffer` and `TypedArray` objects. It also checks for `Blob` support, throwing an error if blobs are not supported and suggesting the use of buffers instead.

A `defaultVisitor` function is defined to recursively visit each property of the object. It handles special cases such as arrays, file lists, and objects with specific key patterns. The visitor function appends each key-value pair to the `FormData` object, converting values as necessary.

The `build` function is a recursive helper that traverses the object, using the visitor function to process each property. It maintains a stack to detect circular references, preventing infinite loops.

Finally, the `toFormData` function calls `build` with the initial object and returns the populated `FormData` object.

In summary, `toFormData.js` provides a robust solution for converting complex JavaScript objects into `FormData` objects, leveraging utility functions for type checking and object manipulation, and ensuring compatibility with various data types and structures.

[Back to lib/helpers](#libhelpers) | [Back to top](#table-of-contents)

## lib/helpers/toURLEncodedForm.js

### Converts JavaScript objects to URL-encoded form data for HTTP requests

The `lib/helpers/toURLEncodedForm.js` file provides a utility function, `toURLEncodedForm`, designed to convert JavaScript objects into URL-encoded form data, which is commonly used in HTTP requests. This function leverages the `toFormData` utility to handle the conversion process and ensures compatibility with various data types and structures.

The function begins by importing necessary dependencies: `utils` from `lib/utils.js`, `toFormData` from `lib/helpers/toFormData.js`, and `platform` from `lib/platform/index.js`. These dependencies provide essential functionalities such as type checking, object manipulation, and environment-specific configurations.

The `toURLEncodedForm` function accepts two parameters: `data` (the object to convert) and `options` (an optional configuration object). It calls the `toFormData` function, passing the `data`, a new instance of `URLSearchParams` from the `platform` module, and an options object that includes a custom `visitor` function.

The custom `visitor` function is designed to handle specific cases during the conversion process. It checks if the code is running in a Node.js environment using the `platform.isNode` property. If the value being processed is a buffer (determined using `utils.isBuffer`), the function appends the key-value pair to the `URLSearchParams` object, converting the buffer to a base64 string. This ensures that binary data is correctly encoded for URL transmission. If the value is not a buffer, the function delegates to the default visitor provided by `toFormData`.

The `Object.assign` method is used to merge the custom `visitor` function with any additional options passed to `toURLEncodedForm`. This allows for flexible configuration and customization of the conversion process.

In summary, `lib/helpers/toURLEncodedForm.js` provides a robust solution for converting JavaScript objects into URL-encoded form data. It leverages utility functions for type checking and object manipulation, ensuring compatibility with various data types and structures. The custom `visitor` function handles specific cases, such as encoding buffers in Node.js environments, to ensure that the resulting URL-encoded form data is correctly formatted for HTTP requests.

[Back to lib/helpers](#libhelpers) | [Back to top](#table-of-contents)

## lib/helpers/formDataToJSON.js

### Converts FormData to a nested JavaScript object.

This module provides a utility function to convert a FormData object into a nested JavaScript object. The primary function, `formDataToJSON`, takes a FormData instance and returns a structured object representation of its entries. It leverages utility functions from `lib/utils.js` for type checking, object manipulation, and string operations.

The `parsePropPath` function is used to transform a string like `foo[x][y][z]` into an array of keys, such as `['foo', 'x', 'y', 'z']`. This transformation is essential for building the nested structure of the resulting object. It uses the `matchAll` utility function to find all matches of a regular expression in the input string, ensuring accurate parsing of property paths.

The `arrayToObject` function converts an array into an object, preserving the keys and values. This is particularly useful when dealing with nested arrays within the FormData structure.

The core function, `formDataToJSON`, first checks if the input is a valid FormData object with the `isFormData` and `isFunction` utilities. If valid, it initializes an empty object and iterates over each entry in the FormData using `forEachEntry`. For each entry, it calls the `buildPath` function to construct the nested object structure.

The `buildPath` function recursively traverses the property path, creating nested objects or arrays as needed. It handles edge cases like numeric keys and prototype pollution by checking for `__proto__`. If the current key is the last in the path, it assigns the value to the target object. If the key already exists, it converts the existing value into an array to accommodate multiple values.

The function ensures that arrays are converted to objects when necessary, using the `arrayToObject` utility. This conversion is crucial for maintaining a consistent object structure, especially when dealing with complex nested data.

In summary, this module efficiently converts FormData into a nested JavaScript object, making it easier to work with form data in a structured manner. It leverages robust utility functions for type checking, object manipulation, and string operations, ensuring reliable and readable code.

[Back to lib/helpers](#libhelpers) | [Back to top](#table-of-contents)

## lib/helpers/parseHeaders.js

### Parses raw HTTP headers into a structured object, handling duplicates and special cases.

This code defines a function that parses raw HTTP headers into a structured JavaScript object. It uses utility functions from `lib/utils.js` to aid in this process. The primary purpose of this function is to convert a string of raw headers, typically received in HTTP requests or responses, into an easily manipulatable object format.

The function begins by defining a set of headers whose duplicates should be ignored, as specified by the Node.js HTTP documentation. This set includes headers like 'age', 'authorization', 'content-length', 'content-type', and others. The `utils.toObjectSet` function is used to create this set, ensuring efficient lookups.

The main function, exported as the default export, takes a single argument `rawHeaders`, which is a string containing the raw headers. It initializes an empty object `parsed` to store the parsed headers. The function then splits the `rawHeaders` string by newline characters to process each header line individually.

For each line, the function finds the index of the colon character, which separates the header name from its value. It then extracts the header name (`key`) and value (`val`), trimming any excess whitespace and converting the header name to lowercase for consistency.

The function checks if the header name is empty or if it is a duplicate of a header in the `ignoreDuplicateOf` set. If either condition is true, the function skips processing that header.

Special handling is implemented for the 'set-cookie' header. If the 'set-cookie' header appears multiple times, its values are stored in an array. For other headers, if a header appears more than once, its values are concatenated into a single string, separated by commas.

Finally, the function returns the `parsed` object, which contains the structured representation of the headers. This object can then be used for further processing or inspection in the application.

Overall, this code provides a robust solution for parsing raw HTTP headers into a structured format, handling duplicates and special cases effectively. The use of utility functions from `lib/utils.js` ensures that the code is concise and leverages existing functionality for common tasks like creating sets and manipulating strings.

[Back to lib/helpers](#libhelpers) | [Back to top](#table-of-contents)

## lib/helpers/isAbsoluteURL.js

### Determines if a URL is absolute

This module provides a utility function to check if a given URL is absolute. An absolute URL is defined as one that starts with a scheme (like `http://` or `https://`) or is protocol-relative (starting with `//`). The function `isAbsoluteURL` takes a single string parameter, `url`, and returns a boolean value. It uses a regular expression to test whether the URL conforms to the criteria for being absolute. The regular expression checks for a scheme name followed by `://` or simply `//`. This is in accordance with RFC 3986, which specifies that a scheme name must start with a letter and can be followed by letters, digits, plus, period, or hyphen. The function is useful for validating URLs in various web development scenarios, ensuring that links and resources are correctly identified as absolute or relative.

[Back to lib/helpers](#libhelpers) | [Back to top](#table-of-contents)

## lib/helpers/combineURLs.js

### Combines a base URL with a relative URL to form a complete URL.

This function, `combineURLs`, takes two string parameters: `baseURL` and `relativeURL`. It constructs a new URL by appending the `relativeURL` to the `baseURL`. If the `relativeURL` is provided, the function ensures that any trailing slashes from the `baseURL` and leading slashes from the `relativeURL` are removed before concatenation to avoid malformed URLs. If the `relativeURL` is not provided, the function simply returns the `baseURL`. This utility is useful for dynamically generating complete URLs from base and relative paths, ensuring proper formatting and avoiding common pitfalls with URL concatenation. The function does not rely on any external dependencies, making it lightweight and easy to integrate into various projects.

[Back to lib/helpers](#libhelpers) | [Back to top](#table-of-contents)

## lib/helpers/fromDataURI.js

### Converts data URIs to Buffer or Blob objects

The `fromDataURI.js` file provides a function to convert data URIs into either Buffer or Blob objects, depending on the specified options. This function is particularly useful for handling data URIs in various contexts, such as file uploads or data processing in web applications.

The function `fromDataURI` takes four parameters: `uri`, `asBlob`, `options`, and `options.Blob`. The `uri` parameter is the data URI to be converted. The `asBlob` parameter is a boolean that determines whether the output should be a Blob object. The `options` parameter is an optional object that can include a custom Blob constructor.

The function begins by importing necessary dependencies: `AxiosError` from `../core/AxiosError.js`, `parseProtocol` from `./parseProtocol.js`, and `platform` from `../platform/index.js`. The `AxiosError` class is used for error handling, providing detailed error messages and codes. The `parseProtocol` function extracts the protocol from the given URI, and the `platform` module provides environment-specific configurations and utilities.

A regular expression pattern, `DATA_URL_PATTERN`, is defined to match and capture different parts of the data URI, including the MIME type, encoding type (base64 or not), and the actual data.

The function starts by determining the appropriate Blob constructor, either from the `options` parameter or from the `platform` module. It then uses the `parseProtocol` function to extract the protocol from the URI. If the `asBlob` parameter is not explicitly set and a Blob constructor is available, it defaults to `true`.

If the protocol is 'data', the function proceeds to parse the URI using the `DATA_URL_PATTERN` regular expression. If the URI does not match the pattern, an `AxiosError` with the code `ERR_INVALID_URL` is thrown. The matched parts of the URI are then extracted: the MIME type, encoding type, and the actual data.

The data is decoded using `Buffer.from`, converting it from base64 or UTF-8 encoding as appropriate. If the `asBlob` parameter is `true`, the function checks if the Blob constructor is available. If not, it throws an `AxiosError` with the code `ERR_NOT_SUPPORT`. If the Blob constructor is available, a new Blob object is created using the decoded data and the MIME type, and this Blob object is returned.

If the `asBlob` parameter is `false`, the function simply returns the decoded data as a Buffer object.

If the protocol is not 'data', an `AxiosError` with the code `ERR_NOT_SUPPORT` is thrown, indicating that the protocol is unsupported.

[Back to lib/helpers](#libhelpers) | [Back to top](#table-of-contents)

## lib/helpers/parseProtocol.js

### Parses the protocol from a given URL string

This function, `parseProtocol`, extracts the protocol from a given URL string. It uses a regular expression to match the protocol part of the URL, which is typically a sequence of letters, numbers, or certain symbols (like `+` or `-`) followed by `://` or `:`. The function returns the matched protocol if found, or an empty string if no protocol is detected. This utility is useful for determining the scheme of a URL, such as `http`, `https`, `ftp`, etc., which can be critical for handling URLs appropriately in various contexts, such as routing, API requests, or security checks. The function operates in strict mode to ensure better error handling and cleaner code.

[Back to lib/helpers](#libhelpers) | [Back to top](#table-of-contents)

## lib/helpers/AxiosTransformStream.js

### A transform stream for throttling and monitoring data transfer rates in Axios.

The `AxiosTransformStream` class extends Node.js's `stream.Transform` to provide a custom transform stream tailored for Axios, enabling throttling and monitoring of data transfer rates. This class is designed to handle large data transfers efficiently by controlling the rate at which data is processed and providing progress updates.

Upon instantiation, the constructor accepts an `options` object, which is flattened using utility functions from `lib/utils.js`. Default options include parameters like `maxRate`, `chunkSize`, `minChunkSize`, `timeWindow`, `ticksRate`, and `samplesCount`. These options configure the behavior of the stream, such as the maximum data transfer rate and the size of data chunks.

The class uses a symbol `kInternals` to store internal state, including the total length of data, bytes seen, and other metrics necessary for throttling and progress tracking. A `speedometer` function from `lib/helpers/speedometer.js` is used to calculate the data transfer rate over a specified number of samples, providing real-time monitoring of the transfer speed.

The `throttle` function from `lib/helpers/throttle.js` is employed to limit the frequency of progress updates, ensuring that the `progress` event is emitted at controlled intervals. This helps in scenarios where frequent updates could lead to performance issues.

The `_read` method is overridden to handle custom read behavior, while the `_transform` method processes incoming data chunks. The `_transform` method ensures that data is pushed in controlled chunks, respecting the `maxRate` and `chunkSize` options. If the data transfer rate exceeds the specified `maxRate`, the stream will throttle the data flow by delaying the processing of subsequent chunks.

The class also includes a `setLength` method to update the total length of the data being transferred, which is useful for calculating progress.

Overall, `AxiosTransformStream` is a powerful utility for managing data transfer in Axios, providing fine-grained control over the rate of data flow and real-time progress updates, making it ideal for applications requiring efficient and monitored data transfers.

[Back to lib/helpers](#libhelpers) | [Back to top](#table-of-contents)

## lib/helpers/throttle.js

### Throttles function execution to limit the frequency of calls.

This code defines a `throttle` function that acts as a decorator to limit the frequency at which a given function (`fn`) can be executed. It takes two parameters: the function to be throttled and the frequency (`freq`) in times per second. The `throttle` function returns a new function (`throttled`) that ensures `fn` is not called more often than the specified frequency. It uses a timestamp to track the last execution time and a timer to schedule the next allowed execution if a call is attempted too soon. If the `throttled` function is called with `this` set to `true`, it forces immediate execution. This utility is useful for scenarios like rate-limiting API calls or handling frequent user interactions efficiently.

[Back to lib/helpers](#libhelpers) | [Back to top](#table-of-contents)

## lib/helpers/speedometer.js

### Function to calculate data transfer rate

This module provides a function to calculate the maximum data transfer rate over a specified number of samples. The `speedometer` function initializes arrays to store byte counts and timestamps for each sample, along with pointers to manage the circular buffer. The function accepts two optional parameters: `samplesCount` (defaulting to 10) and `min` (defaulting to 1000 milliseconds). When invoked, it returns a `push` function that takes the length of a data chunk as input. The `push` function updates the arrays with the new data and calculates the transfer rate based on the elapsed time and the total bytes transferred. If the minimum time interval has not been reached, it returns undefined. Otherwise, it computes and returns the transfer rate in bytes per second. This utility is useful for monitoring and optimizing data transfer performance in real-time applications.

[Back to lib/helpers](#libhelpers) | [Back to top](#table-of-contents)

## lib/helpers/formDataToStream.js

### Converts FormData to a readable stream for HTTP requests

The `formDataToStream` function in `lib/helpers/formDataToStream.js` is designed to convert a `FormData` instance into a readable stream, which can be used for HTTP requests, particularly for multipart/form-data submissions. This function ensures that the form data is properly encoded and streamed, making it suitable for environments where streaming data is preferred or required.

The function begins by importing necessary modules, including `TextEncoder` from the `util` package, `Readable` from the `stream` package, utility functions from `lib/utils.js`, and the `readBlob` function from `lib/helpers/readBlob.js`. These dependencies provide essential functionalities such as type checking, object manipulation, and reading Blob data asynchronously.

A `FormDataPart` class is defined to handle individual parts of the form data. The constructor of this class takes a name and value, and constructs the appropriate headers for each part. If the value is a string, it is encoded using `TextEncoder`. If the value is a file or Blob, additional headers such as `Content-Type` are added. The class also includes an `encode` method, which is an asynchronous generator that yields the headers, the value (either as a typed array or by reading the Blob), and a CRLF (carriage return and line feed) sequence.

The `formDataToStream` function itself takes three parameters: the `form` (a `FormData` instance), a `headersHandler` function, and an `options` object. It generates a boundary string used to separate different parts of the form data. The function validates the boundary length and throws an error if it is not within the acceptable range.

The function then iterates over the entries of the `FormData` instance, creating `FormDataPart` instances for each entry. It calculates the total content length and constructs the necessary headers, including `Content-Type` and `Content-Length`.

Finally, the function returns a readable stream created from an asynchronous generator function. This generator yields the boundary bytes, encoded form data parts, and the footer bytes, effectively streaming the entire multipart/form-data content.

This approach ensures efficient handling of large form data submissions, leveraging streams to manage memory usage and improve performance.

[Back to lib/helpers](#libhelpers) | [Back to top](#table-of-contents)

## lib/helpers/readBlob.js

### Asynchronous function to read various types of Blob data

The `readBlob` function is an asynchronous generator designed to handle different types of Blob data sources. It supports reading from a Blob object in multiple ways, depending on the available methods of the Blob. If the Blob has a `stream` method, it yields chunks from the stream. If the Blob has an `arrayBuffer` method, it yields the entire ArrayBuffer after awaiting its resolution. If the Blob implements the `asyncIterator` symbol, it yields values from the asynchronous iterator. If none of these methods are available, it yields the Blob object itself. This flexibility allows `readBlob` to be used with a wide range of Blob-like objects, making it a versatile utility for handling binary data in various environments.

[Back to lib/helpers](#libhelpers) | [Back to top](#table-of-contents)

## lib/helpers/ZlibHeaderTransformStream.js

### Stream transformer for adding zlib headers to data chunks

The `ZlibHeaderTransformStream` class extends the `stream.Transform` class to ensure that data chunks passing through it have the appropriate zlib headers. When the first chunk of data is processed, the `_transform` method checks if the chunk already contains zlib headers. If not, it prepends a default zlib header (`0x78 0x9C`) to the data. Subsequent chunks are passed through unmodified using the `__transform` method. This class is useful for scenarios where data streams need to be compressed using zlib, but the headers might be missing or incorrect. By ensuring the presence of the correct headers, it facilitates seamless data compression and decompression processes. The implementation leverages Node.js's `stream` module to handle the transformation efficiently.

[Back to lib/helpers](#libhelpers) | [Back to top](#table-of-contents)

## lib/helpers/callbackify.js

### Converts async functions to callback-style functions

The `lib/helpers/callbackify.js` file provides a utility function named `callbackify` that converts asynchronous functions (async/await) into callback-style functions. This is particularly useful for integrating modern asynchronous code with older codebases or libraries that rely on the callback pattern.

The `callbackify` function takes two arguments: `fn`, the asynchronous function to be converted, and an optional `reducer` function. The `reducer` function is used to transform the result of the asynchronous function before passing it to the callback.

The `callbackify` function first checks if the provided function `fn` is an asynchronous function using the `isAsyncFn` utility from `lib/utils.js`. If `fn` is asynchronous, `callbackify` returns a new function that accepts any number of arguments. The last argument is expected to be a callback function (`cb`).

When the returned function is invoked, it calls the original asynchronous function `fn` with the provided arguments (excluding the callback). Once the asynchronous function resolves, it either directly passes the resolved value to the callback or applies the `reducer` function to the value before passing it to the callback. If the `reducer` function is provided, it allows for custom transformation of the resolved value, potentially spreading multiple values into the callback.

If an error occurs during the execution of the `reducer` function, the error is caught and passed to the callback. If the asynchronous function `fn` rejects, the rejection reason is also passed to the callback.

If `fn` is not an asynchronous function, `callbackify` simply returns `fn` as is, without any modifications.

This utility leverages the type-checking capabilities of `lib/utils.js`, specifically the `isAsyncFn` function, to determine if a function is asynchronous. This ensures that only asynchronous functions are wrapped in the callback-style handler, preserving the original behavior of synchronous functions.

Overall, `callbackify` is a useful tool for bridging the gap between modern asynchronous code and traditional callback-based code, enhancing compatibility and flexibility in codebases that need to support both paradigms.

[Back to lib/helpers](#libhelpers) | [Back to top](#table-of-contents)

## lib/helpers/progressEventReducer.js

### Function to throttle and report progress events for data transfers

This module exports a function that creates a throttled progress event handler for monitoring data transfer rates, either for uploads or downloads. It leverages two dependencies: `speedometer` for calculating data transfer rates and `throttle` for limiting the frequency of event handling.

The function accepts three parameters: a `listener` callback to handle progress data, a boolean `isDownloadStream` to specify the type of data transfer, and an optional `freq` parameter to set the throttling frequency (defaulting to 3 times per second).

Internally, it initializes a `bytesNotified` variable to track the number of bytes processed since the last notification and a `_speedometer` instance configured with 50 samples and a minimum interval of 250 milliseconds.

The main functionality is encapsulated in a throttled function that processes progress events. When invoked, it extracts the `loaded` bytes and optionally the `total` bytes if the length is computable. It calculates the number of bytes transferred since the last notification (`progressBytes`) and uses `_speedometer` to determine the current transfer rate.

The function constructs a `data` object containing various metrics: `loaded`, `total`, `progress` (as a fraction of total), `bytes` (transferred since last notification), `rate` (bytes per second), and `estimated` time remaining (if applicable). It also includes the original event and a boolean `lengthComputable`.

The `data` object is augmented with either a `download` or `upload` property based on the `isDownloadStream` flag. Finally, the `listener` callback is invoked with the `data` object, providing a comprehensive snapshot of the current progress and transfer rate.

This utility is useful for applications requiring real-time monitoring and reporting of data transfer progress, ensuring efficient handling and accurate rate calculations.

[Back to lib/helpers](#libhelpers) | [Back to top](#table-of-contents)

## lib/helpers/resolveConfig.js

### Merges and resolves Axios configuration with enhanced security and compatibility

This code defines a function that merges and resolves an Axios configuration object, enhancing it with additional security and compatibility features. It imports several dependencies, including platform-specific configurations, utility functions, and modules for handling URLs, cookies, and headers.

The function begins by creating a new configuration object (`newConfig`) by merging an empty object with the provided `config` using the `mergeConfig` function. This ensures that the resulting configuration is a combination of the default and provided settings.

Key properties are extracted from `newConfig`, including `data`, `withXSRFToken`, `xsrfHeaderName`, `xsrfCookieName`, `headers`, and `auth`. The `headers` property is then converted into an `AxiosHeaders` instance for consistent header management.

The URL is constructed by combining the base URL and the requested URL using `buildFullPath` and appending query parameters using `buildURL`. This ensures that the final URL is correctly formatted and includes all necessary parameters.

If HTTP basic authentication is specified in the `auth` property, the function sets the `Authorization` header using the `btoa` function to encode the username and password in base64 format.

The function then checks if the `data` property is a FormData object. If it is, and the environment is a standard browser or web worker, it lets the browser set the `Content-Type` header. Otherwise, it ensures that the `Content-Type` header is correctly formatted to avoid issues with React Native's FormData implementation.

For security, the function adds an XSRF (Cross-Site Request Forgery) token to the headers if the environment is a standard browser and the URL shares the same origin as the current location. It reads the XSRF token from cookies using the `cookies.read` function and sets it in the headers if available.

The function returns the enhanced configuration object (`newConfig`), which includes the merged settings, constructed URL, and additional headers for authentication and security.

This approach ensures that the Axios configuration is robust, secure, and compatible with various environments. The use of utility functions and platform-specific configurations enhances maintainability and readability, making it easier to manage and extend the configuration logic.

[Back to lib/helpers](#libhelpers) | [Back to top](#table-of-contents)

## lib/helpers/isURLSameOrigin.js

### Utility to Check if URLs Share the Same Origin

This code provides a utility function to determine if a given URL shares the same origin as the current location. It leverages the capabilities of the browser environment to parse and compare URLs, ensuring that the request URL matches the origin of the current page.

In standard browser environments, where full support for necessary APIs is available, the code defines a function `standardBrowserEnv`. This function uses a hidden anchor element (`<a>`) to parse URLs, taking advantage of the `UrlUtils` interface. It includes a helper function `resolveURL` that normalizes and extracts components of a URL, such as protocol, host, search, hash, hostname, port, and pathname. This normalization is particularly important for Internet Explorer, which requires setting the `href` attribute twice to ensure consistent properties.

The `originURL` is determined by parsing the current window location using `resolveURL`. The main function `isURLSameOrigin` then compares the protocol and host of the request URL against those of the `originURL`. If both match, the function returns `true`, indicating that the URLs share the same origin; otherwise, it returns `false`.

In non-standard browser environments, such as web workers or React Native, where the necessary APIs are not fully supported, the code defines a fallback function `nonStandardBrowserEnv`. This function always returns `true`, effectively bypassing the origin check. This approach ensures compatibility across different environments while maintaining the primary functionality in standard browsers.

The code imports utility functions from `lib/utils.js` and platform-specific configurations from `lib/platform/index.js`. The `utils` module provides type-checking functions like `isString`, which is used to verify if the request URL is a string before parsing. The `platform` module helps detect the runtime environment, distinguishing between standard and non-standard browser environments.

By combining these modules, the code achieves a robust and environment-aware solution for checking URL origins. This utility is particularly useful for security purposes, such as preventing cross-origin requests in web applications. The modular design and clear separation of concerns make the code maintainable and adaptable to various runtime contexts.

[Back to lib/helpers](#libhelpers) | [Back to top](#table-of-contents)

## lib/helpers/cookies.js

### Cookie management for browser and non-browser environments

This code provides a utility for managing cookies, with distinct behaviors for standard browser environments and non-standard environments like web workers or React Native. It leverages utility functions from `lib/utils.js` and environment detection from `lib/platform/index.js` to ensure compatibility and functionality across different runtime contexts.

In standard browser environments, the utility offers three main methods: `write`, `read`, and `remove`. The `write` method sets a cookie with specified attributes such as name, value, expiration date, path, domain, and secure flag. It uses utility functions like `isNumber` and `isString` from `lib/utils.js` to validate the types of the provided attributes. The cookie string is constructed by encoding the value and concatenating the attributes, then assigned to `document.cookie`.

The `read` method retrieves the value of a specified cookie by matching its name in `document.cookie`. It uses a regular expression to find the cookie and decodes its value before returning it. If the cookie is not found, it returns `null`.

The `remove` method deletes a specified cookie by setting its expiration date to a past date, effectively invalidating it. This is done by calling the `write` method with an expiration date of one day in the past.

In non-standard browser environments, where `document.cookie` is not supported, the utility provides no-op implementations of the `write`, `read`, and `remove` methods. These methods do nothing or return `null`, ensuring that the code does not break in environments like web workers or React Native.

The code uses the `platform.hasStandardBrowserEnv` check from `lib/platform/index.js` to determine the runtime environment. If the environment is a standard browser, it exports the full-featured cookie management object. Otherwise, it exports the no-op version.

This approach ensures that the application can handle cookies appropriately in various environments without causing errors or unexpected behavior. The use of utility functions from `lib/utils.js` enhances the reliability and readability of the code by providing robust type-checking and string manipulation capabilities.

Overall, this cookie management utility is a versatile and environment-aware solution for handling cookies in both standard and non-standard browser contexts, ensuring consistent behavior and compatibility across different runtime environments.

[Back to lib/helpers](#libhelpers) | [Back to top](#table-of-contents)

## lib/helpers/composeSignals.js

### Utility function to compose multiple abort signals with optional timeout handling

The `composeSignals.js` file defines a utility function `composeSignals` that combines multiple abort signals into a single signal, with optional timeout handling. This function is particularly useful in scenarios where multiple asynchronous operations need to be managed and potentially canceled as a group.

The function takes two parameters: `signals`, an array of abort signals, and `timeout`, an optional timeout duration in milliseconds. It returns a tuple containing a composed abort signal and a cleanup function.

The core of the function is an `AbortController` instance, which is used to create a new abort signal. This signal will be triggered if any of the provided signals are aborted or if the optional timeout is exceeded.

A variable `aborted` is used to ensure that the abort logic is executed only once. The `onabort` function handles the abort event. If an abort event occurs, it sets the `aborted` flag to `true`, unsubscribes from all signals, and aborts the controller with an appropriate error. If the abort event is triggered by an error, it checks whether the error is an instance of `AxiosError`. If not, it creates a new `CanceledError` with the error message.

The optional timeout is managed using `setTimeout`. If the timeout is specified and exceeded, the `onabort` function is called with a new `AxiosError` indicating a timeout error.

The `unsubscribe` function is responsible for cleaning up event listeners and clearing the timeout. It iterates over the provided signals and removes the `abort` event listeners. If a signal has a `removeEventListener` method, it uses that; otherwise, it assumes the signal has an `unsubscribe` method. The timeout is cleared, and the `signals` array is set to `null` to prevent further operations.

The function then sets up the initial event listeners for each signal in the `signals` array. If a signal has an `addEventListener` method, it attaches the `onabort` function to the `abort` event.

Finally, the function returns a tuple. The first element is the composed abort signal from the `AbortController`. The second element is a cleanup function that clears the timeout and sets the timer to `null`.

In summary, `composeSignals` provides a robust mechanism for managing multiple abort signals and handling timeouts. It ensures that all signals are properly cleaned up and that the abort logic is executed only once, even if multiple signals are aborted or the timeout is exceeded. This utility is particularly useful in complex asynchronous operations where coordinated cancellation is required.

[Back to lib/helpers](#libhelpers) | [Back to top](#table-of-contents)

## lib/helpers/trackStream.js

### Utility for streaming and tracking byte chunks

This module provides functions to handle and track byte streams efficiently. The `streamChunk` function generates chunks of a specified size from a given byte array. The `readBytes` function processes an iterable of byte chunks, encoding them if necessary, and yields them in specified chunk sizes. The primary function, `trackStream`, creates a `ReadableStream` from an input stream, allowing for real-time tracking of byte progress. It takes parameters for chunk size, progress tracking, and completion callbacks, as well as an optional encoding function. The stream's `pull` method reads and enqueues byte chunks, updating progress via the `onProgress` callback. When the stream ends or is canceled, the `onFinish` callback is invoked. This setup is useful for applications requiring precise control and monitoring of data streaming, such as file uploads or network data processing.

[Back to lib/helpers](#libhelpers) | [Back to top](#table-of-contents)

## lib/helpers/validator.js

### Utility for validating options and handling transitional configurations in Axios

The `lib/helpers/validator.js` file provides utility functions for validating options and handling transitional configurations in the Axios HTTP client library. It imports the application version from `lib/env/data.js` and a custom error class, `AxiosError`, from `lib/core/AxiosError.js`.

The file defines a set of type validators for common JavaScript types such as `object`, `boolean`, `number`, `function`, `string`, and `symbol`. These validators are stored in an object named `validators` and are used to check if a given value matches the expected type. If the value does not match, the validator returns a descriptive error message.

A key feature of this file is the `transitional` validator, which helps manage options that are being deprecated or have been removed. The `transitional` function takes a validator, a version string, and an optional message. It returns a function that validates the value of an option and issues warnings or throws errors if the option is deprecated or removed. The warnings are logged to the console, and errors are thrown using the `AxiosError` class, providing detailed context about the deprecation or removal.

The `assertOptions` function is another crucial component. It validates an object's properties against a given schema. The function takes three parameters: `options` (the object to validate), `schema` (an object defining the expected types of the properties), and `allowUnknown` (a boolean indicating whether unknown properties are allowed). If `options` is not an object, or if any property does not match its expected type, an `AxiosError` is thrown. If `allowUnknown` is false, any unknown properties will also trigger an error.

The `validators` object and the `assertOptions` function are exported as the default export of the module, making them available for use in other parts of the Axios library. This setup ensures that options passed to Axios functions are correctly validated, helping to prevent runtime errors and maintain consistency across the codebase.

In summary, `lib/helpers/validator.js` enhances the robustness of the Axios library by providing a structured way to validate options and manage transitional configurations. It leverages the application version and custom error handling to offer detailed and context-specific validation, contributing to a more reliable and maintainable codebase.

[Back to lib/helpers](#libhelpers) | [Back to top](#table-of-contents)

## lib/helpers/spread.js

### Utility function for spreading array elements as function arguments

This module provides a utility function named `spread` that simplifies invoking a function with an array of arguments. The primary purpose of `spread` is to offer syntactic sugar for the common use case of using `Function.prototype.apply`. Instead of manually applying an array of arguments to a function, `spread` allows you to wrap the function and directly pass the array. This enhances code readability and reduces boilerplate. The `spread` function takes a callback function as its parameter and returns a new function that, when invoked with an array, calls the original callback with the array elements spread out as individual arguments. This utility is particularly useful in scenarios where you need to dynamically apply an array of arguments to a function in a concise manner.

[Back to lib/helpers](#libhelpers) | [Back to top](#table-of-contents)

## lib/helpers/isAxiosError.js

### Function to check if an error is from Axios

The `isAxiosError.js` file provides a utility function to determine if a given payload is an error thrown by Axios, a popular HTTP client for JavaScript. This function is essential for error handling in applications that use Axios for making HTTP requests, allowing developers to distinguish between Axios-specific errors and other types of errors.

The function `isAxiosError` is defined to take a single argument, `payload`, which can be of any type. It utilizes a utility function `isObject` from the `lib/utils.js` file to check if the payload is an object. The `isObject` function is part of a comprehensive set of utility functions provided by `lib/utils.js`, which includes various type-checking utilities to enhance code reliability and readability.

Once it is confirmed that the payload is an object, the function further checks if the object has a property `isAxiosError` set to `true`. This property is a convention used by Axios to mark errors that originate from its operations. If both conditions are met, the function returns `true`, indicating that the payload is indeed an error thrown by Axios. Otherwise, it returns `false`.

This utility function is particularly useful in scenarios where you need to implement custom error handling logic based on the source of the error. For instance, you might want to display different error messages to the user or perform different recovery actions depending on whether the error was caused by an Axios request or some other part of your application.

By leveraging the type-checking capabilities of `lib/utils.js`, the `isAxiosError` function ensures that the payload is correctly identified as an Axios error, thereby improving the robustness and maintainability of your error handling code. This small but crucial utility function helps in writing cleaner and more efficient error handling logic, making it easier to manage and debug issues in applications that rely on Axios for HTTP requests.

[Back to lib/helpers](#libhelpers) | [Back to top](#table-of-contents)

## lib/helpers/HttpStatusCode.js

### Enumeration of HTTP status codes and their descriptions

This file defines an enumeration of HTTP status codes, mapping each status code to its corresponding descriptive name. The `HttpStatusCode` object includes standard HTTP status codes ranging from informational responses (100-199), successful responses (200-299), redirection messages (300-399), client error responses (400-499), and server error responses (500-599). Each status code is paired with a descriptive key, such as `Ok` for 200 and `NotFound` for 404. Additionally, the code dynamically creates reverse mappings, allowing for both key-to-value and value-to-key lookups. This dual mapping is achieved by iterating over the entries of the `HttpStatusCode` object and assigning each value as a key with its corresponding descriptive name as the value. The module is then exported for use in other parts of the application, facilitating easy reference to HTTP status codes and their meanings.

[Back to lib/helpers](#libhelpers) | [Back to top](#table-of-contents)

# lib/platform

## Section Contents

- [lib/platform/index.js](#libplatformindexjs)

[Back to top](#table-of-contents)

## lib/platform/index.js

### Combines Node.js environment configuration and utility functions for runtime environment detection.

This file serves as a central point for combining Node.js-specific configurations and utility functions that detect the runtime environment. It imports the Node.js environment configuration from `./node/index.js` and utility functions from `./common/utils.js`, then merges and exports them as a single object. This approach promotes modularity and simplifies the codebase by providing a unified interface for accessing both environment-specific settings and utility functions.

The Node.js environment configuration includes classes like `URLSearchParams` and `FormData`, which are essential for handling URL query parameters and form data, respectively. These classes are re-exported from the built-in `url` module and the 'form-data' library. Additionally, the configuration object includes a boolean property `isNode` set to `true`, explicitly indicating that the environment is Node.js. This can be useful for environment-specific logic in the broader application. The `protocols` property lists supported URL protocols (`http`, `https`, `file`, and `data`), which can be used to validate or handle different types of URLs within the application.

The utility functions from `./common/utils.js` are designed to determine the current runtime environment, specifically focusing on browser and web worker contexts. The `hasBrowserEnv` constant checks if the code is running in a browser by verifying the presence of `window` and `document` objects. The `hasStandardBrowserEnv` function further refines this check to exclude non-standard environments like React Native and NativeScript. The `hasStandardBrowserWebWorkerEnv` function identifies if the code is running within a web worker by checking for `WorkerGlobalScope` and related properties. Additionally, the `origin` constant provides the current URL if in a browser environment, defaulting to 'http://localhost' otherwise.

By merging these configurations and utilities into a single export, the file enhances maintainability and readability. Other parts of the application can import this unified object to access the necessary classes, environment-specific settings, and utility functions, rather than importing each component individually. This centralized approach ensures that the Node.js-specific configurations and utilities are managed in one place, making the codebase easier to understand and maintain.

[Back to lib/platform](#libplatform) | [Back to top](#table-of-contents)

# lib/platform/common

## Section Contents

- [lib/platform/common/utils.js](#libplatformcommonutilsjs)

[Back to top](#table-of-contents)

## lib/platform/common/utils.js

### Utility functions to detect browser and web worker environments

This module provides utility functions to determine the current runtime environment, specifically focusing on browser and web worker contexts. The `hasBrowserEnv` constant checks if the code is running in a browser by verifying the presence of `window` and `document` objects. The `hasStandardBrowserEnv` function further refines this check to exclude non-standard environments like React Native and NativeScript. The `hasStandardBrowserWebWorkerEnv` function identifies if the code is running within a web worker by checking for `WorkerGlobalScope` and related properties. Additionally, the `origin` constant provides the current URL if in a browser environment, defaulting to 'http://localhost' otherwise. These utilities are essential for ensuring compatibility and correct behavior across different JavaScript environments, particularly for libraries like axios that may operate in varied contexts.

[Back to lib/platform/common](#libplatformcommon) | [Back to top](#table-of-contents)

# lib/platform/node

## Section Contents

- [lib/platform/node/index.js](#libplatformnodeindexjs)

[Back to top](#table-of-contents)

## lib/platform/node/index.js

### Node.js environment configuration with URLSearchParams and FormData classes

This file configures and exports an object tailored for a Node.js environment. It imports and re-exports the `URLSearchParams` class from the built-in `url` module and the `FormData` class from the 'form-data' library. These classes are included in the `classes` property of the exported object, making them easily accessible for handling URL query parameters and form data, respectively. Additionally, the `Blob` class is conditionally included if it is defined in the environment, otherwise, it defaults to `null`.

The exported object also includes a boolean property `isNode` set to `true`, explicitly indicating that the environment is Node.js. This can be useful for environment-specific logic in the broader application. Furthermore, the `protocols` property lists supported URL protocols (`http`, `https`, `file`, and `data`), which can be used to validate or handle different types of URLs within the application.

By centralizing the import and export of these classes, the file promotes modularity and simplifies the codebase. Other parts of the application can import this single configuration object to access the necessary classes and environment-specific settings, rather than importing each class individually. This approach enhances maintainability and readability, ensuring that the Node.js-specific configurations and utilities are managed in one place.

[Back to lib/platform/node](#libplatformnode) | [Back to top](#table-of-contents)

# lib/platform/node/classes

## Section Contents

- [lib/platform/node/classes/FormData.js](#libplatformnodeclassesformdatajs)
- [lib/platform/node/classes/URLSearchParams.js](#libplatformnodeclassesurlsearchparamsjs)

[Back to top](#table-of-contents)

## lib/platform/node/classes/FormData.js

### A simple wrapper for the 'form-data' library

This file provides a straightforward wrapper around the 'form-data' library by importing it and then exporting it as the default export. The 'form-data' library is used to create and manipulate form data, typically for HTTP requests. By re-exporting the library, this file allows other parts of the codebase to import and use 'form-data' without directly referencing the third-party library. This can help in managing dependencies and maintaining a clean code structure. There are no additional dependencies or modifications applied to the 'form-data' library in this file.

[Back to lib/platform/node/classes](#libplatformnodeclasses) | [Back to top](#table-of-contents)

## lib/platform/node/classes/URLSearchParams.js

### URLSearchParams class re-export for Node.js

This file re-exports the `URLSearchParams` class from Node.js's built-in `url` module. The `URLSearchParams` class provides utility methods to work with the query string of a URL. By importing and re-exporting this class, the file ensures that other parts of the application can easily access and manipulate URL query parameters without directly importing from the `url` module each time. This approach promotes modularity and simplifies the codebase by centralizing the import statement. The `URLSearchParams` class itself allows for parsing, iterating, and modifying query strings, making it a powerful tool for handling URL parameters in a Node.js environment.

[Back to lib/platform/node/classes](#libplatformnodeclasses) | [Back to top](#table-of-contents)

