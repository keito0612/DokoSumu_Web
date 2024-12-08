"use client"
import { ChartData } from '@/types';
import * as React from 'react';
import {
  Radar, RadarChart, PolarGrid, Legend,
  PolarAngleAxis, PolarRadiusAxis,
} from 'recharts';




interface ChartProps {
  widht: number;
  height: number;
  cx: number;
  cy: number;
  outerRadius: number;
  data: ChartData[];
}

// Chartコンポーネントの定義
export default class Chart extends React.Component<ChartProps> {
  render() {
    return (
      <RadarChart  // レーダーチャート全体の設定を記述
        width={this.props.widht}  // レーダーチャートが記載される幅(この幅よりチャートが大きい場合、はみ出た箇所は表示されない)
        height={this.props.height}   // レーダーチャートが記載される高さ
        cx={this.props.cx}  // 描画枠の左端とチャートの中心点との距離(0にするとチャートの左半分が隠れる。width全体が500だから250だと中心になる)
        cy={this.props.cy}  // 描画枠の上部とチャートの中心点との距離(0にするとチャートの上半分が隠れる。hight全体が500だから250だと中心になる)
        outerRadius={this.props.outerRadius}  // レーダーチャート全体の大きさ  
        data={this.props.data}  // 表示対象のデータ
      >
        {/* レーダーチャートの蜘蛛の巣のような線 */}
        <PolarGrid />

        {/* 軸を決める項目(サンプルでいう数学や歴史) */}
        <PolarAngleAxis dataKey="name" />

        {/* 目安となる数値が表示される線を指定  */}
        <PolarRadiusAxis
          angle={90}  // 中心点から水平を0°とした時の角度 垂直にしたいなら90を指定
          domain={[0, 5]}  // リストの１番目の要素が最小値、2番目の要素が最大値
        />

        {/* レーダーを表示 */}
        <Radar
          name="評価"  // そのチャートが誰のデータか指定(チャート下にここで指定した値が表示される)
          dataKey="score"   // 表示する値と対応するdata内のキー
          stroke="#00FB00"  // レーダーの外枠の色
          fill="#00FB00"  // レーダー内の色
          fillOpacity={0.6}  // レーダー内の色の濃さ(1にすると濃さMAX)
        />
        <Legend />
      </RadarChart>
    );
  }
}