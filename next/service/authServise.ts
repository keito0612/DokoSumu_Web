import { UtilApi } from "@/Util/Util_api";

export class AuthService {

  static async login<T>({ url, param, success, validetionMessage, failure }: { url: string, param: T, success: (token: string) => void, validetionMessage: (message: string) => void, failure: (error: string) => void }) {
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
        if (data.errors) {
          validetionMessage(UtilApi.selectedErrorMessage(['email', 'password'], data.errors));
        } else if (data.message) {
          failure(data.message);
        }
      }
    } catch (error) {
      failure("予期しないエラーが発生しました");
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

  static deleteSesstion() {
    localStorage.removeItem('token');
  }

  static getSesstion(): null {
    if (typeof window !== 'undefined') {
      const userInfo = localStorage.getItem('token');
      if (userInfo) {
        return JSON.parse(userInfo);
      } else {
        return null;
      }
    }
    return null;
  }
}
