"use client"

import Chart from "@/app/components/Chart";
import StarsRating from "@/app/components/StarsRating";
import TextErea from "@/app/components/TextErea";
import { ChartData, ResultType } from "@/types";
import { useForm } from 'react-hook-form'
import { useState } from "react";
import { MaterialSymbolsLightAdd2 } from "@/app/components/icons/MaterialSymbolsLightAdd2";
import { useParams, useRouter } from "next/navigation";
import { UtilApi } from "@/Util/Util_api";
import { AuthService } from "@/service/authServise";
import Loading2 from "@/app/components/Loading2";
import Modal from "@/app/components/Modal";


interface RatingPostForm {
  safety: number
  childRearing: number
  cityPolicies: number
  publicTransportation: number
  livability: number
  photos: File[]
  goodComment: string
  badComment: string
}


const categoriesTitle = ["治安", "子育て", "制度", "交通機関", "住みやすさ"];
const categories = ["safety", "childRearing", "cityPolicies", "publicTransportation", "livability"];

export default function RatingPost() {
  const [ratings, setRatings] = useState<{ [key: string]: number }>(
    Object.fromEntries(categories.map((cat) => [cat, 0]))
  );
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const { register, handleSubmit, formState: { errors } } = useForm<RatingPostForm>();
  const [averageScore, setAverageScore] = useState<number>(0);
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<ResultType>('Success');
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const handleRatingChange = (category: string, value: number) => {
    setRatings((prev) => {
      const newRatings = { ...prev, [category]: value };
      const averageScore = Object.values(newRatings).reduce((sum, score) => sum + score, 0) / categories.length;
      setAverageScore(averageScore);
      return newRatings;
    });
  };
  const handleOnAddImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      const newUrls = Array.from(event.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setFiles(((prev) => [...prev, ...newFiles]));
      setPreviewUrls((prev) => [...prev, ...newUrls]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const onClone = () => {
    setIsModalOpen(false);
    if (modalType === 'Success') {
      router.back();
    }
  }

  async function onSubmit(dataSet: RatingPostForm) {
    const prefectureId = params.prefectureId;
    const cityId = params.cityId;
    const url: string = `${UtilApi.local}api/post/city_review/${prefectureId}/${cityId}`;
    dataSet.photos = files;
    const formData = new FormData();

    formData.append('safety', dataSet.safety.toString());
    formData.append('childRearing', dataSet.childRearing.toString());
    formData.append('cityPolicies', dataSet.cityPolicies.toString());
    formData.append('publicTransportation', dataSet.publicTransportation.toString());
    formData.append('livability', dataSet.livability.toString());
    formData.append('goodComment', dataSet.goodComment);
    formData.append('badComment', dataSet.badComment);
    dataSet.photos.forEach((file) => {
      formData.append('photos[]', file)
    })
    setLoading(true);
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${AuthService.getSesstion()}`,
        },
        body: formData,
      });
      const data = await res.json();
      setLoading(false);
      if (res.ok) {
        setIsModalOpen(true);
        setModalType('Success');
        setModalTitle('レビューが投稿されました。');
        setModalMessage('');
      } else {
        const message = UtilApi.selectedErrorMessage(["safety", "childRearing", "cityPolicies", "publicTransportation", "livability", "goodComment", "badComment"], data["errors"])
        setIsModalOpen(true);
        setModalType('Error');
        setModalTitle('エラーが発生しました。');
        setModalMessage(message);
      }
    } catch (error) {
      setIsModalOpen(true);
      setModalType('Error');
      setModalTitle('エラーが発生しました。');
      setModalMessage('原因不明のエラーが発生した事により、投稿できませんでした。');
      setLoading(false);
      console.log(error);
    }
  }

  const chartData: ChartData[] = categories.map((category, index) => (
    {
      name: categoriesTitle[index],
      score: ratings[category],
      fullMark: 0
    }));

  return (
    <div className="w-full h-full">
      {loading === true && (
        <Loading2 loadingtext={"読み込み中"} />
      )}
      <div className="flex flex-col items-center p-4 mx-auto w-full max-w-4xl">
        {/* タイトル */}
        <h2 className="text-black text-2xl md:text-3xl font-bold text-center mb-6">あなたの評価を教えてください。</h2>

        {/* 星評価 */}
        <StarsRating rating={averageScore} />

        {/* レーダーチャート */}
        <Chart title="評価" data={chartData} className="mb-8 mt-8" />
        <form className="w-full" onSubmit={handleSubmit(onSubmit)} method="POST">
          {/* セレクトボタン */}
          < div className="w-24 h-8 sm:w-24 sm:h-10 md:w-32 md:h-12 bg-lime-400 text-white rounded-full flex items-center justify-center font-bold text-xs sm:text-sm md:text-base">
            それぞれの評価
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
            {categories.map((category, index) => (
              <div key={category} className="text-center">
                <p className="text-black text-base md:text-lg font-semibold mb-2">{categoriesTitle[index]}</p>
                <select
                  {...register(category as keyof RatingPostForm, {
                    required: true
                  })}
                  className="w-24 md:w-32 lg:w-36 bg-lime-500 text-white rounded-md p-2"
                  value={ratings[category]}
                  onChange={(e) => handleRatingChange(category, Number(e.target.value))}
                >
                  {[0, 1, 2, 3, 4, 5].map((value) => (
                    <option key={value} value={value} className="bg-green-400 text-white">
                      {value}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
          {/* 良い所欄 */}
          <TextErea title="良い所" className="pt-6 mb-3" placeholder="" errorMessage={errors.goodComment?.message} register={register("goodComment", {
            maxLength: { value: 300, message: "300文字以内で入力して下さい。" }
          })} />
          {/* 悪いところ */}
          <TextErea title="悪いところ" className="mb-3" placeholder="" errorMessage={errors.badComment?.message} register={register("badComment", {
            maxLength: { value: 300, message: "300文字以内で入力して下さい。" }
          })} />
          {/* 画像アップロード */}
          <div className="flex flex-col justify-start">
            < div className="w-16 h-8 mb-2 sm:w-20 sm:h-10 md:w-24 md:h-12 bg-lime-400 text-white rounded-full flex items-center justify-center font-bold text-xs sm:text-sm md:text-base">
              写真
            </div>
            <div className="bg-gray-100 my-2 ml-4 p-6 rounded-xl">
              <div className="grid grid-cols-4 gap-2 items-center  place-items-center mt-4">
                {previewUrls.map((url, index) => (
                  <div key={index} className="relative 2xl:size-32 xl:size-28 lg:size-28 md:size-20">
                    <button
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-1 left-1 w-6 h-6 bg-red-500 text-white text-xs flex items-center justify-center rounded-full shadow-md hover:bg-red-600 transition"
                    >
                      ✕
                    </button>

                    <img src={url} alt="preview" className="rounded-lg" />
                  </div>
                ))}
                {previewUrls.length < 4 ? (
                  <label
                    htmlFor="images"
                    className="2xl:size-28 xl:size-24 lg:size-20 md:size-16 bg-green-600 font-semibold rounded-full border-4 shadow-md cursor-pointer hover:bg-green-500 flex items-center justify-center transition duration-300"
                  >
                    <MaterialSymbolsLightAdd2 className="text-white font-bold size-12" />
                  </label>
                ) : (
                  <div></div>
                )}
                <input
                  id="images"
                  type="file"
                  multiple
                  onChange={handleOnAddImage}
                  className="hidden"
                />
              </div>

              <div className="flex justify-between items-center mt-4">
                <span className="text-gray-600 text-sm">写真の枚数: {previewUrls.length}</span>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="w-full md:w-48 h-16 bg-lime-500 text-white font-bold rounded-full shadow-md hover:bg-lime-600 transition duration-300"
            >
              投稿する
            </button>
          </div>
        </form >
      </div >
      <Modal
        isOpen={isModalOpen}
        onClose={onClone}
        type={modalType}
        message={modalMessage}
        title={modalTitle} />
    </div>
  );
}
