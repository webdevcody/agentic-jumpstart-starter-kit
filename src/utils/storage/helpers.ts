import {
  getPresignedImageUploadUrlFn,
  getPresignedUploadUrlFn,
} from "~/fn/storage";

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

export interface FileUploadResult {
  fileKey: string;
}

export interface ImageUploadResult {
  imageKey: string;
}

export async function uploadFileWithPresignedUrl(
  key: string,
  file: File,
  onProgress?: (progress: UploadProgress) => void
): Promise<FileUploadResult> {
  const { presignedUrl } = await getPresignedUploadUrlFn({
    data: { videoKey: key },
  });

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && onProgress) {
        onProgress({
          loaded: event.loaded,
          total: event.total,
          percentage: Math.round((event.loaded / event.total) * 100),
        });
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve({ fileKey: key });
      } else {
        reject(new Error(`Upload failed: ${xhr.statusText}`));
      }
    };

    xhr.onerror = () => reject(new Error("Upload failed: Network error"));

    xhr.open("PUT", presignedUrl);
    xhr.setRequestHeader("Content-Type", file.type || "application/octet-stream");
    xhr.send(file);
  });
}

export async function uploadImageWithPresignedUrl(
  key: string,
  file: File,
  onProgress?: (progress: UploadProgress) => void
): Promise<ImageUploadResult> {
  const { presignedUrl } = await getPresignedImageUploadUrlFn({
    data: { imageKey: key },
  });

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && onProgress) {
        onProgress({
          loaded: event.loaded,
          total: event.total,
          percentage: Math.round((event.loaded / event.total) * 100),
        });
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve({ imageKey: key });
      } else {
        reject(new Error(`Image upload failed: ${xhr.statusText}`));
      }
    };

    xhr.onerror = () => reject(new Error("Image upload failed: Network error"));

    xhr.open("PUT", presignedUrl);
    xhr.setRequestHeader("Content-Type", file.type);
    xhr.send(file);
  });
}
