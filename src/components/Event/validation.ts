import * as Joi from 'joi';
import Validation from '../validation';
import { IEventModel } from './model';

/**
* @export
* @class EventValidation
* @extends Validation
*/
class EventValidation extends Validation {

  /**
  * Creates an instance of EventValidation.
  * @memberof EventValidation
  */
  constructor() {
    super();
  }

  /**
  * @param {IEventModel} params
  * @returns {Joi.ValidationResult<IEventModel>}
  * @memberof EventValidation
  */
  createOrUpdateEvent(params: IEventModel): Joi.ValidationResult<IEventModel> {
    const schema: Joi.Schema = Joi.object().keys({
      id: Joi.string(),
      title: Joi.string().required(),
      startDate: Joi.date().timestamp('unix').required(),
      endDate: Joi.date().timestamp('unix').required(),
      reminders: Joi.array().items(Joi.number()),
      usersEmails: Joi.array().items(Joi.string()).min(1).required(),
      color: Joi.string(),
      category: Joi.string().allow('')
    });

    return Joi.validate(params, schema);
  }

  /**
  * @param {{ id: string }} body
  * @returns {Joi.ValidationResult<{ id: string }>}
  * @memberof EventValidation
  */
  getEvent(body: { id: string }): Joi.ValidationResult <{ id: string }> {
    const schema: Joi.Schema = Joi.object().keys({
      id: this.customJoi.objectId().required()
    });

    return Joi.validate(body, schema);
  }

  /**
  * @param {{ id: string }} body
  * @returns {Joi.ValidationResult<{ id: string }>}
  * @memberof EventValidation
  */
  removeEvent(body: { id: string }): Joi.ValidationResult<{ id: string }> {
    const schema: Joi.Schema = Joi.object().keys({
      id: this.customJoi.objectId().required()
    });

    return Joi.validate(body, schema);
  }
}

export default new EventValidation();
