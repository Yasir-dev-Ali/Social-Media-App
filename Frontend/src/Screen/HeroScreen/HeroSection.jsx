import React from 'react'

const HeroSection = () => {
  return (
    <>
      {/* make it  three card section include the functionaltity about the product and authority  */}
      <div className="flex flex-col md:flex-row items-center justify-between p-6">
        
        
      </div>
      {/* Add three card section for functionality and authority */}
      <div className="flex flex-col md:flex-row justify-around p-6">
        <div className=" bg-blue-100  shadow-lg rounded-lg p-6 m-4 w-full md:w-1/3">
          <h2 className="text-2xl font-semibold mb-2">Functionality</h2>
          <p className="text-gray-700 mb-4">Explore our platform's features designed to enhance your experience and productivity.</p>
          <button className="bg-blue-500 text-black px-4 py-2 rounded hover:bg-blue-600">Learn More</button>
        </div>
        <div className="bg-blue-100 shadow-lg rounded-lg p-6 m-4 w-full md:w-1/3">
          <h2 className="text-2xl font-semibold mb-2">Community</h2>
          <p className="text-gray-700 mb-4">Join a vibrant community of like-minded individuals and share your ideas.</p>
          <button className="bg-blue-500 text-black px-4 py-2 rounded hover:bg-blue-600">Join Now</button>
        </div>
        <div className="bg-blue-100 shadow-lg rounded-lg p-6 m-4 w-full md:w-1/3">
          <h2 className="text-2xl font-semibold mb-2">Authority</h2>
          <p className="text-gray-700 mb-4">Trust in our platform's authority and expertise in the industry.</p>
          <button className="bg-blue-500 text-black px-4 py-2 rounded hover:bg-blue-600">Discover More</button>
        </div>
      </div>


    </>
      
  )
}

export default HeroSection