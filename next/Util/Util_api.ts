export class UtilApi {
  static API_URL = process.env.NODE_ENV === 'development'
    ? 'http://localhost'
    : 'https://api.pre-re-vi.com';
  static selectedErrorMessage(keys: string[], errors: { [key: string]: string[] }): string {
    for (const key of keys) {
      if (errors[key]?.length) {
        return errors[key][0];
      }
    }
    return "";
  }
}