import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Edit from "../components/Edit";

function Profile() {
  const [person, setPerson] = useState({});
  const [updatePerson, setUpdatePerson] = useState(null);

  let { id } = useParams();
  let navigate = useNavigate();

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
  }, [person]);

  const { firstName, lastName, country, phoneNumbers, groups } = person;

  const handleDeletePerson = () => {
    fetch(`http://localhost:8080/people/${person.id}`, {
      method: "Delete",
      //body: JSON.stringify(dataToPost),
      headers: {
        "Content-Type": "application/json",
      },
    });

    navigate("/deleted");
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          {
            <div className="row">
              <div className="col-12 mb-3">
                <p>{`First name: ${firstName}`}</p>
                <p>{`Last name: ${lastName}`}</p>
                <p>{`Country: ${country}`}</p>
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
                    groups.map((entry, index) => (
                      <li key={index}>{entry.name}</li>
                    ))}
                </ul>
                <button
                  className="btn btn-success me-1 mb-4"
                  onClick={() => setUpdatePerson(person)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger mb-4"
                  onClick={() => handleDeletePerson()}
                >
                  Delete
                </button>
                {updatePerson && (
                  <Edit
                    person={updatePerson}
                    setUpdatePerson={setUpdatePerson}
                  />
                )}
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  );
}
export default Profile;
