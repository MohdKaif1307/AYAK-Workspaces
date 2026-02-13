export interface IAuthStorage {
  upsertUser(user: any): Promise<void>;
  getUser(id: string): Promise<any>;
}

class InMemoryAuthStorage implements IAuthStorage {
  private users = new Map();

  async upsertUser(user: any): Promise<void> {
    this.users.set(user.id, user);
  }

  async getUser(id: string): Promise<any> {
    return this.users.get(id) || null;
  }
}

export const authStorage = new InMemoryAuthStorage();
