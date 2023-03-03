import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import img from '../asset/image/comming_soon.jpg'
const NoneEpisode = ({ show, setShow }) => {

    const [open, setOpen] = useState(show)

    useEffect(() => {
        setOpen(show)
    }, [show])

    //console.log(open)

    if (open)
        return (
            <div className='w-screen h-screen fixed left-0 top-0 bg-[rgba(0,0,0,0.8)] z-50 flex items-center justify-center'
                onClick={() => {
                    setOpen(false)
                    setShow(false)
                }}
            >
                <div className='w-[30rem] h-[20rem] bg-white flex justify-between items-center'

                >
                    <img className='h-full' src={img} alt="" />
                    <p className='w-full text-xl font-semibold'>Comming Soon</p>
                </div>
            </div>
        )
    else return ''
}

NoneEpisode.propTypes = {
    show: PropTypes.bool.isRequired,
    setShow: PropTypes.func.isRequired
}

export default NoneEpisode