import { Router } from "express";
import { ApiError } from "../utils/ApiError.js";
import { Video } from "../models/video.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";


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
    const { videoId } = req.params
    const video = await Video.findById(new mongoose.Types.ObjectId(videoId))
    if(!video){
        throw new ApiError(400,"video ID is wrong ")
    }
    // if(video.)
})

export default router
