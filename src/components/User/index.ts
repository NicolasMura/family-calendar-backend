import UserService from './service';
import { HttpError } from '../../config/error/index';
import { IUserModel } from './model';
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
    const users: IUserModel[] = await UserService.findAll();

    res.status(200).json(users);
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
    const user: IUserModel = await UserService.findOne(req.params.id);

    res.status(200).json(user);
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
    const user: IUserModel = await UserService.insert(req.body);

    res.status(201).json(user);
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
    const user: IUserModel = await UserService.remove(req.params.id);

    res.status(200).json(user);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}
