const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const fetchPosts = async () => {
  try {
    const res = await fetch(`${API_URL}/posts`);
    if (!res.ok) throw new Error('Failed to fetch posts');
    return await res.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};

export const fetchPostById = async (id) => {
  try {
    const res = await fetch(`${API_URL}/posts/${id}`);
    if (!res.ok) throw new Error('Failed to fetch post');
    return await res.json();
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
};

export const createPost = async (postData, token) => {
  try {
    const res = await fetch(`${API_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(postData)
    });
    
    if (!res.ok) throw new Error('Failed to create post');
    return await res.json();
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

export const loginAdmin = async (username, password) => {
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
    
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Login failed');
    return data;
  } catch (error) {
    throw error;
  }
};

export const submitContact = async (contactData) => {
  try {
    const res = await fetch(`${API_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contactData)
    });
    
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to submit message');
    return data;
  } catch (error) {
    throw error;
  }
};
