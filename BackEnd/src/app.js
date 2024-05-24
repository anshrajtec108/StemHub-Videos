import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRouter from './routes/user.routes.js';
import healthcheckRouter from "./routes/healthcheck.routes.js";
import tweetRouter from "./routes/tweet.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import videoRouter from "./routes/video.routes.js";
import commentRouter from "./routes/comment.routes.js";
import likeRouter from "./routes/like.routes.js";
import playlistRouter from "./routes/playlist.routes.js";
import dashboardRouter from "./routes/dashboard.routes.js";
import AutoEvent from "./routes/autoEvent.routes.js";
import test from "./controllers/TestautoEventTest.controller.js";

const app = express();

// Apply CORS middleware
app.use(cors({
    origin: '*',
    credentials: true // If you're using cookies or other credentials
}));

app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes declaration
app.use("/api/v1/healthcheck", healthcheckRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tweets", tweetRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);
app.use("/api/v1/videos", videoRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/likes", likeRouter);
app.use("/api/v1/playlist", playlistRouter);
app.use("/api/v1/dashboard", dashboardRouter);
app.use("/api/v1/history", AutoEvent);
app.use("/api/v1/event", test);

// Catch-all route
// app.use((req, res, next) => {
//     res.status(404).send('hello');
// });

export default app;
