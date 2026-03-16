import os
from unittest import result
import cv2
import mediapipe as mp
import videoInfo as v

#Face detector
BaseOptions = mp.tasks.BaseOptions
FaceDetector = mp.tasks.vision.FaceDetector
FaceDetectorOptions = mp.tasks.vision.FaceDetectorOptions
VisionRunningMode = mp.tasks.vision.RunningMode

MODEL_PATH = os.path.join(os.path.dirname(__file__), 'blaze_face_short_range.tflite')

#Video mode face detector instance
options = FaceDetectorOptions(
    base_options = BaseOptions(model_asset_path=MODEL_PATH),
    running_mode = VisionRunningMode.VIDEO,
    min_detection_confidence = 0.3
)

def loadVideo(path):
    cap = cv2.VideoCapture(path)

    if not cap.isOpened():
        print("Error: could not open video file")
        return None
    else:
        print("Video file opened successfully")
        return cap

def detectFacesInVideo(video_path):
    with FaceDetector.create_from_options(options) as detector:

        cap = loadVideo(video_path)

        if cap is None:
            return []

        capInfo = v.videoInfo(cap)

        print(capInfo.get_fps())
        print(capInfo.get_frame_count())

        cap.set(cv2.CAP_PROP_POS_FRAMES, 0)

        result = []
        fps = capInfo.get_fps()
        frame_index = 0

        # Read and display each frame of the video
        while True:

            ret, frame = cap.read()

            if not ret:
                print("Error: end of video or error occured")
                break

            try:
                rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
                mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=rgb_frame)
                timestamp = int((frame_index / fps) * 1000)
                detection_result = detector.detect_for_video(mp_image, timestamp)
            except Exception as e:
                print(f"Error on frame {frame_index}: {e}")
                break

            #print(f"Frame {frame_index}: {detection_result}")

            faces = []
        
            for det in detection_result.detections:
                bbox = det.bounding_box
                faces.append({
                    "x": bbox.origin_x,
                    "y": bbox.origin_y,
                    "width": bbox.width,
                    "height": bbox.height
                    })

            result.append({
                "frame": frame_index,
                "faces": faces
            })

            frame_index += 1

        cap.release()
        print(f"Done! Total frames processed: {frame_index}")
        print(f"Frames with faces: {sum(1 for f in result if f['faces'])}")
        
        return {"result": result,
                "fps": fps}


