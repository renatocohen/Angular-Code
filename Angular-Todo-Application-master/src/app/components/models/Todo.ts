export class Todo {
    id?: number;
    title: string;
    is_public: boolean;
    data_criacao: string;

    constructor(id: number, title: string, is_public: boolean, data_criacao: string) {
      this.id = id;
      this.title = title;
      this.is_public = is_public;
      this.data_criacao = data_criacao;
  }
}
