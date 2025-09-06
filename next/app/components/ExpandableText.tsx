"use client";

import { useState } from 'react';

// Propsの型を定義
interface ExpandableTextProps {
  text: string;
  maxLength: number;
}

const ExpandableText: React.FC<ExpandableTextProps> = ({ text, maxLength }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const isFullText = maxLength <= text?.length;

  // ボタンと一緒にするため、テキストから「...」を削除
  const truncatedText = text?.slice(0, maxLength);
  const displayText = isExpanded ? text : truncatedText;

  return (
    <div>
      {/* テキストとボタンをインラインで配置 */}
      <span>{displayText}</span>

      {isFullText && (
        <>
          {/* テキストが途中の場合にのみ「...」を表示 */}
          {!isExpanded && <span>...</span>}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            // ボタンのスタイルを調整し、テキストと一体化させる
            className="text-green-500 hover:text-green-700 font-medium "
          >
            {isExpanded ? '戻す' : '続きを見る'}
          </button>
        </>
      )}
    </div>
  );
};

export default ExpandableText;