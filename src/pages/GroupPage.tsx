import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const GroupPage = () => {
  const { id } = useParams();

  const [group, setGroup] = useState(null);

  useEffect(() => {
    // Fetch group from localStorage based on ID
    const storedGroups = localStorage.getItem("groups");
    if (storedGroups) {
      const groups = JSON.parse(storedGroups);
      const foundGroup = groups.find((group) => group.id === id);
      setGroup(foundGroup);
    }
  }, [id]);

  if (!group) {
    return <p>Group not found.</p>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Group: {group.name}
      </h2>
      <p>
        Members:{" "}
        {group.members.length === 0
          ? "No members yet"
          : group.members.join(", ")}
      </p>
      {/* You can add more details here */}
    </div>
  );
};

export default GroupPage;
