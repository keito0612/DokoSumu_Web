"use client";
import React from "react";
import ContentLoader from "react-content-loader";

const ProfileSkeleton: React.FC = () => {
  return (
    <div className="sm:px-4 flex justify-start py-1 pt-5 pb-24">
      <div className="max-w-[960px] w-full flex flex-col gap-4">
        {/* ユーザーアイコンとボタン */}
        <div className="flex flex-row justify-between items-start gap-4">
          <ContentLoader
            speed={2}
            width={100}
            height={100}
            viewBox="0 0 100 100"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            key="user-icon" // unique keyを追加
          >
            <circle cx="50" cy="50" r="50" />
          </ContentLoader>

          <div className="sm:ml-auto flex flex-col justify-end h-full">
            <ContentLoader
              speed={2}
              width={160}
              height={40}
              viewBox="0 0 160 40"
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
              key="action-button" // unique keyを追加
            >
              <rect x="0" y="0" rx="20" ry="20" width="160" height="40" />
            </ContentLoader>
          </div>
        </div>

        {/* 名前 */}
        <ContentLoader
          speed={2}
          height={10}
          viewBox="0 0 400 10"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
          style={{ width: "100%", height: "auto" }}
          key="name" // unique keyを追加
        >
          <rect x="0" y="0" rx="4" ry="4" width="200" height="10" />
        </ContentLoader>

        {/* 詳細情報 */}
        <ContentLoader
          speed={2}
          height={10}
          viewBox="0 0 400 10"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
          style={{ width: "100%", height: "auto" }}
          key="details" // unique keyを追加
        >
          <rect x="0" y="0" rx="4" ry="4" width="80" height="10" />
          <rect x="90" y="0" rx="4" ry="4" width="300" height="10" />
        </ContentLoader>

        {/* 小カード2つ */}
        <div className="flex flex-row gap-6">
          {[1, 2].map((i) => (
            <ContentLoader
              key={`card-${i}`} // unique keyを追加
              height={240}
              viewBox="0 0 400 240"
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
              style={{ width: "100%", height: "auto" }}
              className="w-1/2"
            >
              <rect x="0" y="0" rx="20" ry="20" width="400" height="200" />
            </ContentLoader>
          ))}
        </div>

        {/* 投稿した数といいね数 */}
        <div className="flex flex-row gap-6">
          {[1, 2].map((i) => (
            <ContentLoader
              key={`stats-${i}`} // unique keyを追加
              height={60}
              viewBox="0 0 200 60"
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
              style={{ width: "30%", height: "auto" }}
            >
              <rect x="0" y="0" rx="10" ry="10" width="200" height="60" />
            </ContentLoader>
          ))}
        </div>

        {/* リスト */}
        <ContentLoader
          speed={2}
          height={90}
          viewBox="0 0 400 90"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
          style={{ width: "100%", height: "auto" }}
          key="list" // unique keyを追加
        >
          <rect x="0" y="0" rx="4" ry="4" width="400" height="90" />
        </ContentLoader>
      </div>
    </div>
  );
};

export default ProfileSkeleton;