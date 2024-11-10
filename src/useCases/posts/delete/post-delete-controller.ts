import { Request, Response } from "express";
import { PostDeleteUseCase } from "./post-delete-usecase";

export class PostDeleteController {
    constructor(private postDeleteUseCase: PostDeleteUseCase) { }

    async handle(req: Request, res: Response): Promise<void> {
        try {
            const postId = req.headers['post-id'];
            
            const posts = await this.postDeleteUseCase.execute(postId as string);

            if (posts && typeof posts === "object") {
                res.status(posts.status).json({ error: posts.error });
                return;
            }
            
            res.status(204).json({ message: "Usuário deletado com sucesso" });
            return;
        } catch (error: any) {
            res.status(500).json({ error: "erro desconhecido" });
        }
    }
}
