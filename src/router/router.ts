import { Router, Request, Response } from "express";
import PostsRouter from "./post-router";

const router = Router();

router.use("/",  PostsRouter);

export default router;