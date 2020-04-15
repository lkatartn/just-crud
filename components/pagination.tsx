import { FunctionComponent } from "react";
import Link from "next/link";

interface Props {
  currentPage: number;
  pagesAmount: number;
}
export const PaginationComponent: FunctionComponent<Props> = (props) => {
  const { currentPage, pagesAmount } = props;
  const prevPage = currentPage - 1 || 1;
  const nextPage = currentPage < pagesAmount ? currentPage + 1 : currentPage;
  return (
    <div>
      <Link href={{ pathname: "/", query: { page: prevPage } }}>
        <a className="pure-button page">{` < `}</a>
      </Link>
      {Array(props.pagesAmount)
        .fill(1)
        .map((_, index) => {
          if (index + 1 == props.currentPage)
            return (
              <a
                className="pure-button pure-button-disabled page"
                href="#"
                key={index}
              >
                {index + 1}
              </a>
            );
          return (
            <Link
              href={{ pathname: "/", query: { page: index + 1 } }}
              key={index}
            >
              <a className="pure-button page">{index + 1}</a>
            </Link>
          );
        })}
      <Link
        href={{
          pathname: "/",
          query: {
            page: nextPage,
          },
        }}
      >
        <a className="pure-button page">{` > `}</a>
      </Link>
      <style jsx>
        {`
          .page {
            margin-right: 1px;
            padding: 0.2em 0.5em;
            background: white;
          }
        `}
      </style>
    </div>
  );
};
