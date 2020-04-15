import { useState } from "react";
import useSWR from "swr";
import fetch from "unfetch";
import { useRouter } from "next/router";
import { PaginationComponent } from "../components/pagination";
import { ErrorBox } from "../components/errorBox";
import { PAGE_SIZE } from "../common/pagination";
import { EmployeeTable } from "../components/employeeTable";
import { ModalCreateEmployee } from "../components/modalCreateEmployee";

const fetcher = (arg1, arg2) => fetch(arg1, arg2).then((r) => r.json());

const Home = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const page = +(router.query.page || 1);
  const { data, error } = useSWR(`/api/employees?page=${page}`, fetcher);
  const pageAmount = Math.ceil(data?.elementsCount / PAGE_SIZE) || 1;
  return (
    <div className="pure-g">
      <div className="pure-u-1 pure-u-md-1-6"></div>
      <div className="pure-u-1 pure-u-md-2-3">
        <header>
          <h1>Employees table</h1>
          <button
            className="pure-button pure-button-primary"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            Add employee
          </button>
        </header>
        <div className="content">
          <PaginationComponent pagesAmount={pageAmount} currentPage={page} />
          {error ? (
            <ErrorBox error={error} />
          ) : (
            <EmployeeTable data={data?.data} isLoading={!data} />
          )}
          <PaginationComponent pagesAmount={pageAmount} currentPage={page} />
        </div>
      </div>
      <div className="pure-u-1 pure-u-md-1-6"></div>
      <ModalCreateEmployee
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
      />
      <style jsx global>{`
        .content > * + * {
          margin-top: 1em;
        }
        header {
          display: flex;
          align-items: center;
        }
        header > * + * {
          margin-left: 2rem;
        }
        .pure-button-primary {
          background-color: rgb(102, 127, 153);
        }
      `}</style>
    </div>
  );
};

export default Home;
