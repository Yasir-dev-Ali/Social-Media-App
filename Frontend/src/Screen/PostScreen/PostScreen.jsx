import React,{useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { fetchPosts,createPost } from "../../store/action/post/index.js"
import { useSelector } from 'react-redux'
import PostList from '../../components/PostList/PostList.jsx'
const PostScreen = () => {
  const dispatch = useDispatch()
  const { posts, loading, error } = useSelector((state) => state.postReducer)
  const [postData, setPostData] = React.useState({
    creator: '',
    title: '',
    content: '',
    image: '',
    tags: '', // Add this
  });
  

  console.log("Posts:", posts); // Debugging line
  
  
  

  
  useEffect(() => {
    dispatch(fetchPosts())

  }, [dispatch])
 
  // console.log("Posts:", posts); // Debugging line

  
  if (loading) {
    return <div className="text-center mt-6">Loading posts...</div>
  }

  if (error) {
    return <div className="text-center mt-6 text-red-500">Error: {error}</div>
  }
  

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedTags = postData.tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag); // Remove empty strings

    dispatch(createPost({ ...postData, tags: formattedTags }));

    setPostData({
      creator: '',
      title: '',
      content: '',
      image: '',
      tags: '', // string for input field
    });

    // No need to refetch posts if reducer already updates the state
    // dispatch(fetchPosts());
  };

  // console.log("Posts:", posts); // Debugging line


  
  return (
    <>
      <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg mt-6">
        <h2 className="text-xl font-semibold mb-4">Create a New Post</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="creator">Creator</label>
            <input
              type="text"
              id="creator"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              placeholder="Enter creator name"
              value={postData.creator} // Assuming you want to set the creator, you can change this as needed
              onChange={(e) => setPostData({ ...postData, creator: e.target.value })} // Update state on change
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              placeholder="Enter post title"
              value={postData.title}
              onChange={(e) => setPostData({ ...postData, title: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="content">Content</label>
            <textarea
              id="content"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              placeholder="Enter post content"
              value={postData.content}
              onChange={(e) => setPostData({ ...postData, content: e.target.value })}
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="image">Image URL</label>
            <input
              type="text"
              id="image"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              placeholder="Enter image URL"
              value={postData.image}
              onChange={(e) => setPostData({ ...postData, image: e.target.value })}
            />
          </div>
          {/* tages */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="tags">Tags (comma separated)</label>
            <input
              type="text"
              id="tags"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              placeholder="Enter tags"
              value={postData.tags} // Assuming you want to set the tags, you can change this as needed
              onChange={(e) => setPostData({ ...postData, tags: e.target.value })} // Update state on change
            />
          </div>

          <button
            onClick={handleSubmit}
            type="submit"
            className="px-4 py-2 bg-blue-600 text-black rounded hover:bg-blue-700 transition-colors"
          >
            Create Post
          </button>
        </form>
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Recent Posts</h2>
          {/* {posts && posts.length > 0 ? (
            <ul className="space-y-4">
              {posts.map((post) => (
                <li key={post._id} className="p-4 bg-gray-100 rounded shadow">
                  <h3 className="text-lg font-semibold">{post.title}</h3>
                  <p className="text-gray-700">{post.content}</p>
                  <p className="text-gray-500">By: {post.creator}</p>
                  <p className="text-gray-500">Tags: {post.tags ? post.tags.join(', ') : 'No tags'}</p>

                  {post.image && <img src={post.image} alt={post.title} className="mt-2 w-full h-auto rounded" />}
                </li>
              ))}
            </ul>
          ) : (
            <p>No posts available.</p>
          )} */}
          {posts && posts.length > 0 ? (
            <ul className="space-y-4">
              {posts.map((post) => (
                <li key={post._id} className="p-4 bg-gray-100 rounded shadow">
                  <h3 className="text-lg font-semibold">{post.title}</h3>
                  <p className="text-gray-700">{post.content}</p>
                  <p className="text-gray-500">By: {post.creator}</p>
                  <p className="text-gray-500">Tags: {post.tags ? post.tags.join(', ') : 'No tags'}</p>
                  {post.image && <img src={post.image} alt={post.title} className="mt-2 w-full h-auto rounded" />}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No posts available.</p>
          )}






          
        </div>
      </div>
    </>
  )
}

export default PostScreen