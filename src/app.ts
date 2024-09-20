import 'reflect-metadata';  // Import reflect-metadata before anything else
import express, { Request, Response, NextFunction } from 'express';
import { getEnvVariable } from './env';
import apiRoutes from './routes/api.routes';
import { DataSource } from 'typeorm';
import { dataSource } from './data-source';

const app = express();
const port = getEnvVariable('port');

app.use('/api', apiRoutes);

// error handler
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    if (error.customErrorMessage) {
        res.status(error.httpStatus).send({message: error.message});
    } else {
        console.log('Server error', error);
        res.status(500).send({message: "Server error"});
    }
});

// 404 handler
app.use('*', (req: Request, res: Response, next: NextFunction) => {
    res.status(404).send({error: 'Route not found'});
});

// Function to start the server
export const startServer = async (dataSource: DataSource) => {
    await dataSource.initialize()
    return app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
};

// Export the app for testing
export default app;

// Only start the server if this file is run directly
if (require.main === module) {
    startServer(dataSource);
}