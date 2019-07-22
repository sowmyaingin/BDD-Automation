import { promise } from 'protractor';
import Promise = promise.Promise;

export class JsonPromise {
  private wrappedPromise: Promise<any>;

  constructor(_promise: Promise<any>) {
    this.wrappedPromise = _promise;
  }

  get(prop: string | number): JsonPromise {
    return new JsonPromise(this.wrappedPromise.then(obj => obj[prop]));
  }

  /**
   *
   * utility method to fetch value from nested json object.
   *
   * Example:
   *
   *  let obj = {
   *      user : {
   *          "name" : "sudharsan",
   *         "email" : "sudharsanselvaraj.c@gmail.com"
   *      }
   *  };
   *
   * let prop = "user.name"
   *
   *  OUTPUT: "sudharsan"
   *
   * @param prop
   * @returns {JsonPromise}
   */
  deepGet(prop: string): JsonPromise {
    return new JsonPromise(
      this.wrappedPromise.then(obj => {
        return prop.split('.').reduce((accumulator, currProp) => {
          return accumulator[currProp];
        }, obj);
      })
    );
  }

  /**
   * utility method to get array of values corresponding to a specific key from response array.
   *
   * Example:
   *
   * let userList = [
   *            {
   *              name : "sudharsan",
   *              email : "sudharsanselvaraj.c@gmail.com"
   *            },
   *            {
   *              name : "protracctor",
   *              email : "protractor@gmail.com"
   *            }
   *  ];
   *
   * let key = "name";
   *
   *  OUTPUT: ["sudharsan","protractor"]
   *
   * @param key
   * @returns {JsonPromise}
   */

  pluckFromArrayOfObject(key: string): JsonPromise {
    return new JsonPromise(this.wrappedPromise.then((arr: any) => arr.map((a: any): any => a[key])));
  }

  /**
   * utility method to sort any array from response body.
   */
  getSortedArray(): JsonPromise {
    return new JsonPromise(this.wrappedPromise.then((arr: any[]): any[] => arr.sort()));
  }

  /**
   * utility method to get length of an array from response body.
   */
  getArrayCount(): Promise<number> {
    return this.wrappedPromise.then((arr: any[]): number => arr.length);
  }

  /**
   * utility method to filter an array from response body.
   */
  filterArray(callback: (val: any, index?: number, _arr?: any[], args?: any) => boolean): JsonPromise {
    return new JsonPromise(this.wrappedPromise.then((arr: any): any[] => arr.filter(callback)));
  }

  then(onFulfilled: promise.IFulfilledCallback<any>, onRejected?: promise.IRejectedCallback): Promise<any> {
    return this.wrappedPromise.then(onFulfilled, onRejected);
  }

  catch(callback: promise.IFulfilledCallback<any>): Promise<any> {
    return this.wrappedPromise.catch(callback);
  }
}
