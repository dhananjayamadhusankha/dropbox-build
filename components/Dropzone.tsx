"use client";

import { db, storage } from "@/firebase";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import DropzoneComponent from "react-dropzone";
import { toast } from "./ui/use-toast";

function Dropzone() {
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useUser();

  const onDrag = (accepetedFiles: File[]) => {
    accepetedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onabort = () => console.log("File reading was aborded");
      reader.onerror = () => console.log("File reading has failed");
      reader.onload = async () => {
        await uploadFile(file);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const uploadFile = async (selectedFiles: File) => {
    if (loading) return;
    if (!user) return;

    setLoading(true);

    toast({ description: "Uploading..." });

    try {
      const docRef = await addDoc(collection(db, "users", user.id, "files"), {
        userId: user.id,
        fullName: user.fullName,
        profileImage: user.imageUrl,
        fileName: selectedFiles.name,
        type: selectedFiles.type,
        size: selectedFiles.size,
        timestamp: serverTimestamp(),
      });

      const imageRef = ref(storage, `users/${user.id}/files/${docRef.id}`);

      uploadBytes(imageRef, selectedFiles)
        .then(async (snapshot) => {
          const downloadUrl = await getDownloadURL(imageRef);

          await updateDoc(doc(db, "users", user.id, "files", docRef.id), {
            downloadUrl: downloadUrl,
          });
        })
        .then(() => {
          console.log("Uploaded successfully...");
          toast({ description: "File uploaded successfully..." });
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      toast({
        description: "Failed to upload the file",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  //max size 20MB
  const maxSize = 20971520;
  return (
    <DropzoneComponent minSize={0} maxSize={maxSize} onDrop={onDrag}>
      {({
        getRootProps,
        getInputProps,
        isDragActive,
        isDragReject,
        fileRejections,
      }) => {
        const isFileTooLarge =
          fileRejections.length > 0 && fileRejections[0].file.size > maxSize;

        return (
          <section className="m-4">
            <div
              {...getRootProps()}
              className={cn(
                "flex justify-center border-2 border-dashed h-52 p-5 items-center rounded-lg w-full",
                isDragActive
                  ? "bg-dropbox text-white animate-pulse"
                  : "text-slate-400 bg-slate-100/50 dark:bg-slate-800/80"
              )}
            >
              <input {...getInputProps()} />
              {!isDragActive && "Click here or drop a file to upload!"}
              {isDragActive && "Drop to upload this file!"}
              {isDragReject && "File type not accepted, sorry!"}
              {isFileTooLarge && (
                <div className="text-danger mt-2">File is too large.</div>
              )}
            </div>
          </section>
        );
      }}
    </DropzoneComponent>
  );
}

export default Dropzone;
