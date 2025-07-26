'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AuthService } from '@/service/authServise';
import SnackbarComponent from '../components/SnackBar';
import Loading2 from '../components/Loading2';
import Modal from '../components/Modal';
import { ResultType } from '@/types';

interface Inputs {
  email: string;
  password: string;
}

function Login() {
  const [loading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [modalType, setModalType] = useState<ResultType>('Success');
  const [modalTitle, setModalTitle] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

  const onSubmit = async (dataSet: Inputs) => {
    setIsLoading(true);
    await AuthService.login({
      url: 'http://localhost/api/login',
      param: dataSet,
      success(token) {
        setIsModalOpen(true);
        setModalType('Success');
        setModalTitle('ログインが完了しました');
        AuthService.setSesstion(token);
        setIsLoading(false);
      },
      validetionMessage(error) {
        setErrorMessage(error);
        setSnackbarOpen(true);
        setIsLoading(false);
      },
      failure(error) {
        setIsModalOpen(true);
        setModalType('Error');
        setModalTitle('ログインに失敗しました。');
        setModalMessage(error);
        setIsLoading(false);
      },
    });
  };

  const onClone = () => {
    setIsModalOpen(false);
    if (modalType === 'Success') {
      router.push('/home');
    }
  };

  const handleCloseSnackbar = () => setSnackbarOpen(false);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      {loading && <Loading2 loadingtext="アカウントを作成中..." />}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-green-600 mb-6">ログイン</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* メールアドレス */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">メールアドレス</label>
            <input
              id="email"
              type="email"
              placeholder="mail@example.com"
              {...register("email", {
                required: "メールアドレスは必須です",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/,
                  message: "このメールアドレスは無効です。",
                },
              })}
              className="mt-1 w-full px-4 text-black py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300"
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">※{errors.email.message}</p>
            )}
          </div>

          {/* パスワード */}
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700">パスワード</label>
            <input
              id="password"
              type="password"
              {...register("password", {
                required: "パスワードは必須です",
                minLength: {
                  value: 8,
                  message: "パスワードは8文字以上でなくてはなりません",
                },
              })}
              className="mt-1 text-black w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300"
            />
            {errors.password && (
              <p className="text-sm text-red-600 mt-1">※{errors.password.message}</p>
            )}
          </div>

          {/* ボタン */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 shadow transition duration-300"
            >
              ログイン
            </button>
          </div>

          {/* 新規登録リンク */}
          <div className="text-center mt-4 text-sm text-gray-600">
            初めてのご利用ですか？
            <Link href="/sinUp" className="ml-1 font-semibold text-green-500 hover:text-green-600 underline">
              新規登録はこちら
            </Link>
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
        title={modalTitle}
      />
    </div>
  );
}

export default Login;
