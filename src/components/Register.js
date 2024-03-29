import { useState } from "react";

function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumbers: [""],
    groups: [""],
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
    newPhoneNumbers[index] = value;
    setFormData({
      ...formData,
      phoneNumbers: newPhoneNumbers,
    });
  };

  const handleGroupChange = (index, value) => {
    const newGroups = [...formData.groups];
    newGroups[index] = value;
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
      phoneNumbers: formData.phoneNumbers.map((phoneNumber) => ({
        phoneNumber,
      })),
      groups: formData.groups.map((name) => ({
        name,
      })),
    };

    fetch("http://localhost:8080/people", {
      method: "POST",
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
        {formData.phoneNumbers.map((phoneNumber, index) => (
          <input
            type="text"
            key={index}
            value={phoneNumber}
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
              phoneNumbers: [...formData.phoneNumbers, ""],
            })
          }
        >
          Add Phone Number
        </button>
      </label>
      <br />
      <label>
        Groups:
        {formData.groups.map((group, index) => (
          <input
            type="text"
            key={index}
            value={group}
            onChange={(e) => handleGroupChange(index, e.target.value)}
          />
        ))}
        <button
          type="button"
          onClick={() =>
            setFormData({
              ...formData,
              groups: [...formData.groups, ""],
            })
          }
        >
          Add Group
        </button>
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default Register;
