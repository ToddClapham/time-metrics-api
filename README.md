# Time Metrics API

## Description
This project is a service for getting the current time in epoch seconds as well as the Prometheus metrics.

## API Endpoints
- `GET /time`: Returns the current epoch time in seconds.
- `GET /metrics`: Returns the Prometheus metrics for the application.

## Installation 

### For running locally
1. Download the repository
2. Navigate to time-metrics-api: `cd /path/to/time-metrics-api`
3. Create `.env` file based on `example.env`
4. Install dependencies: `npm install`
5. Start the api: `npm start`
6. Service is now running at `localhost:3000` or whichever port you defined in the `.env` file
7. Ensure `time-metrics-react-app` is also running (see repository [readme](https://github.com/ToddClapham/time-metrics-react-app))

### Using GitHub Actions (requires rsync to be installed on the machine)
- Workflow in the .github/workflows folder will deploy to a linux VM when code is pushed to the `dev` branch
- To modify this for your own use:
  1. Fork the repository to your own GitHub page
  2. Change the branch name in `ts-deploy-to-dev.yml` to the branch you would like to deploy
  3. Set the secrets and variables in your repository's settings page:
     - SSH_PRIVATE_KEY: private key for the machine to deploy to
     - REMOTE_HOST: IP address of the machine to deploy to (e.g. 255.255.255.255)
     - REMOTE_TARGET: directory of the project on the host machine (e.g. /var/www/projects/dev.app)
     - REMOTE_USER: user with admin rights to the machine (e.g. admin_user)
     - PM2_NAME: name of the project in pm2 (e.g. dev_app)

## Testing
- Run `npm test` to execute the tests.