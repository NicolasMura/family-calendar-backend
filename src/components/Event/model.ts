import * as bcrypt from 'bcrypt';
import * as connections from '../../config/connection/connection';
import * as crypto from 'crypto';
import { Document, Schema } from 'mongoose';
import { NextFunction } from 'express';

/**
* @export
* @interface IEventModel
* @extends {Document}
*/
export interface IEventModel extends Document {
  title: string;
  startDate: string;
  endtDate: string;
  usersIds: string[];
}

/**
* @swagger
* components:
*  schemas:
*    EventSchema:
*      required:
*        - title
*        - startDate
*        - endDate
*        - usersIds
*      properties:
*        title:
*          type: string
*        startDate:
*          type: string
*        endDate:
*          type: string
*        usersIds:
*          type: array
*    Events:
*      type: array
*      items:
*        $ref: '#/components/schemas/EventSchema'
*/
const EventSchema: Schema = new Schema({
  title: {
    type: String,
    unique: false,
    trim: true
  },
  startDate: String,
  endDate: String,
  usersIds: Array
}, {
  collection: 'eventmodel',
  versionKey: false
});

export default connections.db.model < IEventModel > ('EventModel', EventSchema);
