import axios from "axios";

export class AuthService {

  static async login<T>({ url, param, success, failure }: { url: string, param: T, success: (result: any) => void, failure: (error: string) => void }) {
    try {
      const res = await axios.post(url, param);
      const data = res.data;
      if (res.status === 200) {
        success(data);
      } else {
        failure(data.validation_errors);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMsg = error.response?.data?.message || 'ログインに失敗しました。';
        failure(errorMsg);
      } else {
        failure('An unexpected error occurred.');
      }
      console.error('エラー発生', error);
    }
  }


  static async register<T>({ url, param, success, failure }: { url: string, param: T, success: (message: String) => void, failure: (error: string) => void }) {
    try {
      const res = await axios.post(url, param);
      const data = res.data;
      if (res.status === 200) {
        success("新規登録が完了しました。");
      } else {
        failure(data.validation_errors);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMsg = error.response?.data?.message || 'ユーザー情報の取得に失敗しました。';
        failure(errorMsg);
      } else {
        failure('An unexpected error occurred.');
      }
      console.error('エラー発生', error);
    }
  }

  static setSesstion(token: string) {
    localStorage.setItem('token', JSON.stringify(token));
  }
  static getSesstion(): any {
    const userInfo = localStorage.getItem('token')
    if (userInfo) {
      return JSON.parse(userInfo);
    } else {
      return {};
    }
  }
}