export class LocalStorageServise {
  static setStorage(key: string, value: any) {
    localStorage.setItem(key, value);
  }

  static getStorage(key: string) {
    return localStorage.getItem(key);
  }
  static deleteStorage(key: string) {
    localStorage.delete(key);
  }
}