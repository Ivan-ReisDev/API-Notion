import { Post } from "../../entities/Post";
import notion from "../database/notion";
import { IPostRepository } from "./IPosts-repositories";
import config from "config";

const NOTION_ID = config.get<string>("NOTION_ID");

export class PostNotionRepositoryes implements IPostRepository {
  private notionDatabaseId = NOTION_ID;

  public async find(id: string): Promise<Post | null> {
    try {
        
      const response = await notion.databases.query({
        database_id: this.notionDatabaseId,
        filter: {
          property: "ID",
          number: {
            equals: parseInt(id, 10),
          },
        },
      });


      if (response.results.length === 0) return null;

      const page = response.results[0];

      if ('properties' in page) {
        const post = this.mapNotionResponseToPost(page);
        return post;
      } else {
        console.error("Resposta não contém propriedades esperadas:", page);
        return null;
      }
    } catch (error) {
      console.error("Erro ao buscar no banco de dados do Notion:", error);
      return null;
    }
  }

  public async create(postData: Post): Promise<Post | null> {
    try {
      const imageProperty = postData.image
        ? {
            files: [
              {
                type: "external", 
                external: { url: postData.image },
              },
            ],
          }
        : {};
  
   
      const response = await notion.pages.create({
        parent: {
          database_id: this.notionDatabaseId, 
        },
        properties: {
          Company: {
            title: [
              {
                text: {
                  content: postData.company || "", 
                },
              },
            ],
          },
          Campaign: {
            rich_text: [
              {
                text: {
                  content: postData.campaign || "", 
                },
              },
            ],
          },
          Description: {
            rich_text: [
              {
                text: {
                  content: postData.description || "", 
                },
              },
            ],
          },
          PlannedDate: {
            date: {
              start: postData.plannedDate || "",
            },
          },
          Where: {
            rich_text: [
              {
                text: {
                  content: postData.where || "", 
                },
              },
            ],
          },
          Language: {
            select: {
              name: postData.language || "", 
            },
          },
          Content: {
            rich_text: [
              {
                text: {
                  content: postData.content || "", 
                },
              },
            ],
          },
          'image content': {
            rich_text: [
              {
                text: {
                  content: postData.imageContent || "", 
                },
              },
            ],
          },
          Image: {
            files: [
              {
                type: "external",
                external: {
                  url: postData.image || "",  
                },
                name: "image_file",  
              },
            ],
          }
        },
      });
  
      const createdPost = new Post(
        {
          company: postData.company,
          campaign: postData.campaign,
          description: postData.description,
          plannedDate: postData.plannedDate,
          where: postData.where,
          language: postData.language,
          content: postData.content,
          imageContent: postData.imageContent,
          image: postData.image,
        },
        response.id
      ); 
  
      return createdPost;
    } catch (error) {
      console.error("Erro ao criar post no banco de dados do Notion:", error);
      return null;
    }
  }

  public async updateById(id: string, postData: Post): Promise<Post | null> {
    try {
        console.log(id)
      const imageProperty = postData.image
        ? {
            files: [
              {
                type: "external",
                external: { url: postData.image },
              },
            ],
          }
        : {};
  
      const response = await notion.pages.update({
        page_id: postData.id as string,  
        properties:{
            Company: {
            title: [
              {
                text: {
                  content: postData.company || "", 
                },
              },
            ],
          },
          Campaign: {
            rich_text: [
              {
                text: {
                  content: postData.campaign || "", 
                },
              },
            ],
          },
          Description: {
            rich_text: [
              {
                text: {
                  content: postData.description || "", 
                },
              },
            ],
          },
          PlannedDate: {
            date: {
              start: postData.plannedDate || "",
            },
          },
          Where: {
            rich_text: [
              {
                text: {
                  content: postData.where || "", 
                },
              },
            ],
          },
          Language: {
            select: {
              name: postData.language || "", 
            },
          },
          Content: {
            rich_text: [
              {
                text: {
                  content: postData.content || "", 
                },
              },
            ],
          },
          'image content': {
            rich_text: [
              {
                text: {
                  content: postData.imageContent || "", 
                },
              },
            ],
          },
          Image: {
            files: [
              {
                type: "external",
                external: {
                  url: postData.image || "",  
                },
                name: "image_file",  
              },
            ],
          }
        },
      });
  
      const updatedPost = new Post(
        {
          company: postData.company,
          campaign: postData.campaign,
          description: postData.description,
          plannedDate: postData.plannedDate,
          where: postData.where,
          language: postData.language,
          content: postData.content,
          imageContent: postData.imageContent,
          image: postData.image,
        },
        response.id
      );
  
      return updatedPost;
    } catch (error) {
      console.error("Erro ao atualizar o post no banco de dados do Notion:", error);
      return null;
    }
  }

  public async deleteById(id: string): Promise<boolean> {
    try {
        

        await notion.blocks.delete({
          block_id: id,  
        });
    
        return true;  
      } catch (error) {
        console.error(`Erro ao arquivar o bloco no Notion: ${error}`);
        return false;  
      }
  }

  private extractContent(property: any, type: string): string {
    if (!property) return "";  
  
    switch (type) {
      case "title":
        return property?.title?.[0]?.text.content || "";  
      case "rich_text":
        return property?.rich_text?.[0]?.text.content || "";  
      case "date":
        return property?.date?.start || "";  
      case "select":
        return property?.select?.name || "";  
      case "files":
       
        if (property?.files && property.files.length > 0) {
          const file = property.files[0]?.file || property.files[0]?.external;
          if (file?.url) {
            return file.url || "";
          }
        }
        return "";  
      case "image":
       
        if (property?.image?.type === "external" && property?.image?.external?.url) {
          return property.image.external.url || "";  
        } else if (property?.image?.type === "file" && property?.image?.file?.url) {
          return property.image.file.url || "";  
        }
        return "";  

      case "url":
        return property?.url || "";  


      default:
        return "";  
    }
  }
  

  private mapNotionResponseToPost(page: any): Post | null {
    const properties = page.properties;
    const post = new Post({
      company: this.extractContent(properties.Company, "title"),
      campaign: this.extractContent(properties.Campaign, "rich_text"),
      description: this.extractContent(properties.Description, "rich_text"),
      plannedDate: this.extractContent(properties.PlannedDate, "date"),
      where: this.extractContent(properties.Where, "rich_text"),
      language: this.extractContent(properties.Language, "select"),
      content: this.extractContent(properties.Content, "rich_text"),
      imageContent: this.extractContent(properties["image content"], "rich_text"),
      image: this.extractContent(properties.Image, "files"), 
    }, page.id);
  
    return post;
  }
}
