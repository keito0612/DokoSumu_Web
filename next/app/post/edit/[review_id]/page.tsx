"use client"

import React, { useEffect } from 'react';
import Chart from "@/app/components/Chart";
import StarsRating from "@/app/components/StarsRating";
import TextErea from "@/app/components/TextErea";
import { ChartData, ResultType, Review } from "@/types";
import { Path, useForm } from 'react-hook-form';
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { UtilApi } from "@/Util/Util_api";
import { AuthService } from "@/service/authServise";
import Loading2 from "@/app/components/Loading2";
import Modal from "@/app/components/Modal";
import NavBar from "@/app/components/NavBar";
import ImageUploader from "@/app/components/ImageUploader";
import RatingSection from "@/app/components/RatingSection";
import NavigationBottomBar from '@/app/components/NavigationBottomBar';

interface RatingEditPostForm {
  safety: number;
  childRearing: number;
  cityPolicies: number;
  publicTransportation: number;
  livability: number;
  photos: File[];
  goodComment: string;
  badComment: string;
  averageRating: number;
}

const categoriesTitle = ["治安", "子育て", "制度", "交通機関", "住みやすさ"];
const categories = ["safety", "childRearing", "cityPolicies", "publicTransportation", "livability"];

export default function RatingEditPost() {
  const [ratings, setRatings] = useState<{ [key: string]: number }>(
    Object.fromEntries(categories.map((cat) => [cat, 0]))
  );
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [averageScore, setAverageScore] = useState<number>(0);
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<ResultType>('Success');
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  const { register, getValues, handleSubmit, setValue, reset, formState: { errors } } = useForm<RatingEditPostForm>();


  const fetchData = async () => {
    const reviewId = params.review_id;
    const url = `${UtilApi.API_URL}/api/post/review/${reviewId}`;
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${AuthService.getSesstion()}`,
        },
      });
      const data = await res.json();
      const review: Review = data['review'] as Review;
      reset({
        safety: review.rating.safety,
        childRearing: review.rating.child_rearing,
        cityPolicies: review.rating.city_policies,
        publicTransportation: review.rating.public_transportation,
        livability: review.rating.livability,
        goodComment: review.good_comment,
        badComment: review.bad_comment,
        averageRating: review.rating.average_rating
      })

      setRatings(
        Object.fromEntries(
          categories.map((cat) => {
            const value = getValues(cat as Path<RatingEditPostForm>);
            return [cat, typeof value === "number" ? value : Number(value)];
          })
        )
      );

      setAverageScore(review.rating.average_rating);

      // 画像URLをセット（ここでは画像編集できないので表示だけ）
      const imageUrls: (string)[] = review.photos.map(photo => {
        return photo.photo_url;
      }).filter((url): url is string => url !== null);;
      setPreviewUrls(imageUrls);
      setLoading(false);
    } catch (err) {
      console.error("Fetch failed:", err);
      setLoading(false);
    }
  };
  const handleRatingChange = (category: string, value: number) => {
    setRatings((prev) => {
      const newRatings = { ...prev, [category]: value };
      const avg = Object.values(newRatings).reduce((sum, score) => sum + score, 0) / categories.length;
      setAverageScore(avg);
      setValue(category as Path<RatingEditPostForm>, value);
      return newRatings;
    });
  };

  const handleOnAddImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      const newUrls = newFiles.map((file) => URL.createObjectURL(file));
      setFiles((prev) => [...prev, ...newFiles]);
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
  };

  useEffect(() => {
    (async () => {
      await fetchData();
    })()
  }, []);

  async function onSubmit(dataSet: RatingEditPostForm) {
    const formData = new FormData();
    const reviewId = params.review_id;
    const url = `${UtilApi.API_URL}/api/post/review/${reviewId}/update`;
    dataSet.photos = files;
    dataSet.averageRating = averageScore;

    formData.append('safety', dataSet.safety.toString());
    formData.append('childRearing', dataSet.childRearing.toString());
    formData.append('cityPolicies', dataSet.cityPolicies.toString());
    formData.append('publicTransportation', dataSet.publicTransportation.toString());
    formData.append('livability', dataSet.livability.toString());
    formData.append("goodComment", dataSet.goodComment.toString());
    formData.append("badComment", dataSet.badComment.toString());
    formData.append("averageRating", dataSet.averageRating.toString());
    dataSet.photos.forEach((file) => {
      formData.append("photos[]", file);
    });
    setLoading(true);
    console.log(formData.get('badComment'));
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${AuthService.getSesstion()}`,
        },
        body: formData,
      });
      const data = await res.json();
      setLoading(false);
      if (res.ok) {
        setIsModalOpen(true);
        setModalType("Success");
        setModalTitle("レビューが更新されました。");
      } else {
        const message = UtilApi.selectedErrorMessage([...categories, "goodComment", "badComment"], data.errors);
        setIsModalOpen(true);
        setModalType("Error");
        setModalTitle("エラーが発生しました。");
        setModalMessage(message);
      }
    } catch (error) {
      setIsModalOpen(true);
      setModalType("Error");
      setModalTitle("エラーが発生しました。");
      setModalMessage("原因不明のエラーが発生しました。");
      setLoading(false);
      console.error(error);
    }
  }

  const chartData: ChartData[] = categories.map((category, index) => ({
    name: categoriesTitle[index],
    score: ratings[category],
    fullMark: 0,
  }));

  return (
    <div className="w-full h-full">
      <NavBar title="編集" />
      {loading && <Loading2 loadingtext="読み込み中..." />}
      {!loading && (
        <div className="flex flex-col items-center p-4 pt-24 mx-auto w-full max-w-4xl bg-gray-100" >
          {/* <h2 className="text-black text-2xl md:text-3xl font-bold text-center mb-6"></h2> */}
          <div className='flex flex-col items-center w-full py-4  rounded-2xl bg-white mb-4'>
            <StarsRating rating={averageScore} />
          </div>
          <div className='w-full flex flex-col items-center p-2 pb-16 bg-white rounded-2xl'>
            <Chart title="評価" data={chartData} />
          </div>
          <form className="w-full" onSubmit={handleSubmit(onSubmit)} method="POST">
            <div className='w-full p-2 pb-2 my-4 bg-white rounded-2xl'>
              <RatingSection
                categories={categories as Path<RatingEditPostForm>[]}
                categoriesTitle={categoriesTitle}
                ratings={ratings}
                register={register}
                handleRatingChange={handleRatingChange}
              />
            </div>
            <div className='w-full p-2 pb-2 my-4 bg-white rounded-2xl'>
              <TextErea
                title="良い所"
                placeholder=""
                errorMessage={errors.goodComment?.message}
                register={register("goodComment", { maxLength: { value: 300, message: "300文字以内で入力して下さい。" } })}
              />
            </div>
            <div className='w-full p-2 pb-2 my-4 bg-white rounded-2xl'>
              <TextErea
                title="悪いところ"
                className="mb-3"
                placeholder=""
                errorMessage={errors.badComment?.message}
                register={register("badComment", { maxLength: { value: 300, message: "300文字以内で入力して下さい。" } })}
              />
            </div>
            <ImageUploader
              previewUrls={previewUrls}
              handleRemoveImage={handleRemoveImage}
              handleOnAddImage={handleOnAddImage}
            />
            <div className="flex justify-center mt-6 pb-24">
              <button
                type="submit"
                className="w-full md:w-48 h-16 bg-lime-500 text-white font-bold rounded-full shadow-md hover:bg-lime-600 transition duration-300"
              >
                編集
              </button>
            </div>
          </form>
          <NavigationBottomBar />
        </div >
      )
      }
      <Modal
        isOpen={isModalOpen}
        onClose={onClone}
        type={modalType}
        message={modalMessage}
        title={modalTitle}
      />
    </div >
  );
}
