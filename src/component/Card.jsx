import React from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

const Card = ({ animeTitle, animeId, animeImg }) => {

    const navigate = useNavigate()

    const ChangePath = (path) => {
        navigate(`/${path}/full`)
    }

    return (
        <div className=' bg-black flex items-center justify-center h-full cursor-pointer relative overflow-hidden after:absolute after:left-4 after:top-4  after:tablet:w-20 after:tablet:h-20 after:mobile:w-12 after:mobile:h-12 after:w-16 after:h-16
              after:transition-all after:duration-300 after:ease-in after:rounded-full after:bg-[rgba(0,0,0,0)]  hover:after:bg-[rgba(0,0,0,0.5)] hover:after:shadow-lightRounder 
              before:w-0 before:h-0 before:absolute 
              before:tablet:left-12 before:tablet:top-10   before:mobile:left-9 before:mobile:top-8   before:left-10 before:top-9
              hover:before:desktop:border-l-[1.5rem] hover:before:tablet:border-[1rem] hover:before:tablet:border-l-[1.3rem] hover:before:tablet:border-r-0 hover:before:mobile:border-[0.5rem] hover:before:mobile:border-l-[1rem] hover:before:mobile:border-r-0 hover:before:border-[0.8rem] hover:before:border-l-[1.3rem] hover:before:border-r-0
              before:border-solid before:border-b-transparent before:border-t-transparent before:border-l-white before:z-10
              '
            onClick={()=>ChangePath(animeId)}
        >
            <img
                className='w-full transition-all bg-cover duration-300 ease-out hover:scale-110'
                src={animeImg} alt="" />
            <div className='absolute bottom-4 left-4 text-white font-semibold text-base mobile-L:text-xs desktop-L:text-2xl desktop:text-lg tablet:text-base max-h-20 overflow-y-hidden'>
                <p className=''>{animeTitle}</p>
            </div>
        </div>
    )
}

Card.propTypes = {
    animeImg: PropTypes.string.isRequired,
    animeTitle: PropTypes.string.isRequired,
    animeId: PropTypes.string.isRequired
}

export default Card