import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

const DeleteUser = () => {
  const { id } = useParams();
  const navigator = useNavigate();
  const [loader, setLoader] = useState(false);

  function handleDelete() {
    axios
      .delete(`http://localhost:3000/users/delete/${id}`)
      .then(() => {
        setLoader(false);
        navigator("/");
      })
      .catch((err) => {
        alert("An Error occurred.");
        console.log(err.message);
        setLoader(false);
      });
  }
  return (
    <>
      <BackButton />
      {loader ? (
        <Spinner />
      ) : (
        <>
          <h1 className="text-center text-3xl font-bold mb-6">
            Do you want to delete the Book?
          </h1>
          <div className="flex justify-center">
            <button
              className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700"
              onClick={handleDelete}
            >
              Yes, Delete it
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default DeleteUser;
