import React from 'react'

const HomePage = () => {
  return (
    <div 
      className="bg-dark-gray h-screen flex justify-center items-center"
    >
      <div className='text-white font-semibold flex gap-4 items-center'>
        <div>
          <p className='text-7xl pb-4'>:(</p>
        </div>
        <div className='text-center'>
          <p className='text-4xl'>404</p>
          <p>Page Not Found</p>
        </div>
      </div>
    </div>
  )
}

export default HomePage