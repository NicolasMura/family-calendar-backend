#!/bin/bash

source .env;

# récupération des paramètres
while getopts ":d" option;
do
  # echo "getopts a trouvé l'option $option"
  case ${option} in
    d )
      echo "flag --demo !"
      demo=1
      $PATH_DEST=$PATH_DEST_DEMO
      ;;
    \?)
      echo "$OPTARG : option invalide"
      exit 1
      ;;
  esac
done

tar -czf backend.tar.gz -X exclude.txt -C $PATH_SRC .

scp -i $PATH_SSH_KEY backend.tar.gz $USER@$HOSTNAME:$PATH_DEST && echo transfer successful!;
ssh -i $PATH_SSH_KEY $USER@$HOSTNAME bash -c "'
  cd $PATH_DEST
  cp .env ..
  # ls -la
  rm -Rf backend
  sleep 1s
  echo Décompression...
  tar xzf backend.tar.gz
  mv ../.env .
  rm backend.tar.gz
'";
echo done