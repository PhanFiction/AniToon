import { useState, useEffect } from 'react';

// Fetch user from api to check if the user is logged in
function useFetchUser() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/user_signed_in', {
          credentials: 'include', // Include cookies for authentication
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching user:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, error, loading };
}

export default useFetchUser;
