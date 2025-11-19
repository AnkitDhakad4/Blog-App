import React from 'react'
import { Link } from 'react-router-dom'

function PostCard({ post }) {
  const { _id, title, image } = post
  
  return (
    <Link to={`/post/${_id}`}>
      <div className='w-full bg-gray-100 rounded-xl p-4'> 
        <div className='w-full mb-4'>
          <img 
            src={image} 
            alt={title} 
            className='rounded-xl h-48 w-full object-contain'
          />
        </div>

        <h2 className='font-bold text-red-800'>{title}</h2>
      </div>
    </Link>
  )
}

export default PostCard
