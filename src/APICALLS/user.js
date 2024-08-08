const {axiosInstance}=require(".")
export const registerUser = async (payload)=>{
    try {
        console.log("first")
        const response= await axiosInstance.post('/api/user/register',payload)
        console.log(response.data)
        console.log("Second")
        return response.data
    } catch (error) {
        return error
    }
}




export const loginUser = async (formData) => {
  try {
    const response = await axiosInstance.post('api/user/login', formData);
    return response.data;
  } catch (error) {
    console.error('API call failed:', error.response ? error.response.data : error.message);
    return { success: false, message: 'API call failed' };
  }
};




export const GetCurrentUser = async () => {
    try {
        const response = await axiosInstance.get('api/user/get-current-user');
        // Return the user data from the response
        return response.data;
    } catch (error) {
        // Log or handle the error appropriately
        console.error('Error fetching current user:', error);
        // Return an error message or throw the error
        return { error: 'Failed to fetch user data' };
    }
};





export const UpdateUserDetails = async (userData) => {
  try {
    const response = await axiosInstance.put('api/user/update', userData);
    return response.data;
  } catch (error) {
    console.error('Error updating user details:', error);
    return { error: 'Failed to update user details' };
  }
};
