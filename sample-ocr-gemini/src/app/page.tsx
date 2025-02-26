"use client";
import axios from "axios";
import NextImage from "next/image";
import { useState } from "react";

export default function Home() {
  const [image, setImage] = useState<File | null>(null);
  const [ocrResult, setOcrResult] = useState("");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) setImage(event.target.files[0]);
  };

  const handleOCR = async () => {
    if (image) {
      const formData = new FormData();
      formData.append("image", image);

      try {
        const response = await axios.post("/ocr", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setOcrResult(response.data.text);
      } catch (error) {
        console.error("OCR error:", error);
        setOcrResult("Error performing OCR");
      }
    }
  };
  const x = () => {
    if (image) {
      const _img = new Image();
    }
  };
  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleOCR}>Perform OCR</button>
      <br />
      {image && <NextImage src={} alt="image" width={300} height={500} />}
      {ocrResult && <p>OCR Result: {ocrResult}</p>}
    </div>
  );
}
