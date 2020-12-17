// cluster mode for production env
module.exports = {
  apps: [
    {
      // we load the common config
      ...require('./pm2.config'),
      // we set environment variables
      // instances: 2, // can be max or any number of processes the cpu can handle
      // exec_mode: "cluster",
      watch: false,
      // out_file: "logs/out.log",      // => does not work in PROD (et fait planter le démarrage de l'appli...), see ~/.pm2/logs/family-calendar-api-rest-out.log instead
      env: {
        "PORT": 3000,
        "NODE_ENV": "production"
      },
    }
  ]
}