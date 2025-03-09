//lib\actions.ts
"use server";

import { z } from "zod";
import { writeFile } from "fs/promises";
import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";

const UploadSchema = z.object({
  image: z
    .instanceof(File)
    .refine((file) => file.size > 0, { message: "Image is required." })
    .refine((file) => file.type.startsWith("image/"), {
      message: "Only images are allowed!",
    })
    .refine((file) => file.size < 4000000, {
      message: "Image must be less than 4MB",
    }),
});

export const uploadImage = async (prevState: unknown, formData: FormData) => {
  const validatedFields = UploadSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const file = formData.get("image");

  if (!file || !(file instanceof File)) {
    return { error: { image: ["Invalid file"] } };
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = file.name.replaceAll(" ", "_");

    const assetsPath = path.resolve("public/assets");
    await fs.mkdir(assetsPath, { recursive: true });

    await writeFile(path.join(assetsPath, filename), buffer);

    // Revalidate the page to reflect changes
    revalidatePath("/");

    // Ktheni mesazhin e suksesit pa përdorur `redirect`
    return {
      message: "You have successfully uploaded a photo!",
      success: true,
      imageUrl: `/assets/${filename}`,
    };
  } catch (error) {
    return {
      message: `Failed to upload image: ${error instanceof Error ? error.message : 'Unknown error'}`,
      error: true,
    };
  }
};
