import { Request, Response } from "express";
import { PostFindAllUseCase } from "./post-find-usecase";

export class PostFindAllController {
    constructor(private postFindAllUseCase: PostFindAllUseCase) { }
    async handle(req: Request, res: Response): Promise<void> {
        try {
            const postId = req.headers['post-id'];
            const posts = await this.postFindAllUseCase.execute(postId as string);
            if (posts && "error" in posts && "status" in posts) {
                res.status(posts.status).json({ error: posts.error });
                return;
            }
            res.status(200).json(posts);
            return;
        } catch (error: any) {
            res.status(500).json({ error: "erro desconhecido" });
        }
    }
}
