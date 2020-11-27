import * as Joi from 'joi';
import Validation from '../validation';
import { IUserModel } from '../User/model';

/**
* @export
* @class AuthValidation
* @extends Validation
*/
class AuthValidation extends Validation {

  /**
  * Creates an instance of AuthValidation.
  * @memberof AuthValidation
  */
  constructor() {
    super();
  }
  /**
  * @param {IUserModel} params
  * @returns {Joi.ValidationResult<IUserModel >}
  * @memberof UserValidation
  */
  createUser(params: IUserModel): Joi.ValidationResult<IUserModel> {
    const userProfile: Joi.Schema = Joi.object().keys({
      isChild: Joi.boolean().required(),
      name: Joi.string().required(),
      gender: Joi.string(),
      location: Joi.string(),
      picture: Joi.string()
    }).required();

    const schema: Joi.Schema = Joi.object().keys({
      mobile: Joi.string(),
      password: Joi.string().required(),
      email: Joi.string().email({
        minDomainAtoms: 2
      }).required(),
      profile: userProfile
    });

    return Joi.validate(params, schema);
    // return Joi.validate(params, schema, { allowUnknown: true });
  }
  /**
  * @param {IUserModel} params
  * @returns {Joi.ValidationResult<IUserModel >}
  * @memberof UserValidation
  */
  getUser(params: IUserModel): Joi.ValidationResult<IUserModel> {
    const schema: Joi.Schema = Joi.object().keys({
      password: Joi.string().required(),
      email: Joi.string().email({
        minDomainAtoms: 2
      }).required()
    });

    return Joi.validate(params, schema);
  }
}

export default new AuthValidation();
