Feature: Create device

    Clients should be allowed to send a request to the /device API in order to Create a device.
    The API should validate the structure of the payload and responde with an error if it is invalid.

    Scenario: Empty payload


        If the client sends a POST request to /device with a unsupported payload, it should receive a response with a 4xx status code.
        When the client creates a POST request to /device
        And attaches a generic empty payload
        And sends the request
        Then our API should respond with a 400 HTTP status code
        And the payload of the response should be a JSON object
        And contains a message property which says "Payload should not be empty"