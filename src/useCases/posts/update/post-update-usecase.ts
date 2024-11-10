import { PostUpdateDTO } from "./post-update-DTO";
import { IError } from "../../../../types/error-interface";
import { IPostRepository } from "../../../repositories/post/IPosts-repositories";
import { IValidator } from "./validation/IValidator";
import { Post } from "../../../entities/Post";

export class PostUpdateUseCase {
  constructor(
    private postRepository: IPostRepository,
    private validator: IValidator<PostUpdateDTO>
  ) {}

  public async execute(id: string, data: PostUpdateDTO): Promise<IError | boolean> {

    const idValidation = await this.validateId(id);
    if (typeof idValidation === "object" && "error" in idValidation) {
      return idValidation;
    }

    const dataValidation = this.validator.validate(data);
    if (dataValidation) {
      return dataValidation; 
    }

    const existingPost = await this.postRepository.find(id);
    
    if (!existingPost) {
      return { error: "Nenhum post encontrado", status: 404 };
    }

    const updatedData: Post = new Post(
      {
        company: data.company ?? existingPost.company,
        campaign: data.campaign ?? existingPost.campaign,
        description: data.description ?? existingPost.description,
        plannedDate: data.plannedDate ?? existingPost.plannedDate,
        where: data.where ?? existingPost.where,
        language: data.language ?? existingPost.language,
        content: data.content ?? existingPost.content,
        imageContent: data.imageContent ?? existingPost.imageContent,
        image: data.image ?? existingPost.image,
      },
      existingPost.id
    );

    try {
      const updatedPost = await this.postRepository.updateById(id, updatedData);
      if (updatedPost) {
        return true;
      }
      return { error: "Nenhum post encontrado", status: 404 };
    } catch (error) {
      console.error("Erro ao executar a operação:", error);
      return { error: "Erro interno no servidor", status: 500 };
    }
  }

  private async validateId(id: string): Promise<string | IError> {
    if (!id || typeof id !== "string") {
      return { error: "ID do post inválido", status: 400 };
    }

    const post = await this.postRepository.find(id);

    if (id.length < 36) {
      if (post && post.id) {
        return post.id; 
      }
      return { error: "Nenhum post encontrado", status: 404 };
    }

    return id; 
  }
}
