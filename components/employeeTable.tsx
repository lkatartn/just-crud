import { FunctionComponent } from "react";
import { PAGE_SIZE } from "../common/pagination";
import { EmployeeData } from "../common/employeeModel";

interface Props {
  isLoading?: boolean;
  data: EmployeeData[];
}

const TableRow = (props: { e: EmployeeData }) => {
  const { e } = props;
  if (!e)
    return (
      <tr>
        <td>
          <i style={{ display: "inline-block", minHeight: "1em" }}></i>
        </td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    );
  return (
    <tr>
      <td>{e.id}</td>
      <td>
        {e.firstName} {e.lastName}
      </td>
      <td>{e.isActive.toString()}</td>
      <td>{e.department}</td>
    </tr>
  );
};

export const EmployeeTable: FunctionComponent<Props> = (props) => {
  const { data, isLoading } = props;
  return (
    <table
      className={`pure-table pure-table-bordered pure-table-striped ${
        isLoading ? "skeleton-animation" : ""
      }`}
    >
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Is Active</th>
          <th>Department</th>
        </tr>
      </thead>

      <tbody>
        {isLoading
          ? Array(PAGE_SIZE)
              .fill(null)
              .map((_, i) => {
                return <TableRow e={_} key={i} />;
              })
          : (data || []).map((e) => <TableRow e={e} key={e.id} />)}
      </tbody>
      <style jsx>
        {`
          table {
            width: 100%;
          }

          @keyframes skeletonShimmer {
            0% {
              background-position: 100% 0;
            }
            100% {
              background-position: -100% 0;
            }
          }

          .skeleton-animation {
            animation-duration: 1s;
            animation-fill-mode: forwards;
            animation-iteration-count: infinite;
            animation-name: skeletonShimmer;
            animation-timing-function: cubic-bezier(0.17, 0.67, 0.83, 0.67);
            background: #f4f4f4;
            background: linear-gradient(
              to right,
              #f4f4f4 0%,
              #d8d8d8 50%,
              #f4f4f4 100%
            );
            background-size: 200% 100%;
          }
        `}
      </style>
    </table>
  );
};
