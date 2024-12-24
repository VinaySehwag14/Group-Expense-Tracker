import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

interface Group {
  id: string;
  name: string;
  members: [];
}

interface GroupFormValues {
  groupName: string;
}

const CreateGroup = () => {
  const { handleSubmit, control, reset } = useForm<GroupFormValues>({
    defaultValues: {
      groupName: "",
    },
  });

  const [groups, setGroups] = useState<Group[]>([]);
  const [popupOpen, setPopupOpen] = useState(false);
  const [currentGroupLink, setCurrentGroupLink] = useState("");

  const onSubmit = (data: GroupFormValues) => {
    const newGroup: Group = {
      id: crypto.randomUUID(),
      name: data.groupName,
      members: [],
    };

    const updatedGroups = [...groups, newGroup];
    setGroups(updatedGroups);

    // Save to localStorage
    localStorage.setItem("groups", JSON.stringify(updatedGroups));

    // Generate Group Link
    const groupLink = `${window.location.origin}/join/${newGroup.id}`;
    setCurrentGroupLink(groupLink);

    // Open Confirmation Popup
    setPopupOpen(true);

    reset();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentGroupLink);
    alert("Group link copied to clipboard!");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Create a New Group
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Group Name Field */}
        <Controller
          name="groupName"
          control={control}
          rules={{ required: "Group name is required" }}
          render={({ field, fieldState }) => (
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Group Name
              </label>
              <input
                {...field}
                type="text"
                placeholder="Enter group name"
                className={`w-full p-3 border ${
                  fieldState.error ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {fieldState.error && (
                <p className="text-red-500 text-sm mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium text-lg hover:bg-blue-600 transition duration-200"
        >
          Create Group
        </button>
      </form>

      {/* Confirmation Dialog */}
      <Dialog open={popupOpen} onOpenChange={setPopupOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Group Created Successfully!</DialogTitle>
            <DialogDescription>
              Share the group link with others to add members.
            </DialogDescription>
          </DialogHeader>

          <div className="bg-gray-100 p-4 rounded-md flex items-center justify-between mb-4">
            <span className="text-gray-700">{currentGroupLink}</span>
            <Button variant="outline" onClick={handleCopyLink}>
              Copy Link
            </Button>
          </div>

          <div className="flex space-x-4">
            {/* Social Media Sharing */}
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                currentGroupLink
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800"
            >
              Share on Facebook
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                currentGroupLink
              )}&text=Join+my+group!`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-400 text-white px-4 py-2 rounded-md hover:bg-blue-500"
            >
              Share on Twitter
            </a>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(
                "Join my group: " + currentGroupLink
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              Share on WhatsApp
            </a>
          </div>

          <DialogFooter>
            <Button variant="default" onClick={() => setPopupOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateGroup;
