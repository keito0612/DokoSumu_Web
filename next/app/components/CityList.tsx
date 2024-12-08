import { FC } from "react";

interface CityListProps {
  citys: { id: number; name: string }[];
  handleButtonClick: (city: { id: number; name: string }) => void;
}

const CityList: FC<CityListProps> = ({ citys, handleButtonClick }) => {
  return (
    <div className="w-full" >
      <div className="flex justify-center flex-wrap gap-4">

        {
          citys.map((city) => (
            <button
              key={city.id}
              onClick={() => handleButtonClick(city)}
              className="border  bg-green-500 border-white text-white py-2 px-4 rounded-lg hover:bg-green-300 hover:text-gray-200 transition"
            >
              {city.name}
            </button>
          )
          )
        }
      </div>
    </div>
  );
};

export default CityList;
