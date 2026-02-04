'use client';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { AuthService } from '@/service/authServise';
import SnackbarComponent from '../components/SnackBar';
import Loading2 from '../components/Loading2';
import Modal from '../components/Modal';
import { ResultType } from '@/types';
import NavBar from '../components/NavBar';
import NavigationBottomBar from '../components/NavigationBottomBar';
import GoogleSignInButton from '../components/GoogleSignInButton';

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
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get('google_auth') === 'success') {
      setModalType('Success');
      setModalTitle('ログインが完了しました');
      setIsModalOpen(true);
    }
  }, [searchParams]);

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
    <>
      <NavBar title='ログイン' />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center px-4 py-20">
        {loading && <Loading2 loadingtext="ログイン中..." />}
        <div className="w-full max-w-md bg-white rounded-2xl shadow-card p-8 animate-fade-in">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">ログイン</h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* メールアドレス */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">メールアドレス</label>
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
                className={`w-full px-4 py-3 text-gray-900 border rounded-xl transition-all duration-200 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${errors.email ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50 hover:border-gray-300 focus:bg-white'
                  }`}
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1.5 font-medium">※{errors.email.message}</p>
              )}
            </div>

            {/* パスワード */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">パスワード</label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register("password", {
                  required: "パスワードは必須です",
                  minLength: {
                    value: 8,
                    message: "パスワードは8文字以上でなくてはなりません",
                  },
                })}
                className={`w-full px-4 py-3 text-gray-900 border rounded-xl transition-all duration-200 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${errors.password ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50 hover:border-gray-300 focus:bg-white'
                  }`}
              />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1.5 font-medium">※{errors.password.message}</p>
              )}
            </div>

            {/* ボタン */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 px-4 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 active:scale-[0.98] shadow-sm hover:shadow-md transition-all duration-200"
              >
                ログイン
              </button>
            </div>

            {/* 区切り線 */}
            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">または</span>
              </div>
            </div>

            {/* Googleログイン */}
            <GoogleSignInButton />

            {/* リンク */}
            <div className="space-y-3 pt-4">
              <div className="text-center text-sm text-gray-600">
                初めてのご利用ですか？
                <Link href="/sinUp" className="ml-1 font-semibold text-green-600 hover:text-green-700 transition-colors">
                  新規登録
                </Link>
              </div>
              <div className="text-center">
                <Link
                  href="/forgot-password"
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  パスワードをお忘れですか？
                </Link>
              </div>
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
      <NavigationBottomBar />
    </>
  );
}

export default Login;
