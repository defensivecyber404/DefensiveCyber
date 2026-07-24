const API_URL = 'http://localhost:5000/api';

export const fetchFaqs = async () => {
  try {
    const res = await fetch(`${API_URL}/faqs`);
    if (!res.ok) throw new Error('Failed to fetch FAQs');
    return await res.json();
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    return [];
  }
};

export const addFaq = async (faqData, token) => {
  try {
    const res = await fetch(`${API_URL}/faqs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(faqData)
    });
    if (!res.ok) throw new Error('Failed to add FAQ');
    return await res.json();
  } catch (error) {
    console.error('Error adding FAQ:', error);
    throw error;
  }
};

export const updateFaq = async (id, faqData, token) => {
  try {
    const res = await fetch(`${API_URL}/faqs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(faqData)
    });
    if (!res.ok) throw new Error('Failed to update FAQ');
    return await res.json();
  } catch (error) {
    console.error('Error updating FAQ:', error);
    throw error;
  }
};

export const deleteFaq = async (id, token) => {
  try {
    const res = await fetch(`${API_URL}/faqs/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!res.ok) throw new Error('Failed to delete FAQ');
    return await res.json();
  } catch (error) {
    console.error('Error deleting FAQ:', error);
    throw error;
  }
};
