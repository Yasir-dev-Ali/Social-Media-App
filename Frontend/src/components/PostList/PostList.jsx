// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchPosts } from '../../store/action/post/index.js';

// const PostList = () => {
//     const dispatch = useDispatch();

//     const { posts, loading, error } = useSelector((state) => state.postReducer);

//     useEffect(() => {
//         dispatch(fetchPosts());
//     }, [dispatch]);

//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>Error: {error}</p>;

//     return (
//         <>
//             <div className="post-list">
//                 {posts.map((post) => (
//                     <div key={post.id} className="post-item">
//                         <h2>{post.title}</h2>
//                         <p>{post.content}</p>
//                         <p>By: {post.creator}</p>
//                         <p>Tags: {post.tags.join(', ')}</p>
//                     </div>
//                 ))}
//             </div>
//             {posts.length === 0 && <p>No posts available.</p>}
//             <div className="text-center mt-6">
//                 <button onClick={() => dispatch(fetchPosts())} className="btn btn-primary">
//                     Refresh Posts
//                 </button>
//             </div>
//             <style jsx>{`
//                 .post-list {
//                     display: flex;
//                     flex-direction: column;
//                     gap: 1rem;
//                 }
//                 .post-item {
//                     border: 1px solid #ccc;
//                     padding: 1rem;
//                     border-radius: 5px;
//                 }
//             `}</style>
//             <div className="text-center mt-6">
//                 <button onClick={() => dispatch(fetchPosts())} className="btn btn-primary">
//                     Refresh Posts
//                 </button>
//             </div>
//             <style jsx>{`
//                 .post-list {
//                     display: flex;
//                     flex-direction: column;
//                     gap: 1rem;
//                 }
//                 .post-item {
//                     border: 1px solid #ccc;
//                     padding: 1rem;
//                     border-radius: 5px;
//                 }
//             `}</style>
            
//         </>
//     );
// };

// export default PostList;
