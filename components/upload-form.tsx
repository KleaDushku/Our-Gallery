//components\upload-form.tsx
"use client";

import React, { useEffect } from "react";
import { uploadImage } from "@/lib/actions";
import { useActionState } from "react";
import { SubmitButton } from "@/components/button";

const UploadForm = () => {
  const [state, formAction] = useActionState(uploadImage, null);

  const validationErrors = state?.error && typeof state?.error !== 'boolean' && state?.error.image
    ? state?.error.image
    : null;

  useEffect(() => {
    if (state?.success) {
      const newNotification = {
        id: Date.now(),
        message: `You uploaded the file: ${state.imageUrl.split("/").pop()}`,
        date: new Date().toLocaleString(),
        imageUrl: state.imageUrl, // Ruaj URL-në e imazhit
      };

      const savedNotifications = JSON.parse(localStorage.getItem("notifications") || "[]");
      const updatedNotifications = [newNotification, ...savedNotifications];
      localStorage.setItem("notifications", JSON.stringify(updatedNotifications));

      setTimeout(() => {
        window.history.back();
      }, 2000);
    }
  }, [state?.success]);

  return (
    <form action={formAction}>
      {state?.message ? (
        <div
          className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50"
          role="alert"
        >
          <div className="font-medium">{state?.message}</div>
        </div>
      ) : null}

      <div className="mb-4 pt-2">
        <input
          type="file"
          name="image"
          className="file:py-2 file:px-4 file:mr-4 file:rounded-sm file:border-0 file:bg-gray-200 hover:file:bg-gray-300 file:cursor-pointer border border-gray-400 w-full"
        />
        <div aria-live="polite" aria-atomic="true">
          {validationErrors && (
            <p className="text-sm text-red-500 mt-2">{validationErrors}</p>
          )}
        </div>
      </div>

      <div className="mb-4 pt-4">
        <SubmitButton label="upload" />
      </div>
    </form>
  );
};

export default UploadForm;