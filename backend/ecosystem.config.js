require('dotenv').config({ path: '.env.deploy' });

const {
  DEPLOY_USER,
  DEPLOY_HOST,
  DEPLOY_PATH,
  DEPLOY_REF = 'origin/master',
} = process.env;

module.exports = {
  apps: [
    {
      name: 'app',
      script: './dist/app.js',
      cwd: './backend',
      watch: '.',
    },
  ],

  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: 'https://github.com/aleoreh/nodejs-pm2-deploy.git',
      path: DEPLOY_PATH,
      'pre-deploy-local': `scp -Cr .env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/source/backend`,
      'post-deploy':
        'cd backend && npm install && npm run build && pm2 startOrRestart ecosystem.config.js --env production',
      'pre-setup': '',
    },
  },
};
