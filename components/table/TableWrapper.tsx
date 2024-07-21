"use client";

import { useUser } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { columns } from "./Columns";
import { DataTable } from "./DataTable";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, query, orderBy } from "firebase/firestore";
import { db } from "@/firebase";

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

  if(docs?.docs.length === undefined) return (
    <div>Loading</div>
  )

  return (
    <div className="space-y-5">
      <Button onClick={() => setSort(sort === "desc" ? "asc" : "desc")}>
        Sort By {sort === "desc" ? "Newest" : "Oldest"}
      </Button>
      <DataTable columns={columns} data={initialFiles} />
    </div>
  );
}

export default TableWrapper;
