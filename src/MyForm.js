import React from "react";

const MyForm = () => {
  return (
    <div>
      <h2>Sample Bootstrap Form</h2>
      <form>
        <div>
          <label
            name="name"
            className="form-label"
          >
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="email"
            className="form-label"
          >
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="message"
            className="form-label"
          >
            Message
          </label>
          <textarea
            className="form-control"
            id="message"
            rows="4"
          ></textarea>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default MyForm;
