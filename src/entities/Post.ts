export class Post {
    public readonly id?: string; // ID como string
    public company: string; // Campo "title" (obrigatório)
    public campaign: string; // Campo "rich_text" (obrigatório)
    public description: string; // Campo "rich_text" (obrigatório)
    public plannedDate: string; // Campo "date" (obrigatório, como string ISO)
    public where?: string; // Campo "rich_text" (opcional)
    public language?: string; // Campo "select" (opcional)
    public content?: string; // Campo "rich_text" (opcional)
    public imageContent: string; // Campo "rich_text" (obrigatório)
    public image: string | null; // Campo "files" (URL de imagem opcional)

    constructor(props: Omit<Post, "id">, id?: string) {
        // Atribuindo as propriedades corretamente
        this.company = props.company;
        this.campaign = props.campaign;
        this.description = props.description;
        this.plannedDate = props.plannedDate;
        this.where = props.where;
        this.language = props.language;
        this.content = props.content;
        this.imageContent = props.imageContent;
        this.image = props.image;

        // Atribui o id, se fornecido
        if (id !== undefined) {
            this.id = id;
        }
    }
}
