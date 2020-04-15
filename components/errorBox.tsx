import { FunctionComponent } from "react";

interface Props {
  error: Error;
}

export const ErrorBox: FunctionComponent<Props> = (props) => {
  return (
    <div>
      <b>{props.error.name}</b>: <p>{props.error.message}</p>
      <style jsx>
        {`
          div {
            border: solid 1px firebrick;
            padding: 1em 2em;
            border-radius: 2px;
            background: rgba(178, 34, 34, 0.1);
            color: firebrick;
            width: content;
          }
        `}
      </style>
    </div>
  );
};

export default ErrorBox;
