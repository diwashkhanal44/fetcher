import React from 'react';
import useSWR from 'swr';

const fetcher = async () => {
  try {
    const response = await fetch('https://t.paradox8599.workers.dev/');
    const data = await response.json();

    // Check if the response contains the expected structure
    if (data && data.data) {
      return data.data;
    } else {
      throw new Error('Invalid response format');
    }
  } catch (error) {
    // Handle any fetch errors
    console.error('Error fetching data:', error);
    throw error;
  }
};

const Try = () => {
  const { data, error } = useSWR('/api/data', fetcher);

  if (error) {
    return <div>Error loading data</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Data from API:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Try;