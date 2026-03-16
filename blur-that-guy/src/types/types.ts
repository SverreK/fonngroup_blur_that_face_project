export type Face = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type FrameData = {
  frame: number;
  faces: Face[];
};

export type VideoAnalysis = {
  result: FrameData[];
  fps: number;
};
