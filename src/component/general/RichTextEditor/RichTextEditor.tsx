"use client";

import { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

interface Props {
  label?: string;
  value: string;
  onChange: (val: string) => void;
}

export default function RichTextEditor({ label, value, onChange }: Props) {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillRef = useRef<any>(null);

  useEffect(() => {
    if (!editorRef.current) return;

    // جلوگیری از ساخت دو بار
    if (quillRef.current) return;

    quillRef.current = new Quill(editorRef.current, {
      theme: "snow",
      placeholder: "متن را وارد کنید...",
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ align: [] }],
          ["link", "image"],
          ["clean"],
        ],
      },
    });

    quillRef.current.root.innerHTML = value;

    quillRef.current.on("text-change", () => {
      const html = quillRef.current.root.innerHTML;
      onChange(html);
    });
  }, []);

  // اگر مقدار از والد تغییر کرد (ویرایش)
  useEffect(() => {
    if (quillRef.current) {
      if (quillRef.current.root.innerHTML !== value) {
        quillRef.current.root.innerHTML = value;
      }
    }
  }, [value]);

  return (
    <div className="w-full flex flex-col">
      {label && <label className="text-sm font-medium mb-1 ">{label}</label>}

      <div

        ref={editorRef}
        className="bg-white rounded border border-gray-300 min-h-[200px]"
      />
    </div>
  );
}
