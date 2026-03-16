import { useEffect, useRef, useState } from 'react';
import type { FrameData } from '../types/types';

type Props = {
  preview: string;
  faceData: FrameData[] | null;
  fps: number;
};

export default function VideoCanvasPlayer({ preview, faceData, fps }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    video.addEventListener('timeupdate', () => {
      const currentFrame = Math.floor(video.currentTime * fps);
      const frameData = faceData?.find((f) => f.frame === currentFrame);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      frameData?.faces.forEach((face) => {
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 2;
        ctx.strokeRect(face.x, face.y, face.width, face.height);
      });
    });
  }, [faceData]);

  return (
    <div style={{ position: 'relative' }}>
      <video ref={videoRef} src={preview} controls width="600" />
      <canvas
        ref={canvasRef}
        width="600"
        height="400"
        style={{ position: 'absolute', top: 0, left: 0 }}
      />
    </div>
  );
}
