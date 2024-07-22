import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { useAppStore } from "@/store/store";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "./ui/input";
import { useUser } from "@clerk/nextjs";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "@/firebase";
import { toast } from "./ui/use-toast";

function RenameModal() {
  const { user } = useUser();
  const [fileId, fileName, isRenameModalOpen, setIsRenameModalOpen] =
    useAppStore((state) => [
      state.fileId,
      state.fileName,
      state.isRenameModalOpen,
      state.setIsRenameModalOpen,
    ]);

  const [input, setInput] = useState("");
  const renameFile = async () => {
    if (!user || !fileId) return;

    try {
      const fileType = fileName.substring(fileName.lastIndexOf("."));
      const newFileName = `${input}${fileType}`;

      toast({ description: "Renaming..." });
      await updateDoc(doc(db, "users", user.id, "files", fileId), {
        fileName: newFileName,
      })
        .then(() => {
          console.log("Updated the file");
          setInput("");
          toast({ description: "File renamed successfully" });
        })
        .finally(() => {
          setIsRenameModalOpen(false);
        });
    } catch (error) {
      console.error(error);
      toast({
        description: "Failed to rename the file",
        variant: "destructive",
      });
      setIsRenameModalOpen(false);
    }
  };
  return (
    <Dialog
      open={isRenameModalOpen}
      onOpenChange={(isOpen) => setIsRenameModalOpen(isOpen)}
    >
      <DialogContent className="space-y-4 rounded-lg">
        <DialogHeader>
          <DialogTitle>Rename the file</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label className="sr-only">Link</Label>
            <Input
              id="text"
              defaultValue={fileName.split(".")[0]}
              onChange={(e) => setInput(e.target.value)}
              onKeyDownCapture={(e) => {
                if (e.key === "Enter") {
                  renameFile();
                }
              }}
            />
          </div>
        </div>
        <DialogFooter className="flex flex-row items-center justify-between space-x-2">
          <Button
            className="w-full"
            type="button"
            variant={"outline"}
            onClick={() => setIsRenameModalOpen(false)}
          >
            Cancel
          </Button>
          <Button className="w-full" type="submit" onClick={() => renameFile()}>
            Rename
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default RenameModal;
