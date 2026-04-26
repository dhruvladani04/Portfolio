import { useState, useEffect } from 'react';

export const useCodeforces = (handle = 'dhruvcodes04') => {
  const [data, setData] = useState({
    rating: '1685',
    rank: 'Expert',
    loading: true,
    error: false,
  });

  useEffect(() => {
    const fetchCodeforcesData = async () => {
      try {
        const response = await fetch(`https://codeforces.com/api/user.info?handles=${handle}`);
        if (!response.ok) {
          throw new Error('Failed to fetch Codeforces data');
        }

        const json = await response.json();

        if (json.status === 'OK' && json.result && json.result.length > 0) {
          const user = json.result[0];

          // Helper to capitalize rank
          const capitalize = (str) => {
            if (!str) return 'Expert';
            return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
          };

          setData({
            rating: user.maxRating ? user.maxRating.toString() : '1685',
            rank: capitalize(user.maxRank) || 'Expert',
            loading: false,
            error: false,
          });
        } else {
          throw new Error('Invalid data format from Codeforces API');
        }
      } catch (err) {
        console.error('Error fetching Codeforces data:', err);
        setData(prev => ({ ...prev, loading: false, error: true }));
      }
    };

    fetchCodeforcesData();
  }, [handle]);

  return data;
};
