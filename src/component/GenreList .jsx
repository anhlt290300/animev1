import React from 'react'
import { useState } from 'react'
import PropTypes from 'prop-types'

export const GenreListData = [
    'action',
    'adventure',
    'cars',
    'comedy',
    'crime',
    'dementia',
    'demons',
    'drama',
    'dub',
    'ecchi',
    'family',
    'fantasy',
    'game',
    'gourmet',
    'harem',
    'historical',
    'horror',
    'josei',
    'kids',
    'magic',
    'martial-arts',
    'mecha',
    'military',
    'mystery',
    'parody',
    'police',
    'psychological',
    'romance',
    'samurai',
    'school',
    'sci-fi',
    'seinen',
    'shoujo',
    'shoujo-ai',
    'shounen',
    'shounen-ai',
    'space',
    'sports',
    'super-power',
    'supernatural',
    'suspense',
    'thriller',
    'vampire',
    'yaoi',
    'yuri',
]

const GenreList = ({ setGenre_ }) => {

    const [genre, setGenre] = useState('action')

    return (
        <div className='text-white' >
            {
                GenreListData.map((item, index) => {
                    return (
                        <div className={(item !== genre) ?
                            'inline-block mr-4 border-b-[1px] border-gray-700 cursor-pointer font-semibold hover:border-red-700 hover:text-red-700' :
                            'inline-block mr-4 border-b-[1px] border-red-700 text-red-700 cursor-pointer font-semibold'}
                            key={index}
                            onClick={() => {
                                setGenre(item)
                                setGenre_(item)
                            }}
                        >{item}</div>
                    )
                })
            }
        </div>
    )

}

GenreList.propTypes = {
    setGenre_: PropTypes.func.isRequired
}


export default GenreList 