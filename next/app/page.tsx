"use client"
import { LocalStorageServise } from '@/service/localStorageServise';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BsFileEarmarkText, BsStar, BsCamera } from "react-icons/bs";
// 背景画像のURLを任意の画像に置き換えてください
const backgroundImage = '/images/big-photo0000-0705.jpg';

// --- Hero Section ---

interface HeroSectionProps {
  onClick: () => void;
}
const HeroSection = ({ onClick }: HeroSectionProps) => (
  <div className="relative h-[60vh] md:h-[70vh] w-full text-white">
    {/* Background Image */}
    <Image
      src={backgroundImage}
      alt="都市の風景"
      layout="fill"
      objectFit="cover"
      quality={100}
      className="absolute inset-0 z-0"
    />

    {/* Gradient Overlay */}
    <div className="absolute inset-0 z-10 bg-gradient-to-t from-emerald-600 to-green-500 opacity-70"></div>

    {/* Content */}
    <div className="relative z-20 flex flex-col items-center justify-center h-full px-4 text-center">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg">
        プレリビで、<br />あなたにぴったりの街を見つけよう。
      </h1>
      <p className="text-sm md:text-base lg:text-lg mb-8 max-w-xl drop-shadow-lg">
        各都道府県市の街の雰囲気や状況、良い点と悪い点をしり、<br />あなたの次の住まいを見つけましょう！。
      </p>
      <button className="bg-white text-emerald-600 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition-colors" onClick={onClick} >
        アプリを見る
      </button>
    </div>
  </div>
);

// --- Feature Section ---
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md text-center">
    <div className="text-4xl text-emerald-600 mb-4">{icon}</div>
    <h3 className="text-lg font-bold mb-2 text-gray-800">{title}</h3>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);

const FeaturesSection = () => (
  <div className="container mx-auto py-16 px-4">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">プレリビの主な機能</h2>
      <p className="text-base text-gray-600">
        移住や引越しの意思決定をサポートする、様々な情報を提供します。
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
      <FeatureCard
        icon={<BsFileEarmarkText />}
        title="レビュー作成機能"
        description="実際に住んでいる人、住んでいた人のリアルな声。良い点も悪い点も包み隠さず共有できます。"
      />
      <FeatureCard
        icon={<BsStar />}
        title="5段階評価"
        description="治安、子育て、公共交通機関、住みやすさなどを直感的に把握できる5段階評価システムです。"
      />
      <FeatureCard
        icon={<BsCamera />}
        title="写真投稿"
        description="街の雰囲気を視覚的に伝える写真。テキストだけでは伝わらない魅力を発見できます。"
      />
    </div>
  </div>
);


interface CallToActionSectionProps {
  imageSrc: string;
  imageAlt: string;
  heading: string;
  body: string;
}

// --- CTA Section ---
const CallToActionSection = ({ imageSrc, imageAlt, heading, body }: CallToActionSectionProps) => (
  <div className="container mx-auto py-8 lg:py-8 px-4">
    <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
      {/* Placeholder box */}
      <div className="relative w-full max-w-xs h-64 bg-white   overflow-hidden flex items-center justify-center">
        {/* Placeholder for an image or animation */}
        {/* Next.jsのImageコンポーネントを使用 */}
        <Image
          src={imageSrc}
          alt={imageAlt}
          layout="fill" // 親要素いっぱいに表示
          objectFit="cover" // 画像のアスペクト比を維持しつつ、コンテナを埋める
          className="rounded-lg" // 必要に応じて角丸を適用
        />

      </div>

      {/* Text and Button */}
      <div className="flex flex-col text-center max-w-lg md:text-left">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
          {heading}
        </h2>
        <p className="text-base text-gray-600 mb-8">
          {body}
        </p>
      </div>
    </div>
  </div>
);

// --- Main Page Component ---
export default function Main() {
  const personInvestigatingImageSrc = '/images/10223.png';
  const pinGreenImageSrc = '/images/pin_icon_green.png'
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstTime, setIsFirstTime] = useState(false);

  useEffect(() => {
    const visited = LocalStorageServise.getStorage('is_first_time');
    if (visited !== null) {
      // 初めてではない場合、homeページにリダイレクト
      router.replace('/home');
    } else {
      // 初めての場合、フラグをセットしてMainページを表示
      LocalStorageServise.setStorage('is_first_time', '1');
      setIsFirstTime(true);
      setIsLoading(false);
    }
  }, [router]);

  // ローディング中またはリダイレクト中は何も表示しない
  if (isLoading && !isFirstTime) {
    return null;
  }

  return (
    <div className="bg-gray-50 font-sans antialiased">
      <HeroSection onClick={function (): void {
        router.push('/home');
      }} />
      <FeaturesSection />
      <div className="bg-white">
        <CallToActionSection imageSrc={personInvestigatingImageSrc}
          imageAlt={'１個目のセッションの画像。'}
          heading={'あなたの投稿で移住をする人の手助けになります。'}
          body={'あなたが投稿した情報が、移住を考えている誰かの役に立ち、その地域がもっと盛り上がるきっかけになります。ぜひ、あなたの住む地域の魅力をレビューとして教えてくれませんか？'}
        />
        <CallToActionSection imageSrc={pinGreenImageSrc}
          imageAlt={'２個目のセッションの画像。'}
          heading={'あなたの理想の暮らしを \n プレリビで見つけよう。'}
          body={' プレリビは、ユーザーが各都道府県の都市の雰囲気、状況、長所と短所を理解し、居住地を決定するのに役立つ情報源となることを目指しています。'}
        />
      </div>
    </div>
  );
}
