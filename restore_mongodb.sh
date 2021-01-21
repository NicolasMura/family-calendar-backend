#!/bin/bash

set -e

BACKUP_NAME=<DATETIME>_family-calendar-dump.tar.gz

date
echo "Restore MongoDB $BACKUP_NAME database to DigitalOcean Space: $SPACE_NAME"
cd /home/nmura/projects/family-calendar/db-backup
tar xzf $BACKUP_NAME
mongorestore --port <MONGODB_PORT> --authenticationDatabase "family_calendar_db" -u family_calendar_db_user -p <PASSWORD> --nsInclude=family_calendar_db.eventmodel dump/

echo "Done"
