
import HeroSection from '../HeroScreen/HeroSection'
import LatestPostScreen from '../LatestPostScreen/LatestPostScreen'

const HomeScreen = () => {
  return (
      <>
      {/* two div make one side image and one side text one title and p tage and buttone */}
      <div className="flex flex-col md:flex-row items-center justify-between p-6">
        <div className="md:w-1/2">
          <h1 className="text-4xl font-bold mb-4">Welcome to Our Platform</h1>
          <p className="text-lg mb-6">Discover amazing content and connect with others.
            Join us to share your thoughts, ideas, and creativity with a vibrant community.
            Whether you're a creator, a thinker, or just someone who loves to explore, there's something
            for everyone here. Dive in and start your journey with us today!

          </p>
          <button className="bg-blue-500 text-black px-4 py-2 rounded hover:bg-blue-600">
            Get Started
          </button>
        </div>
        <div className="md:w-1/2 flex justify-center items-center ">
          {/* add image randome but related socail media svg */}
          <img 
            src="https://media.istockphoto.com/id/1457066641/vector/social-media-network-concept-3d-icons-flying-over-smartphone-on-hand-drawn-sketch-doodle.jpg?s=612x612&w=0&k=20&c=q48kGCbGSq_jNo7-HNfxTXbyG-m2PH0G433djSstBJA=" 
            alt="Social Media Illustration" 
            className="w-full h-auto  shadow-lg rounded-full   md:w-3/4 mx-auto md:mx-0"
          />

        </div>
      </div>
      <HeroSection />
      <LatestPostScreen />
      </>
  )
}

export default HomeScreen