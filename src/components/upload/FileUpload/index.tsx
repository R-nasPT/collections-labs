import { useTranslations } from "next-intl";
import { useState, useRef } from "react";
import { FiUploadCloud, FiFile, FiX } from "@/lib/icons";

type AcceptedTypes =
  | "image/*"
  | "image/jpeg"
  | "image/png"
  | "image/gif"
  | "image/webp"
  | "image/bmp"
  | "image/tiff"
  | "image/svg+xml"
  | "application/pdf";

type ColorScheme = "blue" | "purple"

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  maxSize?: number;
  acceptedTypes?: AcceptedTypes[];
  label?: string;
  color?: ColorScheme
}

export default function FileUpload({
  onFileSelect,
  maxSize = 5,
  acceptedTypes = ["image/*", "application/pdf"],
  label,
  color = "purple"
}: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const t = useTranslations("INDEX");

  const getAcceptedTypesDisplay = () => {
    const types: string[] = [];

    acceptedTypes.forEach((type) => {
      if (type === "image/*") {
        types.push("JPEG, PNG, GIF, WebP, BMP, TIFF, SVG, PDF");
      } else if (type === "image/svg+xml") {
        types.push("SVG (Scalable Vector Graphics)");
      } else if (type.startsWith("image/")) {
        const format = type.split("/")[1].toUpperCase();
        if (!types.includes(format)) {
          types.push(format);
        }
      } else if (type === "application/pdf") {
        types.push("PDF");
      } else {
        const format = type.split("/")[1]?.toUpperCase() || type;
        if (!types.includes(format)) {
          types.push(format);
        }
      }
    });

    return types.join(", ");
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const validateFile = (file: File) => {
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size must be less than ${maxSize}MB`);
      return false;
    }

    if (
      !acceptedTypes.some((type) => {
        if (type.includes("/*")) {
          return file.type.startsWith(type.split("/")[0]);
        }
        return file.type === type;
      })
    ) {
      setError("Invalid file type");
      return false;
    }

    return true;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (validateFile(droppedFile)) {
        setFile(droppedFile);
        onFileSelect(droppedFile);
        setError("");
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (validateFile(selectedFile)) {
        setFile(selectedFile);
        onFileSelect(selectedFile);
        setError("");
      }
    }
  };

  const handleRemove = () => {
    setFile(null);
    setError("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}

      <div
        className={`relative border-2 border-dashed rounded-lg p-6 
          ${dragActive ? `border-${color}-500 bg-${color}-50` : "border-gray-300"}
          ${error ? "border-red-500" : ""}
          transition-colors duration-200`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          onChange={handleChange}
          accept={acceptedTypes.join(",")}
        />

        {!file ? (
          <div className="text-center">
            <FiUploadCloud className="mx-auto h-12 w-12 text-gray-400" />
            <div className="mt-4">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className={`font-medium text-${color}-600 hover:text-${color}-500`}
              >
                {t("CLICK_UPLOAD")}
              </button>
              <span className="text-gray-500"> {t("OR_DRAG_DROP")}</span>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              {t("FILE_UPLOAD_ACCEPTED", {
                types: getAcceptedTypesDisplay(),
                size: maxSize,
              })}
            </p>
          </div>
        ) : (
          <div className={`flex items-center justify-between p-2 bg-${color}-50 rounded`}>
            <div className="flex items-center space-x-2">
              <FiFile className={`h-6 w-6 text-${color}-600`} />
              <span className="text-sm text-gray-700">{file.name}</span>
            </div>
            <button
              onClick={handleRemove}
              className={`p-1 hover:bg-${color}-100 rounded-full transition-colors`}
            >
              <FiX className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        )}
      </div>

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
