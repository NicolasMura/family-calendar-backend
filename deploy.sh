#!/bin/bash

path_ssh_key='/Users/nmura/.ssh/id_rsa_ovh';
path_src='/Users/nmura/dev/perso/family-calendar-backend';
path_dst='/home/nmura/projects/family-calendar/backend';

tar -czf backend.tar.gz -X exclude.txt -C $path_src .

scp -i $path_ssh_key backend.tar.gz nmura@family-calendar.nicolasmura.com:$path_dst && echo transfer successful!;
ssh -i $path_ssh_key nmura@family-calendar.nicolasmura.com bash -c "'
  cd $path_dst
  cp .env ..
  ls -la
  rm -Rf backend
  sleep 1s
  # echo Décompression...
  tar xzf backend.tar.gz
  mv ../.env .
'";
# echo done