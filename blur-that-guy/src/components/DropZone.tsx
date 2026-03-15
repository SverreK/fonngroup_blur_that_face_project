import axios from 'axios';
import React, { useCallback } from 'react';
import { useDropzone, type FileWithPath } from 'react-dropzone';

export default function DropZone() {
  const [files, setFiles] = React.useState<FileWithPath[]>([]);
  const [preview, setPreview] = React.useState<string | null>(null);

  const handleUpload = () => {
    if (files.length === 0) return;

    const formData = new FormData();

    for (const file of files) {
      formData.append('file', file);
    }

    axios
      .post('http://localhost:8000/upload-video', formData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error uploading file:', error);
      });
  };

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFiles(acceptedFiles);

    const url = URL.createObjectURL(acceptedFiles[0]);
    setPreview(url);
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

        {preview && (
          <video
            src={preview}
            controls
            className="mt-4 w-full max-h-96 object-contain"
          />
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
