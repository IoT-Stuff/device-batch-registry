import { binding, when, then } from 'cucumber-tsflow';

@binding()
export class DeviceSteps {

    @when(/the client creates a POST request to \/device/)
    public whenClientSendsPostToEndpoint() {

    }

    @when(/attaches a generic empty payload/)
    public whenClientAttachesGenericEmptyPayload() {

    }

    @when(/sends the request/)
    public whenClientSendsRequest() {

    }

    @then(/The bank account balance should be \$(\d*)/)
    public accountBalanceShouldEqual(expectedAmount: number) {

    }

    @then(/our API should respond with a 400 HTTP status code/)
    public thenAPIShouldRespondWith4XXHTTPStatusCode() {

    }

    @then(/the payload of the response should be a JSON object/)
    public thenResponsePayloadShouldBeJSONobject() {

    }

    @then(/contains a message property which says "([^"]*)"/)
    public thenPayloadMessageShouldBe(message: string) {
    }
}
