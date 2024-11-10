import { Request, Response } from "express";
import { PostUpdateUseCase } from "./post-update-usecase";

export class PostUpdateController {
    constructor(private postUpdateUseCase: PostUpdateUseCase) {}
    async handle(req: Request, res: Response): Promise<void> { 
        try {
            const { data } = req.body;
            const postId = req.headers['post-id']; 

            const result = await this.postUpdateUseCase.execute(postId as string, data);

            if (typeof result === "object" && "error" in result && "status" in result) {
                res.status(result.status).json({ error: result.error });
                return;
            }

            if (result === true) {
                res.status(204).json({ message: "Post atualizado com sucesso." });
            } else {
                res.status(500).json({ error: "Erro desconhecido ao atualizar o post." });
            }
        } catch (error: any) {
            res.status(500).json({ error: "Erro desconhecido" });
        }
    }
}
