import { useState } from "react";
import { useId } from "react";
import Country from "./Country";

function Edit({ person, setUpdatePerson }) {
  const [formData, setFormData] = useState({
    firstName: person.firstName,
    lastName: person.lastName,
    country: person.country,
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

  const handleCountryChange = (selectedCountry) => {
    setFormData({
      ...formData,
      country: selectedCountry,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToPost = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      country: formData.country,
      phoneNumbers: formData.phoneNumbers,
      groups: formData.groups,
    };

    console.log(JSON.stringify(dataToPost));

    fetch(`http://localhost:8080/people/${person.id}`, {
      method: "PUT",
      body: JSON.stringify(dataToPost),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setUpdatePerson(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>First Name:</label>
      <input
        className="form-control"
        type="text"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
      />
      <label>Last Name:</label>
      <input
        className="form-control"
        type="text"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
      />
      <Country
        selectedCountry={formData.country}
        onCountryChange={handleCountryChange}
      />
      <label>
        Phone Numbers:
        {formData.phoneNumbers.map((p, index) => (
          <input
            className="form-control"
            type="text"
            key={index}
            value={p.phoneNumber}
            onChange={(e) => {
              handlePhoneChange(index, e.target.value);
            }}
          />
        ))}
        <button
          className="btn btn-primary rounded-circle"
          type="button"
          onClick={() =>
            setFormData({
              ...formData,
              phoneNumbers: [...formData.phoneNumbers, { phoneNumber: "" }],
            })
          }
        >
          +
        </button>
      </label>
      <br />
      <label>
        Groups:
        {formData.groups.map((g, index) => (
          <input
            className="form-control"
            type="text"
            key={index}
            value={g.name}
            onChange={(e) => handleGroupChange(index, e.target.value)}
          />
        ))}
        <button
          className="btn btn-primary rounded-circle"
          type="button"
          onClick={() =>
            setFormData({
              ...formData,
              groups: [...formData.groups, { name: "" }],
            })
          }
        >
          +
        </button>
      </label>
      <br />
      <button
        className="btn btn-primary"
        type="submit"
      >
        Update
      </button>
    </form>
  );
}

export default Edit;
