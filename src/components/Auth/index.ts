import AuthService from './service';
import HttpError from '../../config/error/index';
import { IUserModel } from '../User/model';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import app from '../../config/server/server';

/**
* @export
* @param {Request} req
* @param {Response} res
* @param {NextFunction} next
* @returns {Promise<void>}
*/
export async function signup(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const user: IUserModel = await AuthService.createUser(req.body);

    const payload: Partial<IUserModel> = {
      _id: user._id,
      mobile: user.mobile,
      email: user.email,
      profile: user.profile
    };
    const token: string = jwt.sign(payload, app.get('secret'), {
      // expiresIn: '60m'
    });

    res.json({
      token,
      status: 200,
      logged: true,
      message: 'Sign in successfull'
    });
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
export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const user: IUserModel = await AuthService.getUser(req.body);

    const payload: Partial<IUserModel> = {
      _id: user._id,
      mobile: user.mobile,
      email: user.email,
      profile: user.profile
    };
    const token: string = jwt.sign(payload, app.get('secret'), {
      // expiresIn: '60m'
    });

    res.json({
      token,
      status: 200,
      logged: true,
      message: 'Sign in successfull'
    });

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
