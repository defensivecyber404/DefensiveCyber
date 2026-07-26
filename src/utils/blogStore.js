const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '/api' : 'http://localhost:5000/api');

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

export const fetchExternalNews = async (query = 'cybersecurity', max = 6) => {
  try {
    const res = await fetch(`${API_URL}/news/external?keywords=${query}&limit=${max}`);
    const data = await res.json();
    if (!res.ok) {
      console.error('Mediastack API Error via Backend:', data);
      throw new Error(data.error?.message || 'Failed to fetch external news');
    }
    
    return data.data.map((article, index) => ({
      id: `ext-${index}-${Date.now()}`,
      title: article.title,
      excerpt: article.description || 'Read more about this story at the source.',
      content: article.description || '',
      type: 'news',
      created_at: article.published_at,
      isExternal: true,
      url: article.url,
      image: article.image
    }));
  } catch (error) {
    console.error('Error fetching external news:', error);
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

export const updatePost = async (id, postData, token) => {
  try {
    const res = await fetch(`${API_URL}/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(postData)
    });
    
    if (!res.ok) throw new Error('Failed to update post');
    return await res.json();
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
};

export const deletePost = async (id, token) => {
  try {
    const res = await fetch(`${API_URL}/posts/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!res.ok) throw new Error('Failed to delete post');
    return await res.json();
  } catch (error) {
    console.error('Error deleting post:', error);
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

export const fetchReviews = async () => {
  try {
    const res = await fetch(`${API_URL}/reviews`);
    if (!res.ok) throw new Error('Failed to fetch reviews');
    return await res.json();
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
};

export const createReview = async (reviewData, token) => {
  try {
    const res = await fetch(`${API_URL}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(reviewData)
    });
    
    if (!res.ok) throw new Error('Failed to create review');
    return await res.json();
  } catch (error) {
    console.error('Error creating review:', error);
    throw error;
  }
};

export const updateReview = async (id, reviewData, token) => {
  try {
    const res = await fetch(`${API_URL}/reviews/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(reviewData)
    });
    
    if (!res.ok) throw new Error('Failed to update review');
    return await res.json();
  } catch (error) {
    console.error('Error updating review:', error);
    throw error;
  }
};

export const deleteReview = async (id, token) => {
  try {
    const res = await fetch(`${API_URL}/reviews/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!res.ok) throw new Error('Failed to delete review');
    return await res.json();
  } catch (error) {
    console.error('Error deleting review:', error);
    throw error;
  }
};

export const fetchClients = async () => {
  try {
    const res = await fetch(`${API_URL}/clients`);
    if (!res.ok) throw new Error('Failed to fetch clients');
    return await res.json();
  } catch (error) {
    console.error('Error fetching clients:', error);
    return [];
  }
};

export const createClient = async (clientData, token) => {
  try {
    const res = await fetch(`${API_URL}/clients`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(clientData)
    });
    
    if (!res.ok) throw new Error('Failed to create client');
    return await res.json();
  } catch (error) {
    console.error('Error creating client:', error);
    throw error;
  }
};

export const updateClient = async (id, clientData, token) => {
  try {
    const res = await fetch(`${API_URL}/clients/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(clientData)
    });
    
    if (!res.ok) throw new Error('Failed to update client');
    return await res.json();
  } catch (error) {
    console.error('Error updating client:', error);
    throw error;
  }
};

export const deleteClient = async (id, token) => {
  try {
    const res = await fetch(`${API_URL}/clients/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!res.ok) throw new Error('Failed to delete client');
    return await res.json();
  } catch (error) {
    console.error('Error deleting client:', error);
    throw error;
  }
};

// --- SERVICES API ---

export const fetchServices = async () => {
  try {
    const res = await fetch(`${API_URL}/services`);
    if (!res.ok) throw new Error('Failed to fetch services');
    return await res.json();
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
};

export const fetchServiceById = async (id) => {
  try {
    const res = await fetch(`${API_URL}/services/${id}`);
    if (!res.ok) throw new Error('Failed to fetch service');
    return await res.json();
  } catch (error) {
    console.error('Error fetching service:', error);
    return null;
  }
};

export const createService = async (data, token) => {
  try {
    const res = await fetch(`${API_URL}/services`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Failed to create service');
    }
    return await res.json();
  } catch (error) {
    console.error('Error creating service:', error);
    throw error;
  }
};

export const updateService = async (id, data, token) => {
  try {
    const res = await fetch(`${API_URL}/services/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Failed to update service');
    }
    return await res.json();
  } catch (error) {
    console.error('Error updating service:', error);
    throw error;
  }
};

export const deleteService = async (id, token) => {
  try {
    const res = await fetch(`${API_URL}/services/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Failed to delete service');
    }
    return await res.json();
  } catch (error) {
    console.error('Error deleting service:', error);
    throw error;
  }
};
