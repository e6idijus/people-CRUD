import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Edit from "../components/Edit";

function Profile() {
  const [person, setPerson] = useState({});
  const [updatePerson, setUpdatePerson] = useState(null);

  let { id } = useParams();

  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      const response = await fetch(`http://localhost:8080/people/${id}`);
      const data = await response.json();

      if (active) {
        setPerson(data);
      }
    };

    fetchData();

    return () => {
      active = false;
    };
  }, []);

  const { firstName, lastName, phoneNumbers, groups } = person;

  return (
    <>
      {
        <div>
          <p>{`First name: ${firstName}`}</p>
          <p>{`Last name: ${lastName}`}</p>
          <p>Phone numbers:</p>
          <ul>
            {phoneNumbers &&
              phoneNumbers.map((entry, index) => (
                <li key={index}>{entry.phoneNumber}</li>
              ))}
          </ul>

          <p>Groups:</p>
          <ul>
            {groups &&
              groups.map((entry, index) => <li key={index}>{entry.name}</li>)}
          </ul>
          <button onClick={() => setUpdatePerson(person)}>Edit</button>
          {updatePerson && <Edit person={updatePerson} />}
        </div>
      }
    </>
  );
}
export default Profile;
