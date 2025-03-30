export class UtilApi {
  static local = "http://localhost/";
  static selectedErrorMessage(keys: string[], errors: { [key: string]: string[] }): string {
    for (const key of keys) {
      if (errors[key]?.length) {
        return errors[key][0];
      }
    }
    return "";
  }
}