import { IError } from "../../../../types/error-interface";
import { IPostRepository } from "../../../repositories/post/IPosts-repositories";
import { PostfindDTO } from "./post-find-DTO";


export class PostFindAllUseCase {
    constructor(private postRepository: IPostRepository,) {}

    public async execute(id: string): Promise<IError | PostfindDTO> {
        try {
            const posts = await this.postRepository.find(id);
            if(posts){
                return posts;
            }
            return {error: "Nenhum post encontrado", status: 404}
        } catch (error) {
            console.error("Erro ao executar a operação:", error); 
            return { error: 'Erro interno no servidor', status: 500 }; 
        }
    } 

    private async validate(id: string): Promise<boolean | string | IError> {
        if (!id || typeof id !== 'string') {
            return { error: "ID do post inválido", status: 400 };
        }

        const posts = await this.postRepository.find(id);

        if (id.length < 36) {
            if (posts && posts.id) {
                const newId: string = posts.id;
                return newId;
            }
            return { error: "Nenhum post encontrado", status: 404 };

        } else {
            return id;

        }
    }
}