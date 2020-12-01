import * as bcrypt from 'bcrypt';
import * as connections from '../../config/connection/connection';
import * as crypto from 'crypto';
import { Document, Schema } from 'mongoose';
import { NextFunction } from 'express';
const moment: any = require('moment');

/**
* @export
* @interface IEventModel
* @extends {Document}
*/
export interface IEventModel extends Document {
  title: string;
  startDate: string;
  humanStartDate: string; // just for debug purpose
  endDate: string;
  humanEndDate: string;   // just for debug purpose
  reminders: number[];
  usersEmails: string[];
  color: string;
  category: string;
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
*        humanStartDate:
*          type: string
*        endDate:
*          type: string
*        humanEndDate:
*          type: string
*        reminders:
*          type: array
*        usersEmails:
*          type: array
*        color:
*          type: string
*        category:
*          type: string
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
*        color: ["blue"]
*        category: ["birthday"]
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
  humanStartDate: {
    type: String
  },
  endDate:  {
    type: String,
    default: ''
  },
  humanEndDate: {
    type: String
  },
  reminders: {
    type: Array,
    default: []
  },
  usersEmails: {
    type: Array,
    default: []
  },
  color:  {
    type: String,
    default: 'blue'
  },
  category:  {
    type: String,
    default: ''
  }
}, {
  collection: 'eventmodel',
  versionKey: false
}).pre('save', async function (next: NextFunction): Promise < void > {
  const event: any = this; // tslint:disable-line

  event.humanStartDate = moment.unix(event.startDate).format('YYYY-MM-DDTHH:mm:ssZ');
  event.humanEndDate = moment.unix(event.endDate).format('YYYY-MM-DDTHH:mm:ssZ');
});

export default connections.db.model<IEventModel>('EventModel', EventSchema);
