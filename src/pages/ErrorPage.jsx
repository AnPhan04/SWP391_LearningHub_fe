import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <img src="/img/error.png" alt="404 " style={{margin:"5rem 0"}}/>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
