import { UtilApi } from "@/Util/Util_api";

export class AuthService {

  static async login<T>({ url, param, success, failure }: { url: string, param: T, success: (token: string) => void, failure: (error: string) => void }) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(param),
      });

      const data = await res.json();
      const token = data.token as string;
      if (res.ok) {
        success(token);
      } else {
        failure(UtilApi.selectedErrorMessage(["name", "email", "password"], data["errors"]));
      }
    } catch (error) {
      failure('An unexpected error occurred.');
      console.error('エラー発生', error);
    }
  }

  static async register<T>({ url, param, success, failure }: { url: string, param: T, success: (message: string, token: string) => void, failure: (error: string) => void }) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(param),
      });

      const data = await res.json();

      const token = data.token as string;
      if (res.ok) {
        success("新規登録が完了しました。", token);
      } else {
        failure(UtilApi.selectedErrorMessage(["name", "email", "password"], data["errors"]));
      }
    } catch (error) {
      failure('想定外のエラーが発生しました。');
      console.error('エラー発生', error);
    }
  }


  static setSesstion(token: string) {
    localStorage.setItem('token', JSON.stringify(token));
  }

  static getSesstion(): unknown {
    if (typeof window !== 'undefined') {
      const userInfo = localStorage.getItem('token');
      if (userInfo) {
        return JSON.parse(userInfo);
      } else {
        return {};
      }
    } else {
      return {};
    }
  }
}
