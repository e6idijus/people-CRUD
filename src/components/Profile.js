import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function Profile() {
  const [person, setPerson] = useState({});
  // let navigate = useNavigate();
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

  // const profile = (
  //   <div>
  //     <p>{`First name: ${firstName}`}</p>
  //     <p>{`First name: ${lastName}`}</p>
  //     <p>Phone numbers:</p>
  //     <ul>
  //       {person &&
  //         phoneNumbers.map((entry, index) => (
  //           <li key={index}>{entry.phoneNumber}</li>
  //         ))}
  //     </ul>

  //     <p>Groups:</p>
  //     <ul>
  //       {person &&
  //         groups.map((entry, index) => <li key={index}>{entry.name}</li>)}
  //     </ul>
  //   </div>
  // );

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
        </div>
      }
    </>
  );
}
export default Profile;
