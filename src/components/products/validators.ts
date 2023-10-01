import { z } from "zod";

export const validateFileSize = (files: any, maxSizeKB: number) => {
  const fileSizeKB = files?.[0]?.size * 1024;
  console.log(files);
  if (fileSizeKB > maxSizeKB) {
    return z.string({
        required_error:"File is required",
        invalid_type_error: "File size exceeds the maximum allowed size."
    });
  }
  return z.OK;
};
