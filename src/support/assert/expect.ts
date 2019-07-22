import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as cahiString from 'chai-string';
import chaiSmoothie = require('chai-smoothie');

chai.use(chaiAsPromised);
chai.use(chaiSmoothie);
chai.use(cahiString);

export const expect = chai.expect;
