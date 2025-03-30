'use client';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation'
import { AuthService } from '@/service/authServise';
import Loading from '../components/Loading';
import SnackbarComponent from '../components/SnackBar';
import { UtilApi } from '@/Util/Util_api';

interface Form {
  name: string;
  email: string;
  password: string;
};

function SignUp() {
  const { register, handleSubmit, formState: { errors } } = useForm<Form>();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);


  const router = useRouter();
  useEffect(() => {

  }, []);

  async function onSubmit(dataSet: Form) {
    setIsLoading(true);
    await AuthService.register({
      url: `${UtilApi.local}api/register`,
      param: dataSet,
      success(message, token) {
        console.log(message);
        setIsLoading(false);
        AuthService.setSesstion(token);
        router.push('/home');
      }, failure(error) {
        setErrorMessage(error);
        setSnackbarOpen(true);
        console.log(error);
        setIsLoading(false);
      },
    });
  }
  const handleCloseSnackbar = (): void => {
    setSnackbarOpen(false);
  };
  return (
    // <Loading
    //   isLoading={isLoading}
    //   loadingtext='新規作成中'
    // >
    <div className="SignUp">
      <div className="flex flex-col items-center justify-center h-screen">
        <form className="w-96 p-8 bg-green-500 rounded-lg shadow-md" onSubmit={handleSubmit(onSubmit)} method='POST'>
          <h1 className="mb-4 text-2xl font-bold text-center text-white">新規登録</h1>
          <div className='mb-4'>
            <label className="justify-start flex text-sm font-bold text-white">名前</label>
            <input
              id="name"
              {...register("name", {
                required: "名前は必須です",
                maxLength: {
                  value: 8,
                  message: "名前は8文字以内でお願いします。",
                },
              })}
              type="text"
              placeholder="mail@myservice.com"
              className="w-full p-2 mt-1 border-2 rounded-md text-black"
            />
            {errors.name && (
              <span className="justify-start flex text-sm text-red-600">※{errors.name.message}</span>
            )}
          </div>
          <div className="mb-4">
            <label className="justify-start flex text-sm font-bold text-white">メールアドレス</label>
            <input
              id="email"
              {...register("email", {
                required: "メールアドレスは必須です",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
                  message: "このメールアドレスは無効です。",
                },
              })}
              type="email"
              placeholder="mail@myservice.com"
              className="w-full text-black p-2 mt-1 border-2 rounded-md"
            />
            {errors.email && (
              <span className="justify-start flex text-sm text-red-600">※{errors.email.message}</span>
            )}
          </div>
          <div className="mb-4">
            <label className="justify-start flex text-sm font-bold text-white">パスワード</label>
            <input
              id="password"
              {...register("password", {
                required: "パスワードは必須です",
                minLength: {
                  value: 8,
                  message: "パスワードは8文字以上でなくてはなりません",
                },
              })}
              type="password"
              className="w-full  text-black p-2 mt-1 border-2 rounded-md"
            />
            {errors.password && (
              <span className="justify-start flex text-sm text-red-600">※{errors.password.message}</span>
            )}
          </div>
          <div className="flex justify-center">
            <button type="submit" className="px-4 py-2 font-bold border-white border text-white bg-green-500 rounded hover:bg-green-300">
              新規登録
            </button>
          </div>
        </form>
      </div>
      <SnackbarComponent
        message={errorMessage}
        open={snackbarOpen}
        onClose={handleCloseSnackbar}
      />
    </div>
    // </Loading>
  );
}

export default SignUp;