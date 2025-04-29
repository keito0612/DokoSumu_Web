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
        className="border-green-500 border bg-white font-bold text-green-500 px-4 py-1  rounded-3xl shadow hover:text-white hover:bg-green-500"
        onClick={props.onClick}
      >
        <div className='flex flex-row justify-start items-center m-0'>
          <MaterialSymbolsLightContractEditSharp className='pr-1 size-7' />
          <span>レビューを投稿</span>
        </div>
      </button>
    </div>
  )
}

export default PostButton