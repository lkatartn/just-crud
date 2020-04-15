import { FunctionComponent } from "react";
import Link from "next/link";

interface Props {
  currentPage: number;
  pagesAmount: number;
}
const Page: FunctionComponent<{ page: number; isCurrent?: boolean }> = ({
  page,
  children,
  isCurrent,
}) => {
  return (
    <>
      <style jsx>
        {`
          .page {
            margin-right: 1px;
            padding: 0.2em 0.5em;
            background: white;
          }
        `}
      </style>
      {isCurrent ? (
        <a className="pure-button pure-button-disabled page" href="#">
          {children}
        </a>
      ) : (
        <Link href={{ pathname: "/", query: { page } }}>
          <a className="pure-button page">{children}</a>
        </Link>
      )}
    </>
  );
};

export const PaginationComponent: FunctionComponent<Props> = (props) => {
  const { currentPage, pagesAmount } = props;
  const prevPage = currentPage - 1 || 1;
  const nextPage = currentPage < pagesAmount ? currentPage + 1 : currentPage;
  return (
    <div>
      <Page page={prevPage}>{` < `}</Page>
      {Array(props.pagesAmount)
        .fill(1)
        .map((_, index) => {
          const pageOrder = index + 1;
          return (
            <Page
              page={pageOrder}
              isCurrent={pageOrder == currentPage}
              key={index}
            >
              {pageOrder}
            </Page>
          );
        })}
      <Page page={nextPage}>{` > `}</Page>
    </div>
  );
};
