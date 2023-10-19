import { useState } from "react";
import { useNavigate } from "react-router";

function Register() {
  let navigate = useNavigate();
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

    navigate("/complete");
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-12 mb-3">
                <label className="form-label">First Name:</label>
                <input
                  className="form-control"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  pattern="[A-Z][a-z]+"
                  required
                  placeholder="Your name"
                  onChange={handleChange}
                />
              </div>

              <div className="col-12 mb-3">
                <label className="form-label">Last Name:</label>
                <input
                  className="form-control"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  pattern="[A-Z][a-z]+"
                  required
                  placeholder="Your last name"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-12 mb-3">
                <label className="form-label">Phone Numbers:</label>
                {formData.phoneNumbers.map((phoneNumber, index) => (
                  <input
                    className="form-control mb-2"
                    type="text"
                    key={index}
                    value={phoneNumber}
                    placeholder="+370-xxx-xxxxx"
                    pattern="\+370-\d{3}-\d{5}"
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
                      phoneNumbers: [...formData.phoneNumbers, ""],
                    })
                  }
                >
                  +
                </button>
              </div>
            </div>

            <div className="row">
              <div className="col-12 mb-3">
                <label className="form-label">Groups:</label>
                {formData.groups.map((group, index) => (
                  <input
                    className="form-control mb-2"
                    type="text"
                    key={index}
                    value={group}
                    placeholder="Your group"
                    pattern="[A-Z][a-z]+"
                    onChange={(e) => handleGroupChange(index, e.target.value)}
                  />
                ))}
                <button
                  type="button"
                  className="btn btn-primary rounded-circle"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      groups: [...formData.groups, ""],
                    })
                  }
                >
                  +
                </button>
              </div>
            </div>
            <button
              className="btn btn-primary"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
