import * as Dialog from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import { useState } from "react";

interface AddMemberDialogProps {
  groupId: string;
  isOpen: boolean;
  onClose: () => void;
  onAddMember: (groupId: string, member: string) => void;
}

const AddMemberDialog = ({
  groupId,
  isOpen,
  onClose,
  onAddMember,
}: AddMemberDialogProps) => {
  const [memberName, setMemberName] = useState("");

  const handleAddMember = () => {
    if (memberName.trim() === "") return;
    onAddMember(groupId, memberName.trim());
    setMemberName("");
    onClose();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      {/* Overlay: Backdrop */}
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-50 z-40" />
      {/* Dialog content: Popup */}
      <Dialog.Content
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{
          maxWidth: "500px",
          maxHeight: "500px",
          margin: "auto",
        }}
      >
        <div className="w-full bg-white p-6 rounded-md shadow-md relative">
          <Dialog.Close
            className="absolute top-2 right-2 p-2"
            aria-label="Close"
          >
            <XIcon className="text-gray-500" />
          </Dialog.Close>
          <h3 className="text-xl font-semibold mb-4">Add Members</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter member name"
              value={memberName}
              onChange={(e) => setMemberName(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
            <button
              onClick={handleAddMember}
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            >
              Add Member
            </button>
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default AddMemberDialog;
