import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
    <>
      {people.map((person) => {
        return (
          <div key={person.id}>
            <p>
              {person.firstName} {person.lastName}
              <Link to={`/Profile/${person.id}`}>View more</Link>
            </p>
          </div>
        );
      })}
    </>
  );

  // return <div className="row pt-4">{People}</div>;
}
