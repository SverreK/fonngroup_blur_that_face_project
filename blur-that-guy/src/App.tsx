import { useState } from 'react';
import VideoUploader from './components/VideoUploader';
import VideoCanvasPlayer from './components/VideoCanvasPlayer';
import './App.css';

function App() {
  const [file, setFile] = useState<File | null>(null);
  return (
    <>
      <h1>Blur That Guy</h1>
      <VideoUploader onSelect={setFile} />
      <VideoCanvasPlayer file={file} />
    </>
  );
}

export default App;
