'use client'

import React from 'react';
import UploadPhoto from '@/app/ui/photos/uploadPhotos';

const Home: React.FC = () => {
  return (
    <div>
      <h1 className="pt-20">Upload an Image</h1>
      <UploadPhoto />
    </div>
  );
};

export default Home;
