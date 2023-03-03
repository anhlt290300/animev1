import React, { useEffect, useState } from 'react'
import GenreList from '../component/GenreList '
import ListCards from '../component/ListCards'
const Home = () => {

  const [genre, setGenre] = useState('action')

  const set = (item) => {
    setGenre(item)
  }

  useEffect(() => console.log(genre), [genre])

  return (
    <div className=''>

      <GenreList setGenre_={set} />

      <ListCards genre={genre} />

    </div>
  )
}

export default Home