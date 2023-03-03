import React from 'react'
import gifIsloading from '../asset/image/isload2.gif'
const IsLoad = () => {
  return (
    <div className='h-[15rem] mobile:h-[20rem] tablet:h-[30rem] w-full flex justify-center items-center'>
        <img src={gifIsloading} className='tablet:w-1/3 mobile:w-1/2 w-1/2' />
        <h1 className='text-white ml-12 mobile:ml-20 text-2xl mobile:text-[2rem] tablet:text-[3rem]'>Is Loading ...</h1>
    </div>
  )
}

export default IsLoad