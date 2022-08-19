import fs from 'fs';
import { IStorageProviderImplementations } from '../IStorageProviderImplementations';
import uploadConfig from '../../../../config/upload';
import path from 'path';

class DiskStorageProviderImplementations
  implements IStorageProviderImplementations
{
  async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, file),
      path.resolve(uploadConfig.uploadsFolder, file),
    );

    return file;
  }

  async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadsFolder, file);

    try {
      // Get de informações do arquivo
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    // Se encontrou
    await fs.promises.unlink(filePath);
  }
}

export { DiskStorageProviderImplementations };
