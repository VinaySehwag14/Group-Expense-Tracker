import { Controller, useForm } from "react-hook-form";

interface Contact {
  id: string;
  name: string;
  phone: string;
}

interface GroupFormValues {
  groupName: string;
  selectedContacts: string[];
}

const CreateGroup = () => {
  const { handleSubmit, control, reset } = useForm<GroupFormValues>({
    defaultValues: {
      groupName: "",
      selectedContacts: [],
    },
  });

  const contacts: Contact[] = [
    { id: "1", name: "John Doe", phone: "1234567890" },
    { id: "2", name: "Jane Smith", phone: "0987654321" },
  ];

  const onSubmit = (data: GroupFormValues) => {
    const selectedContacts = contacts.filter((contact) =>
      data.selectedContacts.includes(contact.id)
    );

    const newGroup = {
      id: crypto.randomUUID(),
      name: data.groupName,
      members: selectedContacts,
    };

    console.log("Group Created:", newGroup);
    alert("Group created successfully!");

    // Reset form
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 max-w-md mx-auto bg-white rounded shadow"
    >
      <h2 className="text-xl font-bold mb-4">Create a New Group</h2>

      {/* Group Name Field */}
      <Controller
        name="groupName"
        control={control}
        rules={{ required: "Group name is required" }}
        render={({ field, fieldState }) => (
          <div className="mb-4">
            <input
              {...field}
              type="text"
              placeholder="Group Name"
              className={`w-full p-2 border ${
                fieldState.error ? "border-red-500" : "border-gray-300"
              } rounded`}
            />
            {fieldState.error && (
              <p className="text-red-500 text-sm">{fieldState.error.message}</p>
            )}
          </div>
        )}
      />

      {/* Select Members Field */}
      <Controller
        name="selectedContacts"
        control={control}
        rules={{
          validate: (value) =>
            value.length > 0 || "Please select at least one contact",
        }}
        render={({ field, fieldState }) => (
          <div>
            <h3 className="mb-2">Select Members:</h3>
            {contacts.map((contact) => (
              <label key={contact.id} className="block mb-1">
                <input
                  type="checkbox"
                  value={contact.id}
                  checked={field.value.includes(contact.id)}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    const updatedSelection = checked
                      ? [...field.value, contact.id]
                      : field.value.filter((id) => id !== contact.id);
                    field.onChange(updatedSelection);
                  }}
                />
                <span className="ml-2">{contact.name}</span>
              </label>
            ))}
            {fieldState.error && (
              <p className="text-red-500 text-sm">{fieldState.error.message}</p>
            )}
          </div>
        )}
      />

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
      >
        Create Group
      </button>
    </form>
  );
};

export default CreateGroup;
