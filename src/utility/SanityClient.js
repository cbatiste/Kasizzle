import { useEffect, useState } from 'react';
import { createClient } from '@sanity/client';

export const SanityClient = createClient({
  projectId: 'zuriny6u',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-05-03'
});

export const useSanityQuery = (query) => {
  let [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      let response = await SanityClient.fetch(query);
      setData(response);
    };

    fetchData();
  }, [query]);

  return data;
};