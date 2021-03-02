import config from '../config/env/index';
import EventService from '../components/Event/service';
import { IEventModel } from '../components/Event/model';
import { Moment } from '../../node_modules/moment/ts3.1-typings/moment';

const moment: any = require('moment');
const webpush: any = require('web-push');
const fetch: any = require('node-fetch');

// Send SMS with OVH
const ovh: any = require('ovh')({
  appKey: config.ovh.appKey,
  appSecret: config.ovh.appSecret,
  consumerKey: config.ovh.consumerKey
});

/**
* @export
* @TODO: not used
*/
export function add(event: IEventModel): void {
  if (!(global as any).eventsWithNotifications) {
    (global as any).eventsWithNotifications = [];
  }
  (global as any).eventsWithNotifications.push(event);
}

/**
* @export
* @TODO: not used
*/
export function update(updatedEvent: IEventModel): void {
  const updatedEventIndex: number = (global as any).eventsWithNotifications.findIndex(
    (event: IEventModel) => event._id === updatedEvent._id);

  (global as any).eventsWithNotifications[updatedEventIndex] = updatedEvent;
}

/**
* @export
* @returns {Promise<void>}
* @TODO: not used / trouver comment faire vivre un tableau dynamique eventsWithNotifications / (global as any).eventsWithNotifications
*/
export async function initSchedule(): Promise<void> {
  try {
    const now: Moment = moment();
    const futureEvents: IEventModel[] = await EventService.findAll(now.unix().toString(), null);

    // console.log('********** ALL FUTURE EVENTS **********');
    // console.log(now);
    // console.log(futureEvents);

    // console.log('Events count : ', futureEvents.length);

    if (futureEvents.length > 0) {
      futureEvents.forEach((event: IEventModel) => {
        if (event.reminders.length > 0) {
          this.add(event);
        }
      });
    }

  } catch (error) {
    console.log(error);
  }
}

/**
* @export
* @returns {Promise<void>}
*/
export function checkForNotificationsEveryMinute(): void {
  // console.log('$$$$$$ checkForNotificationsEveryMinute() $$$$$$$$');
  const now: Moment = moment();
  const nextMinute: Moment = now.clone().add(1, 'minute').startOf('minute');
  const millisecondsTillNextMinute: number = moment.duration(nextMinute.diff(now)).asMilliseconds();

  setTimeout(() => {
    sendNotifs();
    let check: any;

    setInterval(() => {
      // clearInterval(check);
      check = sendNotifs();
    }, 60000);
  }, millisecondsTillNextMinute);
}

/**
* @export
* @returns {Promise<void>}
*/
export async function sendNotifs(): Promise<void> {
  const now: Moment = moment();
  const futureEventsWithNotifications: IEventModel[] = [];

  try {

    let futureEvents: IEventModel[] = await EventService.findAll(now.unix().toString(), null);

    // console.log('********** ALL FUTURE EVENTS **********');
    // console.log(now);
    // console.log(futureEvents);

    // console.log('Events count : ', futureEvents.length);

    if (futureEvents.length > 0) {
      futureEvents.forEach((event: IEventModel) => {
        if (event.reminders.length > 0) {
          // add(event);
          futureEventsWithNotifications.push(event);
        }
      });
    } else {
      futureEvents = [];
    }

    futureEventsWithNotifications.forEach((event: IEventModel) => {
      event.reminders.forEach((reminder: string, index: number) => {
        const reminderMoment: Moment = moment.unix(Number(event.startDate)).startOf('minute').add(-Number(reminder), 'milliseconds');
        const remainingTime: number = moment.duration(reminderMoment.diff(now)).asSeconds();

        // console.log(event.title, reminderMoment, ' : remainingTime before notification (' + index + ', ' + reminder + ') : ', remainingTime, 's');
        if (Math.abs(remainingTime) < 10) {
          // console.log('===> Notification à envoyer pour l\'événement : ', event.title);
          const initUnixDate: string = event.startDate;
          // const content: string = Number(reminder) === 0 ? 'C\'est l\'heure !' : ???;
          // const text: string = moment.duration(
          //   Number(event.startDate) - moment().startOf('minute').add(1, 'minute').unix(), 'seconds').humanize(true);
          // const text: string = moment.duration(
          //   Number(event.startDate) - moment().unix(), 'seconds').humanize(true);
          const text: string = moment.unix(Number(event.startDate)).format('dddd D MMMM') + ', '
            + moment.unix(Number(event.startDate)).format('k:mm') + ' - '
            + moment.unix(Number(event.endDate)).format('k:mm');
          const textCapitalized: string = text.charAt(0).toUpperCase() + text.slice(1);

          // test push notif
          webpush.setVapidDetails(
            'mailto:contact@nicolasmura.fr',
            'BHt5Vvq_7jdl0flnWQTe7-gDVZLSuK862a8qy9eoAjzjAjL911ko5LllzW3DTiN5kqczdLoOAnJOIiQ7O-DIvxE', 'FW1upR5V6hoO99dYJ9xIzbEGUDOhQYbqD1HW_8BWLN4'
          );
          // TESTS Firebase
          fetch('https://pwagram-44b72.firebaseio.com/subscriptions.json')
            .then((res: any) => {
              if (res.ok) {
                // displayConfirmNotification();
                // const reader = res.body.getReader();
                // reader.read().then(({ done, value }: any) => {
                //   console.log(done);
                //   console.log(value);
                // });
                res.json().then((responseJSON: any) => {
                  // console.log(responseJSON);
                  for (const subscription in responseJSON) {
                    if (responseJSON.hasOwnProperty(subscription)) {
                      // console.log(responseJSON[subscription]);
                      const sub: any = responseJSON[subscription];

                      const pushConfig: any = {
                        endpoint: sub.endpoint,
                        keys: {
                          auth: sub.keys.auth,
                          p256dh: sub.keys.p256dh
                        }
                      };

                      // IT WORKS!!!
                      webpush.sendNotification(pushConfig, JSON.stringify({
                        title: event.title,
                        content: textCapitalized,
                        openUrl: `/?init_unix_date=${initUnixDate}&openEventId=${event._id}`
                      }))
                        .catch((err: any) => {
                          // console.log('*********************');
                          // console.log('Erreur sur la souscription ', sub.endpoint);
                          // console.log(err);
                          // console.log(err.statusCode);
                          // console.log(typeof(err.statusCode));
                          if (err.statusCode === 410) {
                            // console.log('removing subscription n° ' + subscription);
                            // remove it
                            fetch('https://pwagram-44b72.firebaseio.com/subscriptions/' + subscription + '.json', {
                              method: 'DELETE',
                              headers: {
                                'Content-Type': 'application/json',
                                Accept: 'application/json'
                              },
                            })
                            .then((res: any) => {
                              if (res.ok) {
                                // console.log('Done!');
                              }
                            })
                            .catch((err: any) => {
                              console.log(err);
                            });
                          }
                        });
                    }
                  }
                });
              }
            })
            .catch((err: any) => {
              console.log(err);
            });

          // test send SMS
          event.usersEmails.forEach((email: string) => {
            // A remplacer par un test sur un booléan du genre 'isOS' + il faut un moyen de récupérer le mobile...
            if (email === 'julie.sabadell@gmail.com') {
              ovh.request('GET', '/sms', (err: any, serviceName: string) => {
                if (err) {
                  console.log(err, serviceName);
                } else {
                  // console.log('My account SMS is ' + serviceName);
                  console.log('Send SMS test to 0033675818974');

                  // Send a simple SMS with a short number using your serviceName
                  ovh.request('POST', '/sms/' + serviceName + '/jobs/', {
                    message: `Rappel - ${event.title} : ${textCapitalized} - \
https://family-calendar.nicolasmura.com/?init_unix_date=${initUnixDate}&openEventId=${event._id}`,
                    // message: 'https://family-calendar.nicolasmura.com/settings',
                    senderForResponse: false,
                    sender: 'MURA',
                    // receivers: ['0033648347459'],
                    receivers: ['0033675818974'],
                    // receivers: ['0033648347459', '0033675818974'],
                    noStopClause: true
                  }, (errsend: any, result: any) => {
                    console.log(errsend, result);
                  });
                }
              });
            }
          });
        }
      });
    });

  } catch (error) {
    console.log(error);
  }

}
