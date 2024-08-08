import { axiosInstance } from ".";

export const addBlogPost = async (blogData) => {
  try {
    const response = await axiosInstance.post('/api/blog/add', blogData);
    return response.data;
  } catch (error) {
    console.error('Error adding blog post:', error);
    throw error;
  }
};



export const fetchAllBlogs = async () => {
  try {
    const response = await axiosInstance.get('/api/blog/show');
    return response.data;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    throw error;
  }
};


