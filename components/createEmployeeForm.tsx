import { useForm, ErrorMessage } from "react-hook-form";
import { Department } from "../common/employeeModel";

export const CreateEmployeeForm = ({ onSubmit }) => {
  const { register, handleSubmit } = useForm();

  return (
    <form
      className="pure-form pure-form-aligned"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="pure-control-group">
        <label htmlFor="firstName-input">First Name</label>
        <input
          id="firstName-input"
          name="firstName"
          type="text"
          required
          ref={register}
        />
      </div>
      <div className="pure-control-group">
        <label htmlFor="lastName-input">Last Name</label>
        <input
          required
          id="lastName-input"
          name="lastName"
          type="text"
          ref={register}
        />
      </div>
      <div className="pure-control-group">
        <label htmlFor="department-select">Department</label>
        <select
          required
          name="department"
          id="department-select"
          ref={register}
        >
          {Object.values(Department).map((dep) => {
            return (
              <option value={dep} key={dep}>
                {dep}
              </option>
            );
          })}
        </select>
      </div>
      <div className="pure-controls">
        <label htmlFor="active-checkbox" className="pure-checkbox">
          <input
            id="active-checkbox"
            type="checkbox"
            name="isActive"
            ref={register}
          />{" "}
          Is Active
        </label>
        <button
          type="submit"
          className="pure-button pure-button-primary button-submit"
        >
          Submit
        </button>
      </div>
      <style jsx>{`
        .button-submit {
          margin-top: 1rem;
        }
      `}</style>
    </form>
  );
};
