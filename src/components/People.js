import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiEye } from "react-icons/fi";

export default function People() {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      const response = await fetch(`http://localhost:8080/people`);
      const data = await response.json();

      if (active) {
        setPeople(data);
      }
    };

    fetchData();
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="container">
      <div className="row">
        {people.map((person) => {
          return (
            <div
              className="col-12 col-md-4"
              key={person.id}
            >
              <div className="row border-bottom border-primary mb-2 m-0">
                <p className="col-10 col-md-10 col-sm-11 mb-1">
                  {person.firstName} {person.lastName}
                </p>
                <Link
                  className="col-2 col-md-2 col-sm-1"
                  to={`/Profile/${person.id}`}
                >
                  <FiEye title="View Profile" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
