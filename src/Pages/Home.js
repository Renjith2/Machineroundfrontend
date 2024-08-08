
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SetUser } from '../redux/userSlice';
import { UpdateUserDetails, GetCurrentUser } from '../APICALLS/user';
import AddPostModal from './AddPostModal';
import { Button, Spin, Alert,Card } from 'antd';
import { fetchAllBlogs } from '../APICALLS/blog';

function Home() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user ? user.name : '',
    email: user ? user.email : '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [blogs, setBlogs] = useState([]); // Local state for blogs
  const [fetchError, setFetchError] = useState(''); // State for fetch error
  const [loading, setLoading] = useState(true); // State for loading blogs
  const [flag,Setflag]=useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = async () => {
    if (!formData.email.endsWith('@gmail.com')) {
      setFetchError('Email must end with @gmail.com');
      return;
    }
    try {
      const response = await UpdateUserDetails(formData);
      if (response.success) {
        dispatch(SetUser(response.data));
        setIsEditing(false);
      } else {
        console.error(response.message);
      }
    } catch (error) {
      console.error('Error updating user details:', error);
    }
  };

  const loadBlogs = async () => {
    try {
      const response = await fetchAllBlogs();
      console.log(response);
      if (response.success) {
        setBlogs(response.data); 
        setLoading(false);
      } else {
        setFetchError(response.message);
        setLoading(false);
      }
    } catch (error) {
      setFetchError('Failed to fetch blogs');
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  },[flag]); // Run loadBlogs when user is available

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'white' }}>
//       <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '1rem' }}>
//       <Button 
//   onClick={() => {
//     Setflag(true);
//     setIsModalOpen(true);
//   }} 
//   type="primary"
// >
//   Add Post
// </Button>
       
//       </div>
//       <div style={{ flex: 1, padding: '20px' }}>
//         {user ? (
//           <div>
//             {isEditing ? (
//               <div>
//                 <div style={{ marginBottom: '1rem' }}>
//                   <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem' }}>Name:</label>
//                   <input
//                     type="text"
//                     id="name"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     style={{ padding: '0.5rem', width: '100%' }}
//                   />
//                 </div>
//                 <div style={{ marginBottom: '1rem' }}>
//                   <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem' }}>Email:</label>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     style={{ padding: '0.5rem', width: '100%' }}
//                   />
//                   {fetchError && <p style={{ color: 'red' }}>{fetchError}</p>}
//                 </div>
//                 <button onClick={handleSave} style={{ padding: '0.5rem', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
//                   Save
//                 </button>
//               </div>
//             ) : (
//               <div>
//                 <h1>Name: {user.name}</h1>
//                 <p>Email: {user.email}</p>
//                 <button onClick={() => setIsEditing(true)} style={{ padding: '0.5rem', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
//                   Edit
//                 </button>
//               </div>
//             )}
//           </div>
//         ) : (
//           <p>Loading...</p>
//         )}

//         {/* Blog Display Section */}
//         <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
//           <div style={{ width: '80%' }}>
//             {loading ? (
//               <Spin tip="Loading blogs..." />
//             ) : fetchError ? (
//               <Alert message="Error" description={fetchError} type="error" showIcon />
//             ) : (
//               <ul>
//                 {blogs.map((blog) => (
//                   <li key={blog._id} style={{ marginBottom: '1rem' }}>
//                     <h3>{blog.title}</h3>
//                     <p>{blog.content}</p>
//                     <p><em>Author: {blog.author}</em></p>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         </div>
//       </div>
//       <AddPostModal Setflag={Setflag} isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} />
//     </div>
//   );
// }

// export default Home;



return (
  <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'white' }}>
    <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '1rem' }}>
      <Button 
        onClick={() => {
          Setflag(true);
          setIsModalOpen(true);
        }} 
        type="primary"
      >
        Add Post
      </Button>
    </div>
    <div style={{ flex: 1, padding: '20px' }}>
      {user ? (
        <div>
          {isEditing ? (
            <div>
              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem' }}>Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  style={{ padding: '0.5rem', width: '100%' }}
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem' }}>Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={{ padding: '0.5rem', width: '100%' }}
                />
                {fetchError && <p style={{ color: 'red' }}>{fetchError}</p>}
              </div>
              <button onClick={handleSave} style={{ padding: '0.5rem', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                Save
              </button>
            </div>
          ) : (
            <div>
              <h1>Name: {user.name}</h1>
              <p>Email: {user.email}</p>
              <button onClick={() => setIsEditing(true)} style={{ padding: '0.5rem', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                Edit
              </button>
            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}

      {/* Blog Display Section */}
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '80%' }}>
          {loading ? (
            <Spin tip="Loading blogs..." />
          ) : fetchError ? (
            <Alert message="Error" description={fetchError} type="error" showIcon />
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
              {blogs.map((blog) => (
                <Card
                  key={blog._id}
                  title={blog.title}
                  style={{ width: '300px' }}
                  hoverable
                >
                  <p>{blog.content}</p>
                  <p><em>Author: {blog.author}</em></p>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
    <AddPostModal Setflag={Setflag} isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} />
  </div>
);
}

export default Home;