// IPostDTO.ts
export interface PostfindDTO {
    id?: string;           
    company: string;       
    campaign: string;      
    description: string;   
    plannedDate: string;   
    where?: string;       
    language?: string;     
    content?: string;      
    imageContent: string;  
    image: string | null; 
}
