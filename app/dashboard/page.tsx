
import Dropzone from "@/components/Dropzone";
import TableWrapper from "@/components/table/TableWrapper";
import { db } from "@/firebase";
import { auth, useAuth } from "@clerk/nextjs";
import { collection, getDocs } from "firebase/firestore";

async function DashboardPage() {
  const { userId } = auth();

  const docsResults = await getDocs(collection(db, "users", userId!, "files"));
  const skeletonFiles: FileType[] = docsResults.docs.map((doc) => ({
    id: doc.id,
    fullName: doc.data().fullName,
    downloadUrl: doc.data().downloadUrl,
    fileName: doc.data().fileName || doc.data(),
    type: doc.data().type,
    size: doc.data().size,
    timestamp: new Date(doc.data().timestamp?.seconds * 1000) || undefined,
  }));

  return (
    <div className="border-t">
      <Dropzone />
      <section className="container space-y-5">
        <h2 className="font-bold">All Files</h2>
        <TableWrapper skeletonFiles={skeletonFiles} />
      </section>
    </div>
  );
}

export default DashboardPage;
