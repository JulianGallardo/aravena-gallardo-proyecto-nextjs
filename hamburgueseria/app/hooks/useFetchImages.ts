import { useState, useEffect } from 'react';
import { Burger } from '@/prisma/generated/client';
import { getImageUrl } from '@/utils/cloudinaryUtils';

const useFetchBurgers = (url: string = '/api/products/burgers') => {
  const [burgers, setBurgers] = useState<Burger[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBurgers = async () => {
      try {
        const res = await fetch(url, {
          cache: 'reload',
        });
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();

        if (Array.isArray(data.body)) {
          setBurgers(data.body);
    
          const urls: string[] = await Promise.all(data.body.map((burger: Burger) =>
            getImageUrl(`${burger.burgerId}-${burger.name.replace(/\s/g, '')}`)
          ));
          setImageUrls(urls);
        } else if (typeof data === 'object' && data !== null) {
          setBurgers([data.body]);
    
          const url: string = await getImageUrl(`${data.body.burgerId}-${data.body.name.replace(/\s/g, '')}`);
          setImageUrls([url]);
        } else {
          throw new Error('Invalid data format');
        }
      } catch (error: any) {
        console.error('Error fetching burgers:', error);
        setError(error.message);
      }
    };

    fetchBurgers();
  }, [url]);

  return { burgers, imageUrls, error };
};

export default useFetchBurgers;
