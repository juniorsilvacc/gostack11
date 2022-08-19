import { compare, hash } from 'bcryptjs';
import { IBcryptProviderImplementations } from '../IBcryptProviderImplementations';

class BcryptProviderImplementations implements IBcryptProviderImplementations {
  async generateHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }

  async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}

export { BcryptProviderImplementations };
