import {Book, CreateCommand, GetByIdResponse, UpdateCommand} from './domain';
import {GetAllResponse} from './domain';

export default class BookService {
  async getAll(): Promise<GetAllResponse> {
    const response = await fetch('http://localhost:3000/books');
    return await response.json();
  }

  async getById(id: string): Promise<GetByIdResponse> {
    const response = await fetch(`http://localhost:3000/books/${id}`);
    return await response.json();
  }

  async create(command: CreateCommand): Promise<void> {
    try {
      const response = await fetch('http://localhost:3000/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(command),
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  async update(command: UpdateCommand, id: string): Promise<void> {
    try {
      const response = await fetch(`http://localhost:3000/books/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(command),
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const response = await fetch(`http://localhost:3000/books/${id}`, {
        method: 'DELETE',
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
}
