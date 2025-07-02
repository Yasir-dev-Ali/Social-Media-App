// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { TextField, Button, Avatar } from '@mui/material';
// import { message } from 'antd';
// import { UserOutlined } from '@ant-design/icons';
// import { createPost, fetchPosts } from '../../features/post/postSlice.js';


// const PostScreen = () => {
//   const dispatch = useDispatch();
//   // const { posts, loading, error } = useSelector((state) => state.postReducer);
//   const posts = useSelector((state) => state.posts.posts);
//   const loading = useSelector((state) => state.posts.loading);
//   const error = useSelector((state) => state.posts.error);

//   const [postData, setPostData] = useState({
//     creator: '',
//     title: '',
//     content: '',
//     image: '',
//     tags: '',
//   });

//   const handleChange = (e) =>
//     setPostData({ ...postData, [e.target.name]: e.target.value });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const tagsArray = postData.tags
//       .split(',')
//       .map((tag) => tag.trim())
//       .filter(Boolean);

//     dispatch(createPost({ ...postData, tags: tagsArray }))
//       .then((res) => {
//         message.success('Post created successfully');
//         setPostData({ creator: '', title: '', content: '', image: '', tags: '' });
//         dispatch(fetchPosts());
//       })
//       .catch(() => {
//         message.error('Failed to create post');
//       });
//   };

//   useEffect(() => {
//     dispatch(fetchPosts());
//   }, [dispatch]);

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       {/* Create Post Form */}
//       <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 mb-10">
//         <h2 className="text-3xl font-bold text-gray-800 mb-6">📝 Create New Post</h2>
//         <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
//           {['creator', 'title', 'tags'].map((field) => (
//             <TextField
//               key={field}
//               label={field === 'tags' ? 'Tags (comma separated)' : field}
//               name={field}
//               value={postData[field]}
//               onChange={handleChange}
//               fullWidth
//               required
//               variant="outlined"
//             />
//           ))}

//           <TextField
//             label="Image URL"
//             name="image"
//             value={postData.image}
//             onChange={handleChange}
//             fullWidth
//             variant="outlined"
//             className="md:col-span-2"
//           />

//           <TextField
//             label="Content"
//             name="content"
//             value={postData.content}
//             onChange={handleChange}
//             fullWidth
//             multiline
//             rows={4}
//             variant="outlined"
//             className="md:col-span-2"
//             required
//           />

//           <div className="md:col-span-2 flex justify-end">
//             <Button
//               type="submit"
//               variant="contained"
//               color="primary"
//               className="!bg-indigo-600 hover:!bg-indigo-700"
//             >
//               🚀 Publish
//             </Button>
//           </div>
//         </form>
//       </div>

//       {/* Post List */}
//       <div>
//         <h2 className="text-2xl font-bold text-gray-700 mb-4">📬 Recent Posts</h2>
//         {loading ? (
//           <p className="text-gray-500">Loading...</p>
//         ) : error ? (
//           <p className="text-red-500">Error: {error}</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {posts?.map((post) => (
//               <div key={post._id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
//                 {post.image && (
//                   <img
//                     src={post.image}
//                     alt={post.title}
//                     className="w-full h-48 object-cover"
//                   />
//                 )}
//                 <div className="p-5">
//                   <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>
//                   <p className="text-sm text-gray-600 mt-1">{post.content.slice(0, 100)}...</p>
//                   <div className="flex items-center mt-4 space-x-3">
//                     <Avatar src="" icon={<UserOutlined />} />
//                     <div className="text-sm text-gray-500">
//                       By <span className="font-medium text-gray-700">{post.creator}</span>
//                     </div>
//                   </div>
//                   <div className="text-xs text-gray-400 mt-2">
//                     Tags: {post.tags?.join(', ') || 'No tags'}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PostScreen;


import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Avatar } from '@mui/material';
import { message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { createPost, fetchUserPosts } from '../../features/post/postSlice.js';

const PostScreen = () => {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts.posts);
  const loading = useSelector((state) => state.posts.loading);
  const error = useSelector((state) => state.posts.error);
  const user = useSelector((state) => state.auth.user);

  const [postData, setPostData] = useState({
    title: '',
    content: '',
    image: '',
    tags: '',
  });

  const handleChange = (e) =>
    setPostData({ ...postData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    const tagsArray = postData.tags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);

    dispatch(
      createPost({
        ...postData,
        tags: tagsArray,
        creator: user?._id,
      })
    )
      .then(() => {
        message.success('Post created successfully');
        setPostData({ title: '', content: '', image: '', tags: '' });
        dispatch(fetchUserPosts());
      })
      .catch(() => {
        message.error('Failed to create post');
      });
  };

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchUserPosts());
    }
  }, [dispatch, user]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Create Post Form */}
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 mb-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">📝 Create New Post</h2>
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
          {['title', 'tags'].map((field) => (
            <TextField
              key={field}
              label={field === 'tags' ? 'Tags (comma separated)' : field}
              name={field}
              value={postData[field]}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
            />
          ))}

          <TextField
            label="Image URL"
            name="image"
            value={postData.image}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            className="md:col-span-2"
          />

          <TextField
            label="Content"
            name="content"
            value={postData.content}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            className="md:col-span-2"
            required
          />

          <div className="md:col-span-2 flex justify-end">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="!bg-indigo-600 hover:!bg-indigo-700"
            >
              🚀 Publish
            </Button>
          </div>
        </form>
      </div>

      {/* Post List */}
      <div>
        <h2 className="text-2xl font-bold text-gray-700 mb-4">📬 Your Posts</h2>
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : error ? (
          <p>{error?.message || error}</p>

        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts?.map((post) => (
              <div key={post._id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                {post.image && (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {post.content.slice(0, 100)}...
                  </p>
                  <div className="flex items-center mt-4 space-x-3">
                    <Avatar src="" icon={<UserOutlined />} />
                    <div className="text-sm text-gray-500">
                      By{' '}
                      <span className="font-medium text-gray-700">
                        {post.creator?.name || 'Unknown'}
                      </span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 mt-2">
                    Tags: {post.tags?.join(', ') || 'No tags'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostScreen;

