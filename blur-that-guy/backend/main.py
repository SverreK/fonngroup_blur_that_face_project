import os
import shutil
import tempfile
import traceback
from fastapi import FastAPI, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from mediapipe_face_detector import detectFacesInVideo

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite sin standard port
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/upload-video")
async def upload_video(file: UploadFile):
    # Save the uploaded video file to a temporary location
    temp_file_path = os.path.join(tempfile.gettempdir(), file.filename)
    
    with open(temp_file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        result = detectFacesInVideo(temp_file_path)
        return {"message": "Video uploaded and processed successfully",
                "result": result["result"],
                "fps": result["fps"]}
    except Exception as e:
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e))