import React from 'react';
import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';

const fetcher = async (url) => {
  try {
    const response = await fetch(url);
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

const getKey = (pageIndex, previousPageData) => {
  pageIndex = pageIndex+1;
  if (previousPageData && !previousPageData.length) return null;
  return `https://t.paradox8599.workers.dev/users?page=${pageIndex}&limit=10`
}

const Try = () => {
  const { data: paginatedData, size, setSize } = useSWRInfinite(getKey, fetcher);

  console.log("paginated data:", { paginatedData});
  //console.log("size  :", { size });

  if (!paginatedData) {
    return <div>Loading...</div>;
  }
  const dataa = paginatedData?.flat();

  return (
    <div>
      {
      dataa.map((item) => (
        <p>{item}</p>
      ))}
      <button onClick={() => setSize(size + 1)}>Load more</button>
    </div>
  );

};

export default Try;



/*import React from 'react';
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
*/