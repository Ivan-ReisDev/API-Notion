export interface UpdatePostDTO {
    company?: string;
    campaign?: string;
    description?: string;
    plannedDate?: string; // Deve estar em formato ISO, ex: "2024-11-01"
    where?: string;
    language?: string; // Nome da linguagem como string, ex: "Português"
    content?: string;
    imageContent?: string;
    image?: string; // URL da imagem
  }
  