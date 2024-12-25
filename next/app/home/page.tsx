"use client"
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic'
import NavBar from '../components/NavBar';
import NavigationBottomBar from '../components/NavigationBottomBar';
import SheetModal from '../components/SheetModal';
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import StarsRating from '../components/StarsRating';
import { ChartData } from '@/types';
import CityList from '../components/CityList';

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
  const router = useRouter();
  const cityId = new URLSearchParams().get("cityId");


  const addQueryPrefectureIdParameter = (prefectureId: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set('prefecture', prefectureId);
    router.push(url.toString());
  };

  const addQueryCityIdParameter = (cityId: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set('cityId', cityId);
    router.push(url.toString());
  }

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

  ]
  const deleteQueryParameter = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete('prefecture');
    router.push(url.toString());
  };

  const closeModal = () => {
    deleteQueryParameter();
    setIsModalOpen(false)
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
        { id: 43, name: "大分県" },
        { id: 44, name: "熊本県" },
        { id: 45, name: "宮崎県" },
        { id: 46, name: "鹿児島県" },
        { id: 47, name: "沖縄県" }
      ]
    }
  ];

  const handlePrefectureButtonClick = (prefecture: { id: number; name: string }) => {
    setIsModalOpen(true);
    addQueryPrefectureIdParameter(prefecture.id.toString());
    setSelectedName(prefecture.name);
  };

  const hendleCityButtonClick = (city: { id: number; name: string }) => {
    setIsModalOpen(true);
    addQueryCityIdParameter(city.id.toString());
    setSelectedName(city.name);
  }

  useEffect(() => {

  }, []);

  return (
    <div className={`Home h-screen ${isModalOpen ? "overflow-hidden" : "overflow-visible"}`}>
      {/*市の評価*/}
      <SheetModal title={selectedName} isOpen={isModalOpen} onClose={closeModal}>
        <Image
          src="/images/noImage.png"
          alt="画像がありません"
          width={650}
          height={400}
        />
        <div className="flex justify-start flex-col">
          <p className="text-gray-600 text-2xl pb-3 font-bold ">
            {selectedName}
          </p>
          <StarsRating rating={5.0} />
          <hr className='mt-4'></hr>
        </div>
        <div className="flex justify-center flex-col">
          <Chart widht={380} height={380} cx={190} cy={190} outerRadius={120} data={mocChartData} />
          <hr className='mb-4'></hr>
          {cityId !== null ?
            <div>
              <h2 className="text-black text-xl   text-center   font-bold mb-4">市リスト</h2>
              <CityList citys={[]} handleButtonClick={hendleCityButtonClick} />
            </div>
            : <div></div>
          }
        </div>
      </SheetModal>

      <NavBar />
      <div className="py-14 p-6 mb-9 h-full ">
        {regions.map((region, index) => (
          <PrefectureBlock
            key={index}
            region={region.name}
            prefectures={region.prefectures}
            handleButtonClick={handlePrefectureButtonClick}
          />
        ))}
      </div>
      <NavigationBottomBar />
    </div>

  );
};

export default Home;