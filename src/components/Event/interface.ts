import { IEventModel } from './model';

/**
* @export
* @interface IEventService
*/
export interface IEventService {

  /**
  * @param {string} minDate
  * @param {string} maxDate
  * @returns {Promise<IEventModel[]>}
  * @memberof IEventService
  */
  findAll(minDate: string, maxDate: string): Promise<IEventModel[]>;

  /**
  * @param {string} code
  * @returns {Promise<IEventModel>}
  * @memberof IEventService
  */
  findOne(code: string): Promise<IEventModel>;

  /**
  * @param {IEventModel} IEventModel
  * @returns {Promise<IEventModel>}
  * @memberof IEventService
  */
  insert(IEventModel: IEventModel): Promise<IEventModel>;

  /**
  * @param {string} id
  * @param {IEventModel} IEventModel
  * @returns {Promise<IEventModel>}
  * @memberof IEventService
  */
  update(id: string, IEventModel: IEventModel): Promise<IEventModel>;

  /**
  * @param {string} id
  * @returns {Promise<IEventModel>}
  * @memberof IEventService
  */
  remove(id: string): Promise<IEventModel>;
}
