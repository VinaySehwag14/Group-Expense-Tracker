import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AddMemberDialog from "../shared/AddMembersDialog";

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
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [isAddMemberDialogOpen, setAddMemberDialogOpen] = useState(false);
  const [groupToDelete, setGroupToDelete] = useState<Group | null>(null);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch groups from localStorage
  useEffect(() => {
    const storedGroups = localStorage.getItem("groups");
    if (storedGroups) {
      setGroups(JSON.parse(storedGroups));
    }
  }, []);

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

    alert("Group created successfully!");
    reset();

    navigate(`/group/${newGroup.id}`);
  };

  const handleAddMember = (groupId: string, member: string) => {
    const updatedGroups = groups.map((group) =>
      group.id === groupId
        ? { ...group, members: [...group.members, member] }
        : group
    );
    setGroups(updatedGroups);
    localStorage.setItem("groups", JSON.stringify(updatedGroups));
  };

  const handleGroupClick = (groupId: string) => {
    // Navigate to the group page using the group's ID
    navigate(`/group/${groupId}`);
  };

  const handleDeleteGroup = () => {
    if (groupToDelete) {
      const updatedGroups = groups.filter(
        (group) => group.id !== groupToDelete.id
      );
      setGroups(updatedGroups);
      localStorage.setItem("groups", JSON.stringify(updatedGroups));
      setDeletePopupOpen(false);
      setGroupToDelete(null);
    }
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

      {/* Groups List */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Your Groups
        </h3>
        {groups.length === 0 ? (
          <p className="text-gray-500">No group yet, create one!</p>
        ) : (
          <ul className="space-y-4">
            {groups.map((group) => (
              <li
                key={group.id}
                className="p-4 bg-white rounded-lg shadow border flex justify-between cursor-pointer"
              >
                <div onClick={() => handleGroupClick(group.id)}>
                  <h4 className="font-medium text-gray-800 text-lg mb-2">
                    {group.name}
                  </h4>
                  <p className="text-gray-500 text-sm">
                    {group.members.length === 0
                      ? "No members added yet."
                      : `${group.members.length} member(s)`}
                  </p>
                </div>

                <div>
                  <button
                    onClick={() => {
                      setSelectedGroup(group);
                      setAddMemberDialogOpen(true);
                    }}
                    className="ml-4 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
                  >
                    Add Members
                  </button>
                  <button
                    onClick={() => {
                      setGroupToDelete(group);
                      setDeletePopupOpen(true);
                    }}
                    className="ml-2 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {selectedGroup && (
        <AddMemberDialog
          groupId={selectedGroup.id}
          isOpen={isAddMemberDialogOpen}
          onClose={() => setAddMemberDialogOpen(false)}
          onAddMember={handleAddMember}
        />
      )}

      {isDeletePopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">
              Are you sure you want to delete this group?
            </h3>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setDeletePopupOpen(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteGroup}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateGroup;
