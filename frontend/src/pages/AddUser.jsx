import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);

  const [loader, setLoader] = useState(false);

  const navigator = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("imgKey", image); // This must match the multer field name

    // console.log(dataToAdd)

    setLoader(true);

    axios
      .post("http://localhost:3000/users/add", formData)
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
        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto p-4 bg-white shadow-md rounded"
        >
          <h1 className="text-center text-3xl font-bold mb-6">Add a User</h1>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-bold mb-2"
            >
              Name:
            </label>
            <input
              required
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="author"
              className="block text-gray-700 font-bold mb-2"
            >
              Email:
            </label>
            <input
              required
              type="text"
              name="author"
              id="author"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="publishYear"
              className="block text-gray-700 font-bold mb-2"
            >
              Password:
            </label>
            <input
              required
              type="text"
              name="publishYear"
              id="publishYear"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="author"
              className="block text-gray-700 font-bold mb-2"
            >
              Upload Image:
            </label>
            <input
              required
              type="file"
              name="file"
              id="file"
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default AddUser;
