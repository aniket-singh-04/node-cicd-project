import express from 'express';
import { uptime } from 'node:process';

export const app = express();

app.get('/', (req, res) => {
    return res.status(200).json({ message: 'Hello, World! from the get route' });
})

app.get('/health', (req, res) => {
    const serverUptime = Math.floor(uptime());

    return res.status(200).json({
        message: "Server is healthy",
        status: "OK",
        timestamp: new Date().toISOString(),
        uptime: `${Math.floor(serverUptime / 60)} minutes and ${serverUptime % 60} seconds`
    });
})

app.post('/', (req, res) => {
    return res.status(200).json({ message: 'Hello, World! from the post route' });
})
