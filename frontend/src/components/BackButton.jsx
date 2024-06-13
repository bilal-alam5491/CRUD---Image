import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const BackButton = () => {
  return (
<>
<div className="p-4 flex items-center">
      <Link
        to="/"
        className="flex items-center text-white bg-purple-500 hover:bg-purple-700 font-semibold py-2 px-4 rounded w-[10%]"
      >
        <FaArrowLeft className="mr-2" />
        Back
      </Link>
    </div>
</>

)
    
};

export default BackButton;
