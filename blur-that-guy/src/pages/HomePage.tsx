//import { useState } from 'react';
//import VideoUploader from '../components/VideoUploader';
import VideoCanvasPlayer from '../components/VideoCanvasPlayer';
import DropZone from '../components/DropZone';

export default function HomePage() {
  const [file, setFile] = useState<File | null>(null);
  return (
    <section className="section">
      <div className="container">
        <h1 className="tutke text-3x1 font-bold">Upload Files</h1>
        <DropZone />
        {/* <VideoUploader onSelect={setFile} /> */}
        <VideoCanvasPlayer file={file} />
      </div>
    </section>
  );
}
