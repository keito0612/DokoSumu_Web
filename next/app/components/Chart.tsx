"use client";

import { ChartData } from '@/types';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from "recharts";

interface ChartProps {
  width?: string;
  height?: string;
  title?: string;
  className?: string;
  data: ChartData[];
}

const Chart: React.FC<ChartProps> = ({ width = "100%", height = "min(65vw, 500px)", title = "", className = "", data }) => {
  return (
    <div className={className} style={{ width: width, height: height }}>
      {
        title !== "" ?
          < div className="w-16 h-8 sm:w-20 sm:h-10 md:w-24 md:h-12 bg-lime-400 text-white rounded-full flex items-center justify-center font-bold text-xs sm:text-sm md:text-base">
            {title}
          </div> : <div></div>
      }
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="name" />
          <PolarRadiusAxis angle={90} domain={[0, 1, 2, 3, 4, 5]} />
          <Radar name="評価" dataKey="score" stroke="#00FB00" fill="#00FB00" fillOpacity={0.6} />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div >
  );
};

export default Chart;