'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { AuthService } from '@/service/authServise';
import Loading2 from '../components/Loading2';
import SnackbarComponent from '../components/SnackBar';
import Modal from '../components/Modal';
import { UtilApi } from '@/Util/Util_api';
import { ResultType } from '@/types';
import NavBar from '../components/NavBar';
import NavigationBottomBar from '../components/NavigationBottomBar';

interface Form {
  name: string;
  email: string;
  password: string;
}

function SignUp() {
  const { register, handleSubmit, formState: { errors } } = useForm<Form>();
  const [errorMessage, setErrorMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [modalType, setModalType] = useState<ResultType>('Success');
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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

  return (
    <>
      <NavBar title='新規登録' />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        {loading && <Loading2 loadingtext="アカウントを作成中..." />}
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-center text-green-600 mb-6">新規登録</h1>
          <form onSubmit={handleSubmit(onSubmit)} method="POST" className="space-y-4">
            {/* 名前 */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700">名前</label>
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
                className="mt-1 text-black w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300"
              />
              {errors.name && <p className="text-sm text-red-600 mt-1">※{errors.name.message}</p>}
            </div>

            {/* メール */}
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
                className="mt-1 text-black w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300"
              />
              {errors.email && <p className="text-sm text-red-600 mt-1">※{errors.email.message}</p>}
            </div>

            {/* パスワード */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700">パスワード</label>
              <input
                id="password"
                type="password"
                placeholder='パスワードは8文字以上入力してください。'
                {...register("password", {
                  required: "パスワードは必須です",
                  minLength: {
                    value: 8,
                    message: "パスワードは8文字以上でなくてはなりません",
                  },
                })}
                className="mt-1 text-black w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300"
              />
              {errors.password && <p className="text-sm text-red-600 mt-1">※{errors.password.message}</p>}
            </div>

            {/* ボタン */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2 px-4 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 shadow transition duration-300"
              >
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
          title={modalTitle}
        />
      </div>
      <NavigationBottomBar />
    </>
  );
}

export default SignUp;
