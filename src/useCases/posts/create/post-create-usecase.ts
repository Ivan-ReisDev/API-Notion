import { IError } from "../../../../types/error-interface";
import { Post } from "../../../entities/Post";
import { IPostRepository } from "../../../repositories/post/IPosts-repositories";
import { PostCreateRequestDTO } from "./post-create-DTO";


export class PostsCreateUseCase {
    constructor(private postRepository: IPostRepository) {}
    public async execute(data: PostCreateRequestDTO): Promise<IError | Post> {
        try {
            const validationError = await this.validate(data);
            if (validationError) {
                return validationError; 
            }

            const newPost = new Post(data);
            const response = await this.postRepository.create(newPost);

            if(!response) {
                return {error: "Errou ao criar post", status: 500}
            }

            return response; 
        } catch (error) {
            console.error("Erro ao executar a operação:", error); 
            return { error:'Erro interno no servidor', status: 500 }; 
        }
    }

      private async validate(data: PostCreateRequestDTO): Promise<IError | null> {
        const isValidString = (field: string | undefined | null): boolean => typeof field === 'string' && field.trim() !== '';
    
        const requiredFields = ['company', 'campaign', 'description', 'plannedDate', 'imageContent'];
        for (const field of requiredFields) {
          if (!isValidString(data[field as keyof PostCreateRequestDTO])) {
            return { error: 'Por favor preencha todos os campos obrigatórios.', status: 400 };
          }
        }
    
        if (data.image !== null && typeof data.image !== 'string') {
          return { error: 'O campo de imagem precisa ser uma URL válida ou nulo.', status: 400 };
        }
    
        const optionalFields = ['where', 'language', 'content'] as const;
        for (const field of optionalFields) {
          if (data[field] && typeof data[field] !== 'string') {
            return { error: `O campo ${field} precisa ser uma string.`, status: 400 };
          }
        }
    
        return null;
      }
    

}
