interface IStorageProviderImplementations {
  saveFile(file: string): Promise<string>;
  deleteFile(file: string): Promise<void>;
}

export { IStorageProviderImplementations };
