import { CreateCommand } from "./domain";
import { GetAllResponse } from "./domain";

export default class BookService {
  async getAll(): Promise<GetAllResponse> {
    const response = await fetch('http://localhost:3000/books');
    return await response.json();
  }
  async createBook(command: CreateCommand): Promise<void> {
    try {
      const reposnse = await fetch('http://localhost:3000/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(command),
      });
      console.log(reposnse);
    } catch (error) {
      console.log(error);
    }
  }
}
