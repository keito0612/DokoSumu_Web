"use client"

import Chart from "@/app/components/Chart";
import StarsRating from "@/app/components/StarsRating";
import TextErea from "@/app/components/TextErea";
import { ChartData } from "@/types";
import { useForm } from 'react-hook-form'
import { ChangeEvent, useState } from "react";
import { MaterialSymbolsLightAdd2 } from "@/app/components/icons/MaterialSymbolsLightAdd2";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { UtilApi } from "@/Util/Util_api";
import { AuthService } from "@/service/authServise";
import { SystemUiconsUserMale } from "@/app/components/icons/SystemUiconsUserMale";
import TextField from "@/app/components/TextField";


interface ProfileEditForm {
  profileImage: File;
  name: string;
  selfIntroduction: string;
}

export default function ProfileEdit() {
  const router = useRouter();
  const params = useParams();
  const { register, handleSubmit, formState: { errors } } = useForm<ProfileEditForm>();
  const [file, setFile] = useState<File>();
  const handleOnAddImage = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length !== 0) {
      setFile(files[0]);
    }
    e.target.value = '';
  };


  async function onSubmit(dataSet: ProfileEditForm) {
    const prefectureId = params.prefectureId;
    const cityId = params.cityId;
    console.log(dataSet);
    const url: string = `${UtilApi.local}post/city_review/${prefectureId}/${cityId}`;
    if (file !== null) {
      dataSet.profileImage = file!;
    }
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
        router.back();
      }
    } catch (error) {
      console.error('エラー発生', error);
    }
  }

  return (
    <div className="flex flex-col items-center p-4 mx-auto w-full max-w-4xl">
      <h2 className="text-black text-2xl md:text-3xl font-bold text-center mb-6">プロフィール編集</h2>

      <form className="w-full" onSubmit={handleSubmit(onSubmit)} method="POST">

        <div className="flex items-center justify-center">
          <label
            htmlFor="profile_image"
            className="2xl:size-32 xl:size-32 lg:size-32 md:size-32 bg-gray-400 font-semibold rounded-full border-4 shadow-md cursor-pointer flex items-center justify-center transition duration-300"
          >
            <SystemUiconsUserMale className="text-white font-bold size-28" />
          </label>
        </div>
        <input
          id="profile_image"
          type="file"
          multiple
          onChange={handleOnAddImage}
          className="hidden"
        />
        <TextField title="名前" className="" register={register("name", {
          maxLength: { value: 100, message: "100文字以内で入力して下さい。" }
        })} />
        {/* 自己紹介欄 */}
        <TextErea title="自己紹介" className="pt-6 mb-3" placeholder="" errorMessage={errors.selfIntroduction?.message} register={register("selfIntroduction", {
          maxLength: { value: 300, message: "300文字以内で入力して下さい。" }
        })} />
      </form >
    </div >
  );
}
