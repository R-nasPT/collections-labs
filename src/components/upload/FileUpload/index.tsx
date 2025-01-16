import { useTranslations } from "next-intl";
import { useState, useRef } from "react";
import { FiUploadCloud, FiFile, FiX } from "@/lib/icons";

interface FileUploadResponse {
  contentType: string;
  filename: string;
  link: string;
}

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
  onUploadComplete?: (status: "success" | "error", payload: FileUploadResponse | Error | null) => void;
  maxSize?: number;
  acceptedTypes?: AcceptedTypes[];
  label?: string;
  color?: ColorScheme
}

export default function FileUpload({
  onUploadComplete,
  maxSize = 5,
  acceptedTypes = ["image/*", "application/pdf"],
  label,
  color = "purple",
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

  const handleFileSelection = async (selectedFile: File) => {
    if (validateFile(selectedFile)) {
      setFile(selectedFile);
      setError("");
      try {
        const result = await mutateAsync(selectedFile);
        onUploadComplete?.("success", result);
      } catch (error) {
        setError("Upload failed");
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        onUploadComplete?.("error", error instanceof Error ? error : new Error(errorMessage));
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelection(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFileSelection(e.target.files[0]);
    }
  };

  const handleRemove = () => {
    setFile(null);
    setError("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    onUploadComplete?.("success", null);
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
          ${isPending ? `bg-${color}-50` : ""}
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
                disabled={isPending}
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
              {isPending ? (
                <div className="flex items-center gap-2">
                  <LoadingIcon className={`inline w-5 h-5 me-1 text-${color}-500 border-black animate-spin`} />
                  <span className="text-sm text-gray-500">Uploading...</span>
                </div>
              ) : (
                <span className="text-sm text-gray-700">{file.name}</span>
              )}
            </div>
            <button
              onClick={handleRemove}
              className={`p-1 hover:bg-${color}-100 rounded-full transition-colors`}
              disabled={isPending}
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
