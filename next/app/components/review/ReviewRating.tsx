import { Rating } from "@/types";


interface ReviewRating {
  rating: Rating;
}
export default function ReviewRating(props: ReviewRating) {
  return (

    <div className="flex flex-wrap justify-center gap-4 py-2">
      <div className="w-20 sm:w-24 md:w-28 text-center">
        <span className="text-black text-sm sm:text-base md:text-lg font-bold">治安</span>
        <p className="font-bold text-xs sm:text-sm md:text-base">{props.rating.safety} / 5</p>
      </div>
      <div className="w-20 sm:w-24 md:w-28 text-center">
        <span className="text-black text-sm sm:text-base md:text-lg font-bold">子育て</span>
        <p className="font-bold text-xs sm:text-sm md:text-base">{props.rating.child_rearing} / 5</p>
      </div>
      <div className="w-20 sm:w-24 md:w-28 text-center">
        <span className="text-black text-sm sm:text-base md:text-lg font-bold">制度</span>
        <p className="font-bold text-xs sm:text-sm md:text-base">{props.rating.city_policies} / 5</p>
      </div>
      <div className="w-20 sm:w-24 md:w-28 text-center">
        <span className="text-black text-sm sm:text-base md:text-lg font-bold">交通機関</span>
        <p className="font-bold text-xs sm:text-sm md:text-base">{props.rating.public_transportation} / 5</p>
      </div>
      <div className="w-20 sm:w-24 md:w-28 text-center">
        <span className="text-black text-sm sm:text-base md:text-lg font-bold">住みやすさ</span>
        <p className="font-bold text-xs sm:text-sm md:text-base">{props.rating.livability} / 5</p>
      </div>
    </div>
  );
}