import { User } from "@/types";
import Image from "next/image";
import MaterialSymbolsLightPersonOutlineRounded from "../icons/MaterialSymbolsLightPersonOutlineRounded";

interface ReviewHeaderProps {
  user: User
};
export default function ReviewHeader({ user }: ReviewHeaderProps) {
  return (
    <div className="flex items-center space-x-3">
      {(user.imagePath == null ?
        <MaterialSymbolsLightPersonOutlineRounded width={40} height={40} className="rounded-full border-2  text-green-500 border-green-500" /> :
        <Image src={user.imagePath} alt="プロフィール写真" width={40} height={40} className="rounded-full" />
      )}
      <div>
        <div className="font-semibold text-black" >{user?.name}</div>
      </div>
    </div>
  );
}