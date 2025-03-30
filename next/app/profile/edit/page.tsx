"use client"
import TextErea from "@/app/components/TextErea";
import { useForm } from 'react-hook-form'
import { ChangeEvent, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { UtilApi } from "@/Util/Util_api";
import { AuthService } from "@/service/authServise";
import { SystemUiconsUserMale } from "@/app/components/icons/SystemUiconsUserMale";
import TextField from "@/app/components/TextField";
import { useEffect } from "react";
import NavBar from "@/app/components/NavBar";
import NavigationBottomBar from "@/app/components/NavigationBottomBar";
import Image from "next/image";
import ProfileImageUploader from "@/app/components/ProfileImage";
import { Dataset } from "@mui/icons-material";
import SnackbarComponent from "@/app/components/SnackBar";


interface ProfileEditForm {
  profileImage: File | null;
  name: string;
  selfIntroduction: string;
}

export default function ProfileEdit() {
  const router = useRouter();
  const { register, setValue, handleSubmit, formState: { errors } } = useForm<ProfileEditForm>();
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const handleCloseSnackbar = (): void => {
    setSnackbarOpen(false);
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileObject: File = e.target.files![0];
    setFile(fileObject);
    setValue('profileImage', fileObject);
    setImageUrl(URL.createObjectURL(fileObject));
    e.target.value = '';
  };

  useEffect(() => {
    (async () => {
      await getUser();
    })()
  }, []);

  async function getUser() {
    const url = `${UtilApi.local}api/profile`;
    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${AuthService.getSesstion()}`,
        }
      });
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();

    } catch (error) {
      console.error('エラー発生', error);
    }
  }
  async function onSubmit(dataSet: ProfileEditForm) {
    const url = `${UtilApi.local}api/profile`;
    console.log(dataSet);
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${AuthService.getSesstion()}`,
        },
        body: JSON.stringify(dataSet),
      });

      const data = await res.json();
      if (res.ok) {

      } else {
        console.log(data);
        setErrorMessage(UtilApi.selectedErrorMessage(["profileImage", "name", "selfIntroduction"], data));
      }
    } catch (error) {
      console.error('エラー発生', error);
    }
  }

  return (
    <div className="">
      <NavBar />
      <div className="flex flex-col items-center p-4 mx-auto w-full max-w-4xl">
        <h2 className="text-black text-2xl md:text-3xl font-bold text-center mb-6">プロフィール編集</h2>
        <form className="w-full" onSubmit={handleSubmit(onSubmit)} method="POST">
          <ProfileImageUploader file={file} imageUrl={imageUrl} register={register("profileImage", {
            validate: (file) => {
              // ファイルサイズチェック (例: 2MB以下)
              const maxSize = 2 * 1024 * 1024;
              if (file!.size > maxSize) {
                return "ファイルサイズは2MB以下にしてください";
              }

              // 拡張子チェック
              const validExtensions = ["image/jpeg", "image/png", "image/gif"];
              if (!validExtensions.includes(file!.type)) {
                return "JPEG, PNG, GIF の画像を選択してください";
              }

              return true;
            },
          })} errorMessage={errors.profileImage?.message} handleImage={handleImage} />
          <TextField title="名前" className="" errorMessage={errors.name?.message} register={register("name", {
            maxLength: { value: 100, message: "100文字以内で入力して下さい。" }
          })} />
          {/* 自己紹介欄 */}
          <TextErea title="自己紹介" className="pt-6 mb-3" placeholder="" errorMessage={errors.selfIntroduction?.message} register={register("selfIntroduction", {
            maxLength: { value: 300, message: "300文字以内で入力して下さい。" }
          })} />
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="w-48 h-16 bg-lime-500 text-white font-bold  rounded-full shadow-md hover:bg-lime-600 transition duration-300"
            >
              <span className="2xl:text-xl xl:text-xl ml:text-xl ">編集</span>
            </button>
          </div>
        </form >
        <SnackbarComponent
          message={errorMessage}
          open={snackbarOpen}
          onClose={handleCloseSnackbar}
        />
      </div >
      <NavigationBottomBar />
    </div >
  );
}
