import { useState } from 'react';
//import VideoUploader from '../components/VideoUploader';
import DropZone from '../components/DropZone';
import Header from '../components/Header';

export default function HomePage() {
  const [faceData, setFaceData] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <>
      <header>
        <Header />
      </header>
      <section className="section">
        <div className="flex flex-col items-center mt-50 min-h-screen">
          <h1 className="text-3xl">Upload your video!</h1>
          <DropZone />
        </div>
      </section>
    </>
  );
}
