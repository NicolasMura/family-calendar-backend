import * as Joi from 'joi';
import EventModel, { IEventModel } from './model';
import EventValidation from './validation';
import { IEventService } from './interface';
import { Types } from 'mongoose';

/**
* @export
* @implements {IEventModelService}
*/
const EventService: IEventService = {
  /**
  * @returns {Promise<IEventModel[]>}
  * @memberof EventService
  */
  async findAll(minDate: string, maxDate: string): Promise<IEventModel[]> {
    try {
      const filter: any = {};
      if (minDate || maxDate) {
        filter.startDate = {};
        if (minDate) {
          filter.startDate.$gte = minDate;
        }
        if (maxDate) {
          filter.startDate.$lte = maxDate;
        }
      }

      return await EventModel.find(filter);
    } catch (error) {
      throw new Error(error.message);
    }
  },

  /**
  * @param {string} id
  * @returns {Promise<IEventModel>}
  * @memberof EventService
  */
  async findOne(id: string): Promise<IEventModel> {
    try {
      const validate: Joi.ValidationResult<{ id: string }> = EventValidation.getEvent({
        id
      });

      if (validate.error) {
        throw new Error(validate.error.message);
      }

      return await EventModel.findOne({
        _id: Types.ObjectId(id)
      });
    } catch (error) {
      throw new Error(error.message);
    }
  },

  /**
  * @param {IEventModel} event
  * @returns {Promise<IEventModel>}
  * @memberof EventService
  */
  async insert(body: IEventModel): Promise<IEventModel> {
    try {
      const validate: Joi.ValidationResult<IEventModel> = EventValidation.createOrUpdateEvent(body);

      if (validate.error) {
        throw new Error(validate.error.message);
      }

      const event: IEventModel = await EventModel.create(body);

      return event;
    } catch (error) {
      throw new Error(error.message);
    }
  },

    /**
    * @param {string} id
    * @param {IEventModel} event
    * @returns {Promise<IEventModel>}
    * @memberof EventService
    */
  async update(id: string, body: IEventModel): Promise<IEventModel> {
    try {
      const validate: Joi.ValidationResult<IEventModel> = EventValidation.createOrUpdateEvent(body);

      if (validate.error) {
        throw new Error(validate.error.message);
      }

      // const event: IEventModel = await EventModel.replaceOne({ _id: doc._id }, body);
      const updateResponse: IEventModel = await EventModel.updateOne({ _id: id }, body, {
        new: true
      });

      const event: IEventModel = await EventModel.findOne({
        _id: id
      });
      // console.log('updated event : ', event);

      return event;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  /**
  * @param {string} id
  * @returns {Promise<IEventModel>}
  * @memberof EventService
  */
  async remove(id: string): Promise<IEventModel> {
    try {
      const validate: Joi.ValidationResult<{ id: string }> = EventValidation.removeEvent({
        id
      });

      if (validate.error) {
        throw new Error(validate.error.message);
      }

      const event: IEventModel = await EventModel.findOne({
        _id: Types.ObjectId(id)
      });
      // console.log('try to remove event : ', event);

      // const event: IEventModel = await EventModel.findOneAndRemove({
      //   _id: Types.ObjectId(id),
      //   // useFindAndModify: false
      // });
      await EventModel.deleteOne({
        _id: Types.ObjectId(id)
      });
      // console.log('event removed successfully!');

      return event;
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

export default EventService;
