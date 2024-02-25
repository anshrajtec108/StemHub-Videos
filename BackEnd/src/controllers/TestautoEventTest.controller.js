import { Router } from "express";

const router = Router();
// Route for SSE connection
router.get('/autoevents', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Send SSE events periodically
    setInterval(() => {
        const eventData = {
            message: 'Hello from server!',
            timestamp: new Date().toLocaleTimeString()
        };
        res.write(`data: ${JSON.stringify(eventData)}\n\n`);
    }, 1000);
});

const auto_UpdateLike = asyncHandler(async (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    if()    
})

export default router
