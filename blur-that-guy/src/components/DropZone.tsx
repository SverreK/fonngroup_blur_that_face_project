import axios from 'axios';
import React, { useCallback } from 'react';
import { useDropzone, type FileWithPath } from 'react-dropzone';

type Props = {
  onUpload: (data: FrameData[], url: string, fps: number) => void;
};

export default function DropZone({ onUpload }: Props) {
  const [files, setFiles] = React.useState<FileWithPath[]>([]);
  const [url, setUrl] = React.useState<string>('');

  const handleUpload = () => {
    if (files.length === 0) return;

    const formData = new FormData();

    for (const file of files) {
      formData.append('file', file);
    }

    axios
      .post('http://localhost:8000/upload-video', formData)
      .then((response) => {
        onUpload(response.data.result, url, response.data.fps);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error uploading file:', error);
      });
  };

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFiles(acceptedFiles);

    const newUrl = URL.createObjectURL(acceptedFiles[0]);
    setUrl(newUrl);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'video/*': [] },
  });

  return (
    <>
      <div
        {...getRootProps()}
        className="border-3 border-dashed border-gray-400 rounded-xl p-16 mt-5 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Slipp videoen her...</p>
        ) : (
          <p>Drag and drop your video here, or click to select</p>
        )}
      </div>

      <div className="mt-4">
        <button
          onClick={handleUpload}
          disabled={files.length === 0}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Upload
        </button>
      </div>
    </>
  );
}
