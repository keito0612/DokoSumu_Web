import { Rating } from "react-simple-star-rating";

interface StarsRatingsProps {
  rating: number;
}

const StarsRatings: React.FC<StarsRatingsProps> = (props: StarsRatingsProps) => {
  return (
    <>
      <div className="flex justify-start ">
        <Rating
          emptyStyle={{ display: "flex" }}
          className="auto"
          fillStyle={{ display: "-webkit-inline-box" }}
          initialValue={props.rating}
          transition
          size={35}
          allowFraction
          allowHover={false}
          readonly={true}
          allowTitleTag={false}
        />
        <span className="text-4xl pl-3 text-black">
          {props.rating}/5.0
        </span>
      </div>
    </>
  );
};

export default StarsRatings;