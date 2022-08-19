import { IStorageProviderImplementations } from '../IStorageProviderImplementations';

class InMemoryStorageProviderImplementations
  implements IStorageProviderImplementations
{
  private storage: string[] = [];

  async saveFile(file: string): Promise<string> {
    this.storage.push(file);
    return file;
  }

  async deleteFile(file: string): Promise<void> {
    const findIndex = this.storage.findIndex(
      storageFile => storageFile === file,
    );

    this.storage.splice(findIndex, 1);
  }
}

export { InMemoryStorageProviderImplementations };
