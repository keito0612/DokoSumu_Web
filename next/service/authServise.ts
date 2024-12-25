export class AuthService {

  static async login<T>({ url, param, success, failure }: { url: string, param: T, success: (token: string) => void, failure: (error: string) => void }) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(param),
      });

      const data = await res.json();
      const token = data.token as string;
      if (res.ok) {
        success(token);
      } else {
        failure(data.validation_errors || 'エラーが発生しました。');
      }
    } catch (error) {
      failure('An unexpected error occurred.');
      console.error('エラー発生', error);
    }
  }

  static async register<T>({ url, param, success, failure }: { url: string, param: T, success: (message: string) => void, failure: (error: string) => void }) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(param),
      });

      const data = await res.json();

      if (res.ok) {
        success("新規登録が完了しました。");
      } else {
        failure(data.validation_errors || 'エラーが発生しました。');
      }
    } catch (error) {
      failure('An unexpected error occurred.');
      console.error('エラー発生', error);
    }
  }

  static setSesstion(token: string) {
    localStorage.setItem('token', JSON.stringify(token));
  }

  static getSesstion(): unknown {
    const userInfo = localStorage.getItem('token');
    if (userInfo) {
      return JSON.parse(userInfo);
    } else {
      return {};
    }
  }
}
