'use client';
import React, { Suspense, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { AuthService } from '@/service/authServise';
import Loading2 from '../components/Loading2';
import SnackbarComponent from '../components/SnackBar';
import Modal from '../components/Modal';
import { UtilApi } from '@/Util/Util_api';
import { ResultType } from '@/types';
import NavBar from '../components/NavBar';
import NavigationBottomBar from '../components/NavigationBottomBar';
import GoogleSignInButton from '../components/GoogleSignInButton';
import Loading from '../components/Loading';

interface Form {
  name: string;
  email: string;
  password: string;
}

function SignUpContent() {
  const { register, handleSubmit, formState: { errors } } = useForm<Form>();
  const [errorMessage, setErrorMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [modalType, setModalType] = useState<ResultType>('Success');
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get('google_auth') === 'success') {
      setModalType('Success');
      setModalTitle('新規登録が完了しました');
      setIsModalOpen(true);
    }
  }, [searchParams]);

  const onSubmit = async (dataSet: Form) => {
    setLoading(true);
    await AuthService.register({
      url: `${UtilApi.API_URL}/api/register`,
      param: dataSet,
      success(message, token) {
        setLoading(false);
        AuthService.setSesstion(token);
        setIsModalOpen(true);
        setModalType('Success');
        setModalTitle('新規登録が完了しました');
      },
      failure(error) {
        setErrorMessage(error);
        setSnackbarOpen(true);
        setLoading(false);
      },
    });
  };

  const handleCloseSnackbar = () => setSnackbarOpen(false);

  const onClone = () => {
    setIsModalOpen(false);
    if (modalType === 'Success') {
      router.push('/home');
    }
  };

  const inputBaseClass = "w-full px-4 py-3 text-gray-900 border rounded-xl transition-all duration-200 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent";
  const inputNormalClass = "border-gray-200 bg-gray-50 hover:border-gray-300 focus:bg-white";
  const inputErrorClass = "border-red-400 bg-red-50";

  return (
    <>
      <NavBar title='新規登録' onBack={true} />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center px-4 py-20">
        {loading && <Loading2 loadingtext="アカウントを作成中..." />}
        <div className="w-full max-w-md bg-white rounded-2xl shadow-card p-8 animate-fade-in">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">新規登録</h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} method="POST" className="space-y-5">
            {/* 名前 */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">名前</label>
              <input
                id="name"
                type="text"
                placeholder="例：山田太郎"
                {...register("name", {
                  required: "名前は必須です",
                  maxLength: {
                    value: 100,
                    message: "名前は100文字以内でお願いします。",
                  },
                })}
                className={`${inputBaseClass} ${errors.name ? inputErrorClass : inputNormalClass}`}
              />
              {errors.name && <p className="text-sm text-red-500 mt-1.5 font-medium">※{errors.name.message}</p>}
            </div>

            {/* メール */}
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
                className={`${inputBaseClass} ${errors.email ? inputErrorClass : inputNormalClass}`}
              />
              {errors.email && <p className="text-sm text-red-500 mt-1.5 font-medium">※{errors.email.message}</p>}
            </div>

            {/* パスワード */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">パスワード</label>
              <input
                id="password"
                type="password"
                placeholder="8文字以上で入力"
                {...register("password", {
                  required: "パスワードは必須です",
                  minLength: {
                    value: 8,
                    message: "パスワードは8文字以上でなくてはなりません",
                  },
                })}
                className={`${inputBaseClass} ${errors.password ? inputErrorClass : inputNormalClass}`}
              />
              {errors.password && <p className="text-sm text-red-500 mt-1.5 font-medium">※{errors.password.message}</p>}
            </div>

            {/* ボタン */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 px-4 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 active:scale-[0.98] shadow-sm hover:shadow-md transition-all duration-200"
              >
                新規登録
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

            {/* Googleで登録 */}
            <GoogleSignInButton />
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



export default function SignUp() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Loading loadingtext="読み込み中..." />
      </div>
    }>
      < SignUpContent />
    </Suspense>
  );
}
