"use client";

import { useUser } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { columns } from "./Columns";
import { DataTable } from "./DataTable";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, query, orderBy } from "firebase/firestore";
import { db } from "@/firebase";
import { Skeleton } from "../ui/skeleton";

function TableWrapper({ skeletonFiles }: { skeletonFiles: FileType[] }) {
  const { user } = useUser();
  const [sort, setSort] = useState<"asc" | "desc">("desc");
  const [initialFiles, setInitialFiles] = useState<FileType[]>([]);

  const [docs, loading, error] = useCollection(
    user &&
      query(
        collection(db, "users", user.id!, "files"),
        orderBy("timestamp", sort)
      )
  );

  useEffect(() => {
    if (!docs) return;

    const files: FileType[] = docs.docs.map((doc) => ({
      id: doc.id,
      fullName: doc.data().fullName,
      downloadUrl: doc.data().downloadUrl,
      fileName: doc.data().fileName || doc.data(),
      type: doc.data().type,
      size: doc.data().size,
      timestamp: new Date(doc.data().timestamp?.seconds * 1000) || undefined,
    }));

    setInitialFiles(files);
  }, [docs]);

  if (docs?.docs.length === undefined)
    return (
      <div className="flex flex-col">
        <Button variant={"outline"} className="ml-auto w-32 h-10 mb-5">
          <Skeleton className="h-5 w-full" />
        </Button>

        <div className="border rounded-lg">
          <div className="border-b h-12" />
          {skeletonFiles.map((file) => (
            <div key={file.id} className="flex space-x-4 m-4 items-center">
              <Skeleton className="w-12 h-12" />
              <Skeleton className="w-full h-12" />
            </div>
          ))}
          {skeletonFiles.length === 0 && (
            <div className="flex space-x-4 m-4 items-center">
              <Skeleton className="w-12 h-12" />
              <Skeleton className="w-full h-12" />
            </div>
          )}
        </div>
      </div>
    );

  return (
    <div className="flex flex-col space-y-5 pb-10">
      <Button
        variant={"outline"}
        className="w-fit ml-auto"
        onClick={() => setSort(sort === "desc" ? "asc" : "desc")}
      >
        Sort By {sort === "desc" ? "Newest" : "Oldest"}
      </Button>
      <DataTable columns={columns} data={initialFiles} />
    </div>
  );
}

export default TableWrapper;
