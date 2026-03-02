import videoInfo as v
import cv2
import numpy as np
import mediapipe as mp
from mediapipe.tasks import python
from mediapipe.tasks.python import vision

# STEP 2: Create an FaceDetector object.
BaseOptions = mp.tasks.BaseOptions
FaceDetector = mp.tasks.vision.FaceDetector
FaceDetectorOptions = mp.tasks.vision.FaceDetectorOptions
VisionRunningMode = mp.tasks.vision.RunningMode

# Create a face detector instance with the video mode:
options = FaceDetectorOptions(
    base_options = BaseOptions(model_asset_path='blaze_face_short_range.tflite'),
    running_mode = VisionRunningMode.VIDEO
)

def loadVideo(path):
    cap = cv2.VideoCapture(path)

    if not cap.isOpened():
        print("Error: could not open video file")
        return
    else:
        print("Video file opened successfully")
        return cap

with FaceDetector.create_from_options(options) as detector:
    # STEP 3: Load the input VIDEO
    cap = loadVideo("myvideo.mp4")

    capInfo = v.videoInfo(cap)

    print(capInfo.get_fps())
    print(capInfo.get_frame_count())

    result = []
    frame_index = 0

    # Read and display each frame of the video
    while True:
        ret, frame = cap.read()
        if not ret:
            print("Error: end of video or error occured")
            break

        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=rgb_frame)
        timestamp = int(cap.get(cv2.CAP_PROP_POS_MSEC))

        detection_result = detector.detect_for_video(mp_image, timestamp)
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
    cv2.destroyAllWindows()
    print(result)
    # STEP 4: Detect faces in the input image.
    #detection_result = detector.detect(video)   
    #print(detection_result)


