'use client';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation'
import { AuthService } from '@/service/authServise';
import Loading from '../components/Loading';
import SnackbarComponent from '../components/SnackBar';
import { UtilApi } from '@/Util/Util_api';
import Modal from '../components/Modal';
import { ResultType } from '@/types';
import Loading2 from '../components/Loading2';

interface Form {
  name: string;
  email: string;
  password: string;
};

function SignUp() {
  const { register, handleSubmit, formState: { errors } } = useForm<Form>();
  const [errorMessage, setErrorMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<ResultType>('Success');
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  async function onSubmit(dataSet: Form) {
    setLoading(true);
    await AuthService.register({
      url: `${UtilApi.local}api/register`,
      param: dataSet,
      success(message, token) {
        console.log(message);
        setLoading(false);
        AuthService.setSesstion(token);
        setIsModalOpen(true);
        setModalType('Success');
        setModalTitle('新規登録が完了しました。');
        setModalMessage('');
      }, failure(error) {
        setErrorMessage(error);
        setSnackbarOpen(true);
        console.log(error);
        setLoading(false);
      },
    });
  }
  const handleCloseSnackbar = (): void => {
    setSnackbarOpen(false);
  };

  const onClone = () => {
    setIsModalOpen(false);
    if (modalType === 'Success') {
      router.push('/home');
    }
  }
  return (
    <div className="SignUp">
      {loading === true && (
        <Loading2 loadingtext={"アカウントを作成中"} />
      )}
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
      <Modal
        isOpen={isModalOpen}
        onClose={onClone}
        type={modalType}
        message={modalMessage}
        title={modalTitle} />
    </div>
    // </Loading>
  );
}

export default SignUp;