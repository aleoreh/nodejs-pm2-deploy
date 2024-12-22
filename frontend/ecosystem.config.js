require("dotenv").config({ path: ".env.deploy" });

const { DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, DEPLOY_REF } = process.env;

module.exports = {
  apps: [],

  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: "https://github.com/aleoreh/nodejs-pm2-deploy.git",
      path: DEPLOY_PATH,
      "post-deploy": "cd frontend && npm install && npm run build",
    },
  },
};
