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
  reminders: number[];
  usersIds: string[];
}

/**
* @swagger
* components:
*  schemas:
*    EventSchema:
*      properties:
*        title:
*          type: string
*        startDate:
*          type: string
*        endDate:
*          type: string
*        reminders:
*          type: array
*        usersIds:
*          type: array
*      required:
*        - title
*        - startDate
*        - usersIds
*      examples:
*        title: "Echographie n°3 !"
*        startDate: "1605285140"
*        usersIds: ["5fbec6aea71e9a5d16e11037"]
*    Events:
*      type: array
*      items:
*        $ref: '#/components/schemas/EventSchema'
*/
const EventSchema: Schema = new Schema({
  title: {
    type: String,
    trim: true
  },
  startDate: String,
  endDate:  {
    type: String,
    default: ''
  },
  reminders: {
    type: Array,
    default: []
    // default: ['']
  },
  usersIds: Array
}, {
  collection: 'eventmodel',
  versionKey: false
});

export default connections.db.model < IEventModel > ('EventModel', EventSchema);
