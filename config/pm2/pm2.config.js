module.exports = {
  name: "family-calendar-api-rest",
  script: './build/main.bundle.js',
  // watch: true,
  ignore_watch: ["node_modules"],
  // new feature; increase restart delay each time after every crash or non reachable db per example
  // exp_backoff_restart_delay: 100, => à tester
  // combine multiple err/out logs in one file for each
  combine_logs: true,
  // calls combine logs
  // merge_logs: true, => à tester
  // error log file path
  // error_file: "logs/err.log", // better be /var/log
  error: "logs/err.log", // better be /var/log
  // error_file: "/var/log/family-calendar-api-rest/err.log", => pb de droits en lecture / écriture
  // out log file path
  // out_file: "logs/out.log",      // => does not work in PROD (et fait planter le démarrage de l'appli..)
  // output: "logs/out.log",
  // out_file: "/var/log/family-calendar-api-rest/out.log", // => does not work (et fait planter le démarrage de l'appli..)
  // out_path: "logs/out.log",      // => does not work (pas pris en compte)
  // log_file: "logs/combined.log", // => does not work (et fait planter le démarrage de l'appli..)
  // use time in logs
  // log: "logs/combined.outerr.log",
  time: true,
}