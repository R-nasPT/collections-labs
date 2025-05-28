import { useTranslations } from "next-intl";
import { useState, useRef } from "react";
import { FiUploadCloud, FiFile, FiX, LoadingIcon } from "@/lib/icons";
import { useFileUpload } from "@/services";
import { MediaUploadResponse } from "@/types";
import { cn } from "@/utils";

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

const colorVariants = {
  blue: {
    text: "text-blue-600 hover:text-blue-500",
    bg: "bg-blue-50",
    border: "border-blue-500",
    hover: "hover:bg-blue-100",
    icon: "text-blue-600"
  },
  purple: {
    text: "text-purple-600 hover:text-purple-500", 
    bg: "bg-purple-50",
    border: "border-purple-500",
    hover: "hover:bg-purple-100",
    icon: "text-purple-600" 
  }
}

interface FileUploadProps {
  onUploadComplete?: (status: "success" | "error", payload: MediaUploadResponse | Error | null) => void;
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
  const t = useTranslations();

  const { mutateAsync, isPending } = useFileUpload()

  const colorClasses = colorVariants[color]

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
        className={cn("relative border-2 border-dashed rounded-lg p-6", 
          dragActive ? `${colorClasses.border} ${colorClasses.bg}` : "border-gray-300",
          error ? "border-red-500" : "",
          isPending ? colorClasses.bg : "",
          "transition-colors duration-200")}
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
                className={cn("font-medium", colorClasses.text)}
                disabled={isPending}
              >
                {t("INDEX.CLICK_UPLOAD")}
              </button>
              <span className="text-gray-500"> {t("INDEX.OR_DRAG_DROP")}</span>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              {t("INDEX.FILE_UPLOAD_ACCEPTED", {
                types: getAcceptedTypesDisplay(),
                size: maxSize,
              })}
            </p>
          </div>
        ) : (
          <div className={cn(`flex items-center justify-between p-2 rounded`, colorClasses.bg)}>
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <FiFile className={cn(`min-h-6 min-w-6`, colorClasses.icon)} />
              {isPending ? (
                <div className="flex items-center gap-2">
                  <LoadingIcon className={cn(`inline w-5 h-5 me-1 border-black animate-spin`, colorClasses.icon)} />
                  <span className="text-sm text-gray-500">{t("BUTTON.UPLOADING")}</span>
                </div>
              ) : (
                <span 
                  className="text-sm text-gray-700 truncate overflow-hidden cursor-default"
                  title={file.name}
                >
                  {file.name}
                </span>
              )}
            </div>
            <button
              onClick={handleRemove}
              className={cn(`p-1 rounded-full transition-colors`, colorClasses.hover)}
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
