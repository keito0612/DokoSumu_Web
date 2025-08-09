"use client"
import { useState } from 'react';
import dynamic from 'next/dynamic'
import NavBar from '../components/NavBar';
import NavigationBottomBar from '../components/NavigationBottomBar';
import SheetModal from '../components/SheetModal';
import { useRouter } from 'next/navigation'
import StarsRating from '../components/StarsRating';
import { ChartData, City, Photo, Review } from '@/types';
import CityList from '../components/CityList';
import { UtilApi } from '@/Util/Util_api';
import Tabs, { Tab } from '../components/Tabs';
import Loading from '../components/Loading';
import PostButton from '../components/PostButton';
import ReviewList from '../components/review/ReviewList';
import { AuthService } from '@/service/authServise';
import ImagesModal from '../components/review/modal/ImagesModal';
import ReviewPhotoGallery from '../components/review/ReviewPhotoGallery';
interface PrefectureBlockProps {
  region: string;
  prefectures: { id: number; name: string }[];
  handleButtonClick: (prefexture: { id: number; name: string }) => void;
}

const PrefectureBlock: React.FC<PrefectureBlockProps> = ({ region, prefectures, handleButtonClick }) => {
  return (
    <div className="border-2 border-white p-4 m-4 bg-green-500 rounded-lg">
      <h2 className="text-white text-xl   text-center   font-bold mb-4">{region}</h2>
      <div className={`flex flex-wrap gap-4  justify-center sm:justify-start  ${prefectures.length === 1 ? 'justify-center' : ''}`}>
        {prefectures.map((prefecture) => (
          <button
            key={prefecture.id}
            onClick={() => handleButtonClick(prefecture)}
            className="border  bg-green-500 border-white text-white py-2 px-4 rounded-lg hover:bg-green-300 hover:text-gray-200 transition"
          >
            {prefecture.name}
          </button>
        ))}
      </div>
    </div>
  );
};



function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedName, setSelectedName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [citys, setCitys] = useState<City[]>([]);
  const router = useRouter();
  const [selectedPrefectureId, setSelectedPrefectureId] = useState<number | null>(null);
  const [selectedCityId, setSelectedCityId] = useState<number | null>(null);
  const [selectedTab, setSelectedTab] = useState<string>('0');
  const [imageViewerOpen, setImageViewerOpen] = useState(false);
  const [selectImageIndex, setSelectImageIndex] = useState<number | null>(null);
  const [reviewList, setReviewList] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [allReviewPhotos, setAllReviewPhotos] = useState<Photo[]>([]);
  const tabs: Tab[] = [
    {
      id: '0', label: '評価', content: 'Content for Tab 1', onTap: (tabId: string) => {
        setSelectedTab(tabId);
      }
    },
    {
      id: '1', label: 'レビュー', content: 'Content for Tab 2', onTap: (tabId: string) => {
        setSelectedTab(tabId);
      }
    },
  ];


  const addQueryParameter = (paramName: string, paramValue: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set(paramName, paramValue);
    router.push(url.toString());
  };

  const openImageViewer = (index: number) => {
    setSelectImageIndex(index);
    setImageViewerOpen(true);
  };

  const closeImageViewer = () => {
    setImageViewerOpen(false);
  };

  const Chart = dynamic(() => import('../components/Chart'), { ssr: false })
  const mocChartData: ChartData[] = [
    {
      name: "治安",
      score: 5,
      fullMark: 5
    },
    {
      name: "制度",
      score: 2,
      fullMark: 5
    },
    {
      name: "住みやすさ",
      score: 5,
      fullMark: 5
    },
    {
      name: "人",
      score: 5,
      fullMark: 5
    },
    {
      name: "子育て",
      score: 5,
      fullMark: 5
    }
  ];

  const deleteQueryParameters = (paramNames: string[]) => {
    const url = new URL(window.location.href);
    paramNames.forEach((param) => url.searchParams.delete(param));
    router.push(url.toString());
  };
  const closeModal = () => {
    deleteQueryParameters(["prefecture", "city_id"]);
    setSelectedCityId(null);
    setSelectedPrefectureId(null);
    setSelectedTab("0");
    setIsModalOpen(false);
  };



  const regions: { name: string; prefectures: { id: number; name: string }[] }[] = [
    { name: "北海道地方", prefectures: [{ id: 1, name: "北海道" }] },
    {
      name: "東北地方", prefectures: [
        { id: 2, name: "青森県" },
        { id: 3, name: "岩手県" },
        { id: 4, name: "宮城県" },
        { id: 5, name: "秋田県" },
        { id: 6, name: "山形県" },
        { id: 7, name: "福島県" }
      ]
    },
    {
      name: "関東地方", prefectures: [
        { id: 8, name: "東京都" },
        { id: 9, name: "茨城県" },
        { id: 10, name: "栃木県" },
        { id: 11, name: "群馬県" },
        { id: 12, name: "埼玉県" },
        { id: 13, name: "千葉県" },
        { id: 14, name: "神奈川県" }
      ]
    },
    {
      name: "中部地方", prefectures: [
        { id: 15, name: "新潟県" },
        { id: 16, name: "富山県" },
        { id: 17, name: "石川県" },
        { id: 18, name: "福井県" },
        { id: 19, name: "山梨県" },
        { id: 20, name: "長野県" },
        { id: 21, name: "岐阜県" },
        { id: 22, name: "静岡県" },
        { id: 23, name: "愛知県" }
      ]
    },
    {
      name: "近畿地方", prefectures: [
        { id: 24, name: "京都府" },
        { id: 25, name: "大阪府" },
        { id: 26, name: "三重県" },
        { id: 27, name: "滋賀県" },
        { id: 28, name: "兵庫県" },
        { id: 29, name: "奈良県" },
        { id: 30, name: "和歌山県" }
      ]
    },
    {
      name: "中国地方", prefectures: [
        { id: 31, name: "鳥取県" },
        { id: 32, name: "島根県" },
        { id: 33, name: "岡山県" },
        { id: 34, name: "広島県" },
        { id: 35, name: "山口県" }
      ]
    },
    {
      name: "四国地方", prefectures: [
        { id: 36, name: "徳島県" },
        { id: 37, name: "香川県" },
        { id: 38, name: "愛媛県" },
        { id: 39, name: "高知県" }
      ]
    },
    {
      name: "九州地方", prefectures: [
        { id: 40, name: "福岡県" },
        { id: 41, name: "佐賀県" },
        { id: 42, name: "長崎県" },
        { id: 43, name: "熊本県" },
        { id: 44, name: "大分県" },
        { id: 45, name: "宮崎県" },
        { id: 46, name: "鹿児島県" },
        { id: 47, name: "沖縄県" }
      ]
    }
  ];

  const handlePrefectureButtonClick = async (prefecture: { id: number; name: string }) => {
    setIsLoading(true);
    setIsModalOpen(true);
    setSelectedPrefectureId(prefecture.id);
    setSelectedName(prefecture.name);
    addQueryParameter("prefecture", prefecture.id.toString());
    await getCitys(prefecture.id);
    await getPrefectureReviews(prefecture.id);
    setIsLoading(false);
  };

  const hendleCityButtonClick = async (city: City) => {
    setIsLoading(true);
    setIsModalOpen(true);
    setSelectedCityId(city.id);
    addQueryParameter("city_id", city.id.toString());
    setSelectedName(city.name);
    await getCityReviews(selectedPrefectureId!, city.id);
    setIsLoading(false);
  }

  const postButtonClick = (prefectureId: number, cityId: number) => {
    router.push(`/post/create/${prefectureId}/${cityId}`);
  }

  const getCitys = async (prefectureId: number) => {
    const url = `${UtilApi.API_URL}/api/${prefectureId}/citys`;
    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${AuthService.getSesstion()}`
        }
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status} `);
      }

      const data = await res.json();
      const citys: City[] = data['citys'];
      setCitys(citys);
    } catch (error) {
      console.error('エラー発生', error);
    }
  }

  const getPrefectureReviews = async (prefecturesId: number) => {
    const url = `${UtilApi.API_URL}/api/prefecture_reviews/${prefecturesId}`;

    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${AuthService.getSesstion()}`
        }
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status} `);
      }

      const data = await res.json();
      const reviewList: Review[] = data['reviews'];
      const allReviewPhotos: Photo[] = data['photos'];
      setAllReviewPhotos(allReviewPhotos);
      const averageRating: number = reviewListAverageRating(reviewList);
      setAverageRating(averageRating);
      setReviewList(reviewList);
    } catch (error) {
      console.error('エラー発生', error);
    }
  }

  const getCityReviews = async (prefecturesId: number, cityId: number) => {
    console.log(cityId);
    const url = `${UtilApi.API_URL}/api/city_reviews/${prefecturesId}/${cityId}`;
    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${AuthService.getSesstion()}`
        }
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status} `);
      }

      const data = await res.json();
      const reviewList: Review[] = data['reviews'];
      const allReviewPhotos: Photo[] = data['photos'];
      const averageRating: number = reviewListAverageRating(reviewList);
      setAverageRating(averageRating);
      setAllReviewPhotos(allReviewPhotos);
      setReviewList(reviewList);
      console.log(allReviewPhotos);
    } catch (error) {
      console.error('エラー発生', error);
    }
  }


  function reviewListAverageRating(reviewList: Review[]): number {
    const totalAverageRating: number = reviewList.map((review) => review.rating.average_rating).reduce((sum, rating) => sum + rating, 0);
    const averageOfAverages: number = reviewList.length > 0
      ? totalAverageRating / reviewList.length
      : 0;
    const roundedAverage = Math.ceil(averageOfAverages * 10) / 10;
    return roundedAverage;
  }

  return (
    <div className={`Home h-screen ${isModalOpen ? "overflow-hidden" : "overflow-visible"}`}>
      {/* {imageViewerOpen && <ImageViewer imageSrc={imageSrc} onClose={closeImageViewer} user={ } />} */}
      {/*市の評価*/}
      <SheetModal title={selectedName} isOpen={isModalOpen} onClose={closeModal}>
        {isLoading === false ? (
          <>
            <Tabs tabs={tabs} />
            {selectedTab === "0" ? (
              <div className='p-4'>
                <ReviewPhotoGallery
                  photos={allReviewPhotos} // 空配列ならnoImageが表示される
                  onImageClick={(index: number | null) => {
                    if (index != null) {
                      openImageViewer(index);
                    }
                  }}
                />
                <div className="flex justify-start flex-col">
                  <p className="text-gray-600 text-2xl pb-3 font-bold">
                    {selectedName}
                  </p>
                  <StarsRating rating={averageRating} />
                  {selectedPrefectureId !== null && selectedCityId !== null ? (
                    <PostButton className={'bottom-4 right-4 pt-3'} onClick={function (): void {
                      postButtonClick(selectedPrefectureId!, selectedCityId!);
                    }} />
                  ) : null}
                  <hr className="mt-4" />
                </div>
                <div className="flex justify-center flex-col">
                  <Chart data={mocChartData} />
                  <hr className="mb-4" />
                  {selectedCityId === null ? (
                    <div>
                      <h2 className="text-black text-xl text-center font-bold mb-4">
                        市リスト
                      </h2>
                      <CityList citys={citys} handleButtonClick={hendleCityButtonClick} />
                    </div>
                  ) : null}
                </div>
              </div>
            ) :
              (
                <ReviewList reviewList={reviewList} />
              )}
          </>
        ) : (
          <Loading loadingtext={'読み込み中です。'} />
        )}
      </SheetModal>
      <NavBar title='ホーム' />
      <div className="py-14 p-6 h-full ">
        <div className='pb-14'>
          {regions.map((region, index) => (
            <PrefectureBlock
              key={index}
              region={region.name}
              prefectures={region.prefectures}
              handleButtonClick={handlePrefectureButtonClick}
            />
          ))}
        </div>
      </div>
      <NavigationBottomBar />
      <ImagesModal isOpen={imageViewerOpen} onClose={closeImageViewer} images={allReviewPhotos} selectImageIndex={selectImageIndex} title={selectedName} />
    </div>

  );
};

export default Home;