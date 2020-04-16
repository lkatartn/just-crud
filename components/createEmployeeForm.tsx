import { useForm } from "react-hook-form";
import { Department, EmployeeData } from "../common/employeeModel";
import { FunctionComponent } from "react";

interface CreateEmployeeFormProps {
  onSubmit: (e: Omit<EmployeeData, "id">) => void;
}

interface EditEmployeeProps {
  employee: EmployeeData;
  onSave: (e: EmployeeData) => void;
  onCancel: () => void;
}

type Props = CreateEmployeeFormProps | EditEmployeeProps;

function isCreateForm(a: Props): a is CreateEmployeeFormProps {
  return !!(a as CreateEmployeeFormProps).onSubmit;
}
export const CreateEmployeeForm: FunctionComponent<Props> = (props) => {
  const { register, handleSubmit } = useForm();

  return (
    <form
      className="pure-form pure-form-aligned"
      onSubmit={handleSubmit(
        isCreateForm(props) ? props.onSubmit : props.onSave
      )}
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
