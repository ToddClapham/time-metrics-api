# Stats Service

## Description
This project is a service for tracking a user's stats for a particular course on a learning platform. The service provides capabilities to persist new stats and fetch aggregated stats for a course.

## API Endpoints
- `POST /api/courses`: Persists a new course.
- `POST /api/courses/{courseId}`: Persists a session study event.
- `GET  /api/courses/{courseId}`: Fetches course lifetime stats.
- `GET  /api/courses/{courseId}/sessions/{sessionId}`: Fetches a single study session.

## Assumptions
- The service assumes that the user is authenticated and the `userId` is provided in the request headers.
- The service uses SQLite as the database.

## Installation 

### For running locally
1. Clone the repository: `git clone <repository-url>`
2. Navigate to stats-service: `cd /path/to/stats-service`
3. Create `.env` file based on `example.env`
4. Install dependencies: `npm install`
5. Start the service: `npm start`
6. Service is now running at `localhost:3000`

### Using GitHub Actions
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

### Manual deployment
- Compile TypeScript with `npm run build`

## Testing
- Run `npm test` to execute the tests.