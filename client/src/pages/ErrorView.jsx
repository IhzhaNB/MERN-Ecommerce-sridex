import { Link, useRouteError } from "react-router-dom";

const ErrorView = () => {
  const error = useRouteError();
  if (error.status === 404) {
    return (
      <main className="grid min-h-[100vh] place-items-center px-8">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-primary">404</h1>
          <p className="mt-6 text-lg leading-7">Path Not Found</p>
          <div className="mt-10">
            <Link className="btn btn-primary" to={"/"}>
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    );
  } else if (error.status === 500) {
    return (
      <main className="grid min-h-[100vh] place-items-center px-8">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-primary">500</h1>
          <p className="mt-6 text-lg leading-7">Oops, something went wrong</p>
          <p className="mt-6 text-lg leading-7">
            Try to refhresh this page or feel free to contact us if the problem
            persists
          </p>
          <div className="mt-10">
            <Link className="btn btn-primary" to={"/"}>
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    );
  }
};

export default ErrorView;
