module.exports = {
  apps: [
    {
      // we load the common config
      ...require('./pm2.config'),
      // we set environment variables
      watch: true,
      out_file: "logs/out.log",      // => does not work in PROD (et fait planter le démarrage de l'appli..)
      env: {
        "PORT": 3000,
        "NODE_ENV": "development"
      }
    }
  ]
}