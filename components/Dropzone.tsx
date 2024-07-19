import { cn } from "@/lib/utils";
import DropzoneComponent from "react-dropzone";

function Dropzone() {
  //max size 20MB
  const maxSize = 20971520;
  return (
    <DropzoneComponent
      minSize={0}
      maxSize={maxSize}
      onDrop={(acceptedFiles) => console.log(acceptedFiles)}
    >
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
            <div {...getRootProps()} className={cn("flex justify-center border-2 border-dashed h-52 p-5 items-center rounded-lg w-full",isDragActive ? "bg-dropbox text-white animate-pulse"
                  : "text-slate-400 bg-slate-100/50 dark:bg-slate-800/80")}>
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
