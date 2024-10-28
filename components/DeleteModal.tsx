"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { useAppStore } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import { deleteObject, ref } from "firebase/storage";
import { db, storage } from "@/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { toast } from "./ui/use-toast";

function DeleteModal() {
  const { user } = useUser();

  const [fileId, isDeleteModalOpen, setIsDeleteModalOpen] = useAppStore(
    (state) => [
      state.fileId,
      state.isDeleteModalOpen,
      state.setIsDeleteModalOpen,
    ]
  );

  const deleteFile = async () => {
    if (!user || !fileId) return;

    const fileRef = ref(storage, `users/${user.id}/files/${fileId}`);

    try {
      toast({ description: "Deleting..." });
      deleteObject(fileRef)
        .then(() => {
          deleteDoc(doc(db, "users", user.id, "files", fileId)).then(() => {
            console.log("Deleted");
            toast({ description: "File deleted successfully" });
          });
        })
        .finally(() => {
          console.log("Deleted the file");
          setIsDeleteModalOpen(false);
        });
    } catch (error) {
      console.error(error);
      toast({
        description: "Failed to delete the file",
        variant: "destructive",
      });
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <Dialog
      open={isDeleteModalOpen}
      onOpenChange={(isOpen) => setIsDeleteModalOpen(isOpen)}
    >
      <DialogContent className="space-y-4 rounded-lg">
        <DialogHeader>
          <DialogTitle>You want to delete this file?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            file!
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-row items-center space-x-2">
          <Button
            className="flex-1 px-3"
            type="button"
            onClick={() => setIsDeleteModalOpen(false)}
          >
            Cancel
          </Button>
          <Button
            className="flex-1 px-3"
            type="submit"
            variant={"destructive"}
            onClick={() => deleteFile()}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteModal;
