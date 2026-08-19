import React from 'react'

const Spinner = ({size = 24}) => {
  return (
    <div
    className='animation-spin rounded-full border-2 border-green-200 border-t-green-700'
    style={{width: size, height:size}}
    />
  )
}

export default Spinner
