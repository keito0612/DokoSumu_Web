import { Rating } from "react-simple-star-rating";

interface StarsRatingsProps {
  rating: number;
  size?: number;
  isScore?: boolean;
}

const StarsRatings: React.FC<StarsRatingsProps> = ({ rating, size = 35, isScore = true }: StarsRatingsProps) => {
  return (
    <>
      <div className="flex justify-start ">
        <Rating
          emptyStyle={{ display: "flex" }}
          className="auto"
          fillStyle={{ display: "-webkit-inline-box" }}
          initialValue={rating}
          transition
          size={size}
          allowFraction
          allowHover={false}
          readonly={true}
          allowTitleTag={false}
        />
        {isScore && <span className="text-4xl pl-3 text-black">{rating} / 5</span>}
      </div>
    </>
  );
};

export default StarsRatings;