import { useState, type ChangeEvent } from "react";
import axios from "axios";

type props = {
  onSelect: (file: File) => void;
};

type uploadStatus = "idle" | "uploading" | "success" | "error";

export default function VideoUploader({ onSelect }: props) {
  const [status, setStatus] = useState<uploadStatus>("idle");

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    onSelect(selectedFile);
    setStatus("idle");
  }

  return (
    <div>
      <input type="file" accept="video/*" onChange={handleFileChange} />
    </div>
  );
}
