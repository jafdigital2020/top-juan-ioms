import { Link } from "react-router-dom";
import img from "/images/notfoundpage.png";

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center my-4">
      <img src={img} alt="not found image" />
      <h3 className="font-bold font-poppin text-2xl text-primary-foreground">
        Ohh! Page Not Found
      </h3>
      <p className="font-poppin">
        We couldn't found the page you're looking for...
      </p>
      <br></br>
      <p className="mb-2 font-poppin text-sm">Maybe this will help:</p>
      <Link
        to="/"
        className="bg-primary py-2 px-4 font-bold rounded text-white hover:bg-primary-foreground"
      >
        Go Back
      </Link>
    </div>
  );
}

export default NotFoundPage;
