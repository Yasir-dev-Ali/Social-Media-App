import React from 'react'

const LatestPostScreen = () => {
  return (
      <>
        <div className="max-w-4xl mx-auto px-6 py-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Latest Posts</h2>
            <p className="text-gray-600 mb-4">Stay updated with the latest posts from our community.</p>
            {/* Here you can map through the latest posts and display them */}
            {/* Example: */}
            <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800">Post Title</h3>
            <p className="text-gray-600 mt-2">This is a brief description of the post content.</p>
            <span className="text-sm text-gray-500 mt-4 block">Posted by User on Date</span>
              </div>
              {/* Repeat the above block for each post */}
            <div className="mt-6">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                    Load More Posts
                  </button>
              </div>
          </div>
          
      </>
)
}

export default LatestPostScreen