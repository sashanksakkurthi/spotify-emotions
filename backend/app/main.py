from fastapi import FastAPI
from model import ai_code_analizer
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
 
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ImageSchema(BaseModel):
    image: str


@app.post("/get-emotions")
async def get_emotion(image: ImageSchema):
    return ai_code_analizer(image)
