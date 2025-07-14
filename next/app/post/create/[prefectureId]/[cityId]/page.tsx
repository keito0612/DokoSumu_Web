"use client"

import Chart from "@/app/components/Chart";
import StarsRating from "@/app/components/StarsRating";
import TextErea from "@/app/components/TextErea";
import { ChartData, ResultType } from "@/types";
import { Path, useForm } from 'react-hook-form'
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { UtilApi } from "@/Util/Util_api";
import { AuthService } from "@/service/authServise";
import Loading2 from "@/app/components/Loading2";
import Modal from "@/app/components/Modal";
import NavBar from "@/app/components/NavBar";
import ImageUploader from "@/app/components/ImageUploader";
import RatingSection from "@/app/components/RatingSection";

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
    const url: string = `${UtilApi.API_URL}/api/post/city_review/${prefectureId}/${cityId}`;
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
        console.log(message);
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
      console.error(error);
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
      <NavBar title="新規投稿" />
      {loading === true && (
        <Loading2 loadingtext={"読み込み中"} />
      )}
      <div className="flex flex-col items-center p-4 pt-24  mx-auto w-full max-w-4xl">
        {/* タイトル */}
        <h2 className="text-black text-2xl md:text-3xl font-bold text-center mb-6">あなたの評価を教えてください。</h2>

        {/* 星評価 */}
        <StarsRating rating={averageScore} />

        {/* レーダーチャート */}
        <Chart title="評価" data={chartData} className="mb-8 mt-8" />
        <form className="w-full" onSubmit={handleSubmit(onSubmit)} method="POST">
          {/* セレクトボタン */}
          <RatingSection
            categories={categories as Path<RatingPostForm>[]}
            categoriesTitle={categoriesTitle}
            ratings={ratings}
            register={register}
            handleRatingChange={handleRatingChange}
          />
          {/* 良い所欄 */}
          <TextErea title="良い所" className="pt-6 mb-3" placeholder="" errorMessage={errors.goodComment?.message} register={register("goodComment", {
            maxLength: { value: 300, message: "300文字以内で入力して下さい。" }
          })} />
          {/* 悪いところ */}
          <TextErea title="悪いところ" className="mb-3" placeholder="" errorMessage={errors.badComment?.message} register={register("badComment", {
            maxLength: { value: 300, message: "300文字以内で入力して下さい。" }
          })} />
          {/* 画像アップロード */}
          <ImageUploader
            previewUrls={previewUrls}
            handleRemoveImage={handleRemoveImage}
            handleOnAddImage={handleOnAddImage}
          />
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
