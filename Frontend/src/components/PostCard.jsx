import React from 'react'
import { Link } from 'react-router-dom'

function PostCard({ post }) {
  const { _id, title, image } = post
  
  return (
    <Link to={`/post/${_id}`}>
  <div className='w-full bg-gray-100 rounded-xl p-4 h-62 flex flex-col'>
    <div className='w-full h-40 mb-4'>
      <img 
        src={image} 
        alt={title} 
        className='rounded-xl w-full h-full object-cover'
      />
    </div>

    <h2 className='font-bold text-red-800 h-12 overflow-hidden'>
      {title}
    </h2>
  </div>
</Link>

  )
}

export default PostCard
