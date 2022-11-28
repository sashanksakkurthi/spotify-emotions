import base64
import io
from tkinter import Image
from keras.models import load_model
from keras.utils import img_to_array
import numpy as np
import cv2
from PIL import Image
import os
import warnings
warnings.filterwarnings("ignore")


def ai_code_analizer(image):

    predicted_emotion = ''
    model = load_model("best_model90.h5")

    face_haar_cascade = cv2.CascadeClassifier(
        cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

    im = Image.open(io.BytesIO(base64.b64decode(image.image.split(',')[1])))
    im.save("input.png")
    im = Image.open("input.png")
    rgb_im = im.convert('RGB')
    im.resize((48, 48), Image.ANTIALIAS)
    rgb_im.save("input.jpg")


# captures frame and returns boolean value and captured image
    test_img = cv2.imread(r"input.jpg")
   # test_img = im
    gray_img = cv2.cvtColor(test_img, cv2.COLOR_BGR2RGB)

    faces_detected = face_haar_cascade.detectMultiScale(gray_img, 1.32, 5)
    print(len(faces_detected))
    for (x, y, w, h) in faces_detected:
        cv2.rectangle(test_img, (x, y), (x + w, y + h),
                      (255, 0, 0), thickness=7)
        # cropping region of interest i.e. face area from  image
        roi_gray = gray_img[y:y + w, x:x + h]
        roi_gray = cv2.resize(roi_gray, (48, 48))
        img_pixels = img_to_array(roi_gray)
        img_pixels = np.expand_dims(img_pixels, axis=0)
        img_pixels /= 255

        predictions = model.predict(img_pixels)

        # find max indexed array
        max_index = np.argmax(predictions[0])

        emotions = ('angry', 'disgust', 'fear', 'happy',
                    'sad', 'surprise', 'neutral')
        predicted_emotion = emotions[max_index]

        cv2.putText(test_img, predicted_emotion, (int(x), int(y)),
                    cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)

    resized_img = cv2.resize(test_img, (1000, 700))
   # cv2.imshow('Facial emotion analysis ', resized_img)

   # cv2.waitKey(5000)  # wait until 'q' key is pressed
    '''cap.release()'''
    # cv2.destroyAllWindows()
    if len(faces_detected) != 0:
        json_obj = {}
        json_obj['response'] = []
        json_obj['response'].append({
            'emotion': predicted_emotion,
            'status': 'sucscess',
            'faces': len(faces_detected)})
        os.remove("input.jpg")
      #  os.remove("input.png")
        return json_obj
    else:
        json_obj = {}
        json_obj['response'] = []
        json_obj['response'].append({
            'emotion': predicted_emotion,
            'status': 'failed',
            'faces': len(faces_detected)})
        os.remove("input.jpg")
       # os.remove("input.png")
        return json_obj
