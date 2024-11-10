// src/validators/PostUpdateValidator.ts
import { PostUpdateDTO } from "../post-update-DTO";
import { IValidator } from "./IValidator";


export class PostUpdateValidator implements IValidator<PostUpdateDTO> {
  public validate(data: PostUpdateDTO): null | { error: string; status: number } {
    if (data.plannedDate && !/^\d{4}-\d{2}-\d{2}$/.test(data.plannedDate)) {
      return { error: "Formato de data inválido. Use 'AAAA-MM-DD'", status: 400 };
    }

    if (data.image && !/^https?:\/\/[^\s]+$/.test(data.image)) {
      return { error: "URL de imagem inválida", status: 400 };
    }

    if (data.language && typeof data.language !== "string") {
      return { error: "Linguagem deve ser uma string", status: 400 };
    }

    if (data.company && typeof data.company !== "string") {
      return { error: "Company deve ser uma string", status: 400 };
    }

    if (data.campaign && typeof data.campaign !== "string") {
      return { error: "Campaign deve ser uma string", status: 400 };
    }

    if (data.description && typeof data.description !== "string") {
      return { error: "Description deve ser uma string", status: 400 };
    }

    if (data.where && typeof data.where !== "string") {
      return { error: "Where deve ser uma string", status: 400 };
    }

    if (data.content && typeof data.content !== "string") {
      return { error: "Content deve ser uma string", status: 400 };
    }

    if (data.imageContent && typeof data.imageContent !== "string") {
      return { error: "Image content deve ser uma string", status: 400 };
    }

    return null;
  }
}
