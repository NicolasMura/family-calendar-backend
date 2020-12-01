import EventService from './service';
import HttpError from '../../config/error/index';
import { IEventModel } from './model';
import { NextFunction, Request, Response } from 'express';

/**
* @export
* @param {Request} req
* @param {Response} res
* @param {NextFunction} next
* @returns {Promise<void>}
*/
export async function findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
  // Access the possibly provided 'minDate' and 'maxDate' query parameters
  const minDate: any = req.query.minDate;
  const maxDate: any = req.query.maxDate;

  try {
    const events: IEventModel[] = await EventService.findAll(minDate, maxDate);

    res.status(200).json(events);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

/**
* @export
* @param {Request} req
* @param {Response} res
* @param {NextFunction} next
* @returns {Promise<void>}
*/
export async function findOne(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const event: IEventModel = await EventService.findOne(req.params.id);

    res.status(200).json(event);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

/**
* @export
* @param {Request} req
* @param {Response} res
* @param {NextFunction} next
* @returns {Promise<void>}
*/
export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const event: IEventModel = await EventService.insert(req.body);

    res.status(201).json(event);
  } catch (error) {
    if (error.code === 500) {
      return next(new HttpError(error.message.status, error.message));
    }
    res.json({
      status: 400,
      message: error.message
    });
  }
}

/**
* @export
* @param {Request} req
* @param {Response} res
* @param {NextFunction} next
* @returns {Promise<void>}
*/
export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const event: IEventModel = await EventService.update(req.params.id, req.body);

    res.status(200).json(event);
  } catch (error) {
    if (error.code === 500) {
      return next(new HttpError(error.message.status, error.message));
    }
    res.json({
      status: 400,
      message: error.message
    });
  }
}

/**
* @export
* @param {Request} req
* @param {Response} res
* @param {NextFunction} next
* @returns {Promise<void>}
*/
export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const event: IEventModel = await EventService.remove(req.params.id);

    res.status(200).json(event);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}
