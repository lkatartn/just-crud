import Link from "next/link";
import useSWR from "swr";
import fetch from "unfetch";

const fetcher = (url) => fetch(url).then((r) => r.json());

const Home = () => {
  const { data, error } = useSWR("/api/employees", fetcher);
  console.log(data);
  return (
    <div className="pure-g">
      <div className="pure-u-1 pure-u-md-1-6"></div>
      <div className="pure-u-1 pure-u-md-2-3">
        <h1>Employees table</h1>
        <Link href={{ pathname: "/", query: { page: 1 } }}>
          <a className="pure-button">1</a>
        </Link>
        <Link href={{ pathname: "/", query: { page: 2 } }}>
          <a className="pure-button">2</a>
        </Link>
        <table className="pure-table pure-table-bordered pure-table-stripped">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Is Active</th>
              <th>Department</th>
            </tr>
          </thead>

          <tbody>
            {(data || []).map((e) => (
              <tr>
                <td>{e.id}</td>
                <td>
                  {e.firstName} {e.lastName}
                </td>
                <td>{e.isActive.toString()}</td>
                <td>{e.department}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pure-u-1 pure-u-md-1-6"></div>
    </div>
  );
};

export default Home;
