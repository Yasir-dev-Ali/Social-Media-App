import React from 'react'

const HomeScreen = () => {
  return (
      <>
          <div className="flex flex-col items-center justify-center h-screen">
              <h1 className="text-4xl font-bold mb-4">Welcome to the Home Screen</h1>
              <p className="text-lg mb-8">This is the main page of our application.</p>
                <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
                  Get Started
              </button>
              
              </div>
      </>
  )
}

export default HomeScreen