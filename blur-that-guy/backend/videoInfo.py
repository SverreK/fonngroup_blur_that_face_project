import cv2

class videoInfo:

    def __init__(self, video):
        self.frame_count = int(video.get(cv2.CAP_PROP_FRAME_COUNT))
        self.fps = video.get(cv2.CAP_PROP_FPS)

    def get_frame_count(self):
        return self.frame_count
    
    def get_fps(self):
        return self.fps
