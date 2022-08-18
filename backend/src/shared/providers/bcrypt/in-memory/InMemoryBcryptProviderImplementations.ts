import { IBcryptProviderImplementations } from '../IBcryptProviderImplementations';

class InMemoryBcryptProviderImplementations
  implements IBcryptProviderImplementations
{
  async generateHash(payload: string): Promise<string> {
    return payload;
  }

  async compareHash(payload: string, hashed: string): Promise<boolean> {
    return payload === hashed;
  }
}

export { InMemoryBcryptProviderImplementations };
