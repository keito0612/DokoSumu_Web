import React from 'react'
import MaterialSymbolsLightContractEditSharp from './icons/MaterialSymbolsLightEditOutlineSharp';


interface PostButtonProps {
  className: string;
  onClick: () => void;
}


const PostButton = (props: PostButtonProps) => {
  return (
    <div className={props.className}>
      <button
        className="bg-green-500 text-white font-semibold px-5 py-2.5 rounded-xl shadow-sm hover:bg-green-600 hover:shadow-md active:scale-[0.98] transition-all duration-200"
        onClick={props.onClick}
      >
        <div className='flex flex-row justify-center items-center gap-2'>
          <MaterialSymbolsLightContractEditSharp className='size-5' />
          <span>レビューを投稿</span>
        </div>
      </button>
    </div>
  )
}

export default PostButton