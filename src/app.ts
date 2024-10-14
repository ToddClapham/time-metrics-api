import 'reflect-metadata';  // Import reflect-metadata before anything else
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';  // Import cors
import { getEnvVariable } from './env';

import apiRoutes from './routes/api.routes';

import prometheusMiddleware from 'express-prometheus-middleware';
import authMiddleware from './middleware/auth.middleware';
import ErrorMessage from './util/ErrorMessage';

const app = express();
const port = getEnvVariable('port');

app.use(cors({
    origin: getEnvVariable('corsOrigin'),
    optionsSuccessStatus: 200
}));  // Use cors middleware

app.use(authMiddleware.authenticate);

app.use(prometheusMiddleware({
    metricsPath: '/metrics',
    collectDefaultMetrics: true,
    requestDurationBuckets: [0.1, 0.5, 1, 1.5]
}));

app.use(apiRoutes);

// error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: Error | ErrorMessage, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof ErrorMessage) {
        res.status(error.httpStatus).send({message: error.message});
    } else {
        console.log('Server error', error);
        res.status(500).send({message: "Server error"});
    }
});

// 404 handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use('*', (req: Request, res: Response, next: NextFunction) => {
    res.status(404).send({error: 'Route not found'});
});

// Function to start the server
export const startServer = async () => {
    const server = app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });

    // Graceful shutdown
    const gracefulShutdown = async () => {
        console.log('Received shutdown signal, closing server...');
        server.close((err) => {
            if (err) {
                console.error('Error closing server:', err);
                process.exit(1);
            }
            console.log('Server closed.');
            process.exit(0);
        });
    };

    process.on('SIGINT', gracefulShutdown);
    process.on('SIGTERM', gracefulShutdown);

    return server;
};

// Export the app for testing
export default app;

// Only start the server if this file is run directly
if (require.main === module) {
    startServer();
}
