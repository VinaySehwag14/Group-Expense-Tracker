import { useParams } from "react-router-dom";

const JoinGroup = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Join Group</h1>
      {id ? <p>Group ID: {id}</p> : <p>Loading...</p>}
    </div>
  );
};

export default JoinGroup;
