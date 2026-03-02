import { useEffect, useState } from "react";

type Props = {
  file: File | null;
};

export default function VideoCanvasPlayer({ file }: Props) {
  const [videoURL, setVideoURL] = useState<string | null>(null);

  useEffect(() => {
    if (!file) return;

    const url = URL.createObjectURL(file);
    setVideoURL(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  if (!videoURL) return null;

  return (
    <div>
      <video src={videoURL} controls width={400}></video>
    </div>
  );
}
