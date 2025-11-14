"use client";

import { useState, useEffect, useRef } from "react";
import { FaFileUpload } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";

interface IProps {
  title: string;
  value: File | null;
  onChange: (file: File | null) => void;
  previewUrl?: string | null;
}

export default function UploadingFile({ title, value, onChange, previewUrl }: IProps) {
  const [preview, setPreview] = useState<string | null>(null);


  const [showModal, setShowModal] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // همگام‌سازی عکس قبلی و جدید
  useEffect(() => {
    if (value instanceof File) {
      const url = URL.createObjectURL(value);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }

    if (previewUrl && !value) {
      setPreview(previewUrl);
    } else {
      setPreview(null);
    }
  }, [value, previewUrl]);

  const chooseFile = () => inputRef.current?.click();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (file && file.size > 800 * 1024) {
      alert("حجم فایل باید کمتر از 800 کیلوبایت باشد");
      return;
    }

    onChange(file);
  };

  // 🟩 دکمه حذف باید BOTH value و previewUrl را حذف کند
  const removeImage = () => {
    onChange(null);
    setPreview(null);
  };

  const hasImage = preview !== null;

  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-400 border-dashed rounded-lg bg-gray-50 hover:bg-gray-100">

        {!hasImage ? (
          <>
            <FaFileUpload
              className="w-10 h-10 mb-4 text-gray-500 cursor-pointer hover:text-gray-900"
              onClick={chooseFile}
            />

            <span className="font-semibold cursor-pointer hover:text-gray-900" onClick={chooseFile}>
              آپلود فایل
            </span>

            <p className="py-4">{title}</p>

            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onFileChange}
            />
          </>
        ) : (
          <div className="flex flex-col items-center">
            <ImCancelCircle
              className="w-7 h-7 text-red-400 cursor-pointer hover:text-red-700"
              onClick={removeImage}
            />

            <img
              src={preview || ""}
              className="w-36 h-36 object-cover rounded-lg cursor-pointer"
              onClick={() => setShowModal(true)}
            />

            <span className="font-semibold mt-2">{title}</span>
          </div>
        )}
      </div>

      {showModal && preview && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setShowModal(false)}
        >
          <img src={preview} className="max-w-[80%] max-h-[80%] rounded-lg shadow-xl" />
        </div>
      )}
    </div>
  );
}
