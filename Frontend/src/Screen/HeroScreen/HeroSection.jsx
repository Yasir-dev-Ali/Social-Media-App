import React from 'react'

const HeroSection = () => {
  return (
      <>
        <div className="flex flex-col md:flex-row items-center justify-between p-6">
            <div className="md:w-1/2">
            <h1 className="text-4xl font-bold mb-4">Welcome to Our Platform</h1>
            <p className="text-lg mb-6">
                Discover amazing content and connect with others. Join us to share your thoughts, ideas, and creativity with a vibrant community.
                Whether you're a creator, a thinker, or just someone who loves to explore, there's something for everyone here. Dive in and start your journey with us today!
            </p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Get Started
            </button>
            </div>
            <div className="md:w-1/2 flex justify-center items-center">
            <img 
                src="https://media.istockphoto.com/id/1457066641/vector/social-media-network-concept-3d-icons-flying-over-smartphone-on-hand-drawn-sketch-doodle.jpg?s=612x612&w=0&k=20&c=q48kGCbGSq_jNo7-HNfxTXbyG-m2PH0G433djSstBJA=" 
                alt="Social Media Illustration" 
                className="w-full h-auto shadow-lg rounded-full md:w-3/4 mx-auto md:mx-0"
            />
              </div>
        </div>
        <div className="bg-gray-100 p-6 mt-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">Join Our
Community</h2>
              <p className="text-lg mb-4">
                Connect with like-minded individuals, share your ideas, and be part of a growing community. 
                  Whether you're looking to collaborate, learn, or simply share your passion, our platform is the perfect place for you.
              </p>
                <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                  Join Now
              </button>
        </div>
        <div className="bg-gray-200 p-6 mt-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">Stay Updated
              </h2>
                <p className="text-lg mb-4">
                    Subscribe to our newsletter to get the latest updates, tips, and exclusive content delivered straight to your inbox.
                  Don't miss out on any of the exciting things happening in our community!
              </p>
                <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
                  Subscribe
              </button>
          </div>
        <div className="bg-blue-100 p-6 mt-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">Explore Our Features</h2>
                <p className="text-lg mb-4">
                    Discover a wide range of features designed to enhance your experience. From content creation tools to community engagement options, we have everything you need to make the most of your time here.
                </p>
                <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
                    Explore Features
              </button>
        </div>
          <div className="bg-red-100 p-6 mt-6 rounded-lg shadow
-lg">
                <h2 className="text-2xl font-semibold mb-4">Get Support</h2>
                <p className="text-lg mb-4">
                    Need help or have questions? Our support team is here to assist you. Reach out to us anytime, and we'll be happy to help you with any issues or inquiries you may have.
                </p>
                <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
                    Contact Support
              </button>
          </div>
        <div className="bg-green-100 p-6 mt-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4">Share Your Feedback</h2>
                    <p className="text-lg mb-4">
                        We value your input! Share your feedback and suggestions to help us improve our platform. Your voice matters, and we are committed to making this community better for everyone.
                    </p>
                    <button className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600">
                        Share Feedback
              </button>
          </div>
        <div className="bg-gray-300 p-6 mt-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4">Follow Us on Social Media</h2>
                    <p className="text-lg mb-4">
                        Stay connected with us on social media for the latest updates, community highlights, and more. Follow us to be part of our journey and engage with our content.
                    </p>
                    <button className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600">
                        Follow Us
              </button>
          </div>
        <div className="bg-gray-400 p-6 mt-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-semibold mb-4">Join Our Events</h2>
                        <p className="text-lg mb-4">
                            Participate in our upcoming events, webinars, and workshops. Connect with experts, learn new skills, and network with fellow community members.
                        </p>
                        <button className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600">
                            Join Events
              </button>
        </div>
      </>
  )
}

export default HeroSection