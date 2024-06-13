import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

const EditUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [prevImage, setPrevImage] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [newImagePreview, setNewImagePreview] = useState('');

  const [loader, setLoader] = useState(false);
  const { id } = useParams();
  let prevImg;

  const navigator = useNavigate();

  useEffect(() => {
    setLoader(true);
    axios
      .get(`http://localhost:3000/users/get/${id}`)
      .then((res) => {
        let data = res.data.user;
        // console.log(data)

        setName(data.name);
        setEmail(data.email);
        setPassword(data.password);
        setPrevImage(`http://localhost:3000/uploads/${data.image}`);
        // console.log(prevImg)

        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
        console.log(err.message);
        alert(err.message);
      });
  }, []);

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);

      setNewImagePreview(URL.createObjectURL(e.target.files[0]));

      // const reader = new FileReader();
      // reader.onloadend = () => {
      //   setNewImagePreview(reader.result);
      // };
      // reader.readAsDataURL(file);
    } else {
      setNewImage(null);
      setNewImagePreview(null);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("imgKey", newImage); // This must match the multer field name

    // console.log(dataToAdd)

    setLoader(true);

    axios
      .put(`http://localhost:3000/users/update/${id}`, formData)
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
          <h1 className="text-center text-3xl font-bold mb-6">Edit User</h1>
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
              Existing Image:
            </label>
            <img src={prevImage} width={"50px"} height={"50px"} alt="Loading" />
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
              onChange={handleImageChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          {newImagePreview && (
            <div className="mb-4">
              <label
                htmlFor="newImagePreview"
                className="block text-gray-700 font-bold mb-2"
              >
                New Image Preview:
              </label>
              <img
                src={newImagePreview}
                alt="New Preview"
                width={"50px"}
                height={"50px"}
              />
            </div>
          )}

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

export default EditUser;
