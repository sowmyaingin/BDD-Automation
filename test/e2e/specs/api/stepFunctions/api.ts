import { HttpClient, ResponsePromise } from 'src/services';
import { expect } from 'src/support/assert/expect';
import { apiProps } from 'config/api/api.config';

let http: HttpClient;
let userGetResponse: ResponsePromise;

class APIMethods {
  async initializeAPI() {
    http = new HttpClient(apiProps.endPoint);
  }

  async getPostById(id: number) {
    userGetResponse = http.get('posts/' + id);
    let actualStatusCode: number;
    await userGetResponse.then(jsonString => {
      actualStatusCode = jsonString.statusCode;
    });
    return String(actualStatusCode);
  }

  async testResponse(actualStatusCode: string, expectedStatusCode: string) {
    await expect(actualStatusCode, '<--Chek api response code-->').to.be.equal(expectedStatusCode);
  }
}

export let apiMethods = new APIMethods();
