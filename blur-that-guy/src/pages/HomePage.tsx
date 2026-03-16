import { useState } from 'react';
//import VideoUploader from '../components/VideoUploader';
import DropZone from '../components/DropZone';
import Header from '../components/Header';
import VideoCanvasPlayer from '../components/VideoCanvasPlayer';
import type { FrameData } from '../types/types';

export default function HomePage() {
  const [faceData, setFaceData] = useState<FrameData[] | null>(null);
  const [fps, setFps] = useState<number>(30);
  const [preview, setPreview] = useState<string | null>(null);

  function handleUpload(data: FrameData[], url: string, videoFps: number) {
    setFaceData(data);
    setPreview(url);
    setFps(videoFps);
  }

  return (
    <>
      <header>
        <Header />
      </header>
      <section className="section">
        <div className="flex flex-col items-center mt-50 min-h-screen">
          <h1 className="text-3xl">Upload your video!</h1>
          <DropZone onUpload={handleUpload} />
        </div>

        <div>
          {faceData && preview && (
            <VideoCanvasPlayer
              preview={preview}
              faceData={faceData}
              fps={fps}
            />
          )}
        </div>
      </section>
    </>
  );
}
