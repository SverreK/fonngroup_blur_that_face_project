import { useState, type ChangeEvent } from 'react';
import axios from 'axios';

type props = {
  onSelect: (file: File) => void;
};

type uploadStatus = 'idle' | 'uploading' | 'success' | 'error';

export default function VideoUploader({ onSelect }: props) {
  const [status, setStatus] = useState<uploadStatus>('idle');
  const [file, setFile] = useState<File | null>(null);

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    setFile(selectedFile);
    onSelect(selectedFile);
    setStatus('idle');
  }

  async function handleUpload() {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setStatus('uploading');

    try {
      const response = await axios.post(
        'http://localhost:8000/upload-video',
        formData,
      );
      console.log(response.data);
      setStatus('success');
    } catch (error) {
      setStatus('error');
    }
  }

  return (
    <div>
      <input type="file" accept="video/*" onChange={handleFileChange} />

      <button type="submit" onClick={handleUpload} disabled={!file}>
        Upload
      </button>
    </div>
  );
}
