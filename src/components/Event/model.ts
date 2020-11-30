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
  endDate: string;
  reminders: number[];
  usersEmails: string[];
  id: string;
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
*        usersEmails:
*          type: array
*      required:
*        - title
*        - startDate
*        - endDate
*        - usersEmails
*      examples:
*        title: "Echographie n°3 !"
*        startDate: "1604509200"
*        startDate: "1604512800"
*        usersEmails: ["nicolas.mura@gmail.com", "julie.sabadell@gmail.com"]
*    Events:
*      type: array
*      items:
*        $ref: '#/components/schemas/EventSchema'
*/
const EventSchema: Schema = new Schema({
  title: {
    type: String,
    trim: true,
    default: ''
  },
  startDate: {
    type: String,
    default: ''
  },
  endDate:  {
    type: String,
    default: ''
  },
  reminders: {
    type: Array,
    default: []
    // default: ['']
  },
  usersEmails: {
    type: Array,
    default: []
    // default: ['']
  }
}, {
  collection: 'eventmodel',
  versionKey: false
});

export default connections.db.model<IEventModel>('EventModel', EventSchema);
