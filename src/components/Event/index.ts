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
  try {
    const events: IEventModel[] = await EventService.findAll();

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
export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const event: IEventModel = await EventService.remove(req.params.id);

    res.status(200).json(event);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}
