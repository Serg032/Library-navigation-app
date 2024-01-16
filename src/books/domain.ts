export interface Book {
  id: string;
  name: string;
  author: string;
  publisher: string;
  pages: number;
  img: string;
}

export interface CreateCommand extends Omit<Book, 'id'> {}
export interface UpdateCommand extends Omit<Partial<CreateCommand>, 'id'> {}
export interface GetAllResponse {
  books: Book[];
}
