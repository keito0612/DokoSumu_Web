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
        failure(this.selectedErrorMessage(data["errors"]));
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
        },
        body: JSON.stringify(param),
      });

      const data = await res.json();

      const token = data.token as string;
      if (res.ok) {
        success("新規登録が完了しました。", token);
      } else {
        console.log(data);
        failure(this.selectedErrorMessage(data["errors"]));
      }
    } catch (error) {
      failure('想定外のエラーが発生しました。');
      console.error('エラー発生', error);
    }
  }

  static selectedErrorMessage(errors: { [key: string]: string[] }): string {
    if (errors["email"]?.length) {
      return errors["email"][0];
    } else if (errors["password"]?.length) {
      return errors["password"][0];
    } else if (errors["name"]?.length) {
      return errors["name"][0];
    }
    return "";
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
