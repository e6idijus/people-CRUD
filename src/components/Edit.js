import { useState } from "react";
import { useId } from "react";

function Edit({ person }) {
  const [formData, setFormData] = useState({
    firstName: person.firstName,
    lastName: person.lastName,
    phoneNumbers: person.phoneNumbers,
    groups: person.groups,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePhoneChange = (index, value) => {
    const newPhoneNumbers = [...formData.phoneNumbers];
    newPhoneNumbers[index].phoneNumber = value;
    setFormData({
      ...formData,
      phoneNumbers: newPhoneNumbers,
    });
  };

  const handleGroupChange = (index, value) => {
    const newGroups = [...formData.groups];
    newGroups[index].name = value;
    setFormData({
      ...formData,
      groups: newGroups,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToPost = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      phoneNumbers: formData.phoneNumbers,
      groups: formData.groups,
    };

    fetch(`http://localhost:8080/people/${person.id}`, {
      method: "PUT",
      body: JSON.stringify(dataToPost),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Last Name:
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Phone Numbers:
        {formData.phoneNumbers.map((p, index) => (
          <input
            type="text"
            key={index}
            value={p.phoneNumber}
            onChange={(e) => {
              handlePhoneChange(index, e.target.value);
            }}
          />
        ))}
        <button
          type="button"
          onClick={() =>
            setFormData({
              ...formData,
              phoneNumbers: [...formData.phoneNumbers, { phoneNumber: "" }],
            })
          }
        >
          Add Phone Number
        </button>
      </label>
      <br />
      <label>
        Groups:
        {formData.groups.map((g, index) => (
          <input
            type="text"
            key={index}
            value={g.name}
            onChange={(e) => handleGroupChange(index, e.target.value)}
          />
        ))}
        <button
          type="button"
          onClick={() =>
            setFormData({
              ...formData,
              groups: [...formData.groups, { name: "" }],
            })
          }
        >
          Add Group
        </button>
      </label>
      <br />
      <button type="submit">Update</button>
    </form>
  );
}

export default Edit;
