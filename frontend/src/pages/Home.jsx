import React, { useEffect, useState } from "react";

import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { FaEdit, FaTimesCircle, FaPlus } from "react-icons/fa";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    axios
      .get("http://localhost:3000/users/get/")
      .then((res) => {

        setUsers(res.data.users);

        // console.log(`http://localhost:3000/uploads/${res.data.users[1].image}`);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoader(false);
      });
  }, []);

  return (
    <>
      <h1 className="text-center text-2xl font-bold mb-4">
        User Management System
      </h1>
      <div className="flex justify-end mb-4">
        <Link
          to="/users/create/"
          className="px-4 py-2  mr-10 text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          <FaPlus />
        </Link>
      </div>

      <br />
      {loader ? (
        <Spinner />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left border-b">Image</th>
                <th className="px-4 py-2 text-left border-b">ID</th>
                <th className="px-4 py-2 text-left border-b">Name</th>
                <th className="px-4 py-2 text-left border-b">Email</th>
                <th className="px-4 py-2 text-left border-b">Password</th>
                <th className="px-4 py-2 text-left border-b">Operations</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                return (
                  <tr key={user._id} className="hover:bg-gray-100">
                    <td className="px-4 py-2 border-b">
                      
                      <img
                      src={`http://localhost:3000/uploads/${user.image}`}
                      alt="Loading"
                        width="50px"
                        height="50px"
                      />
                    </td>
                    <td className="px-4 py-2 border-b">{user._id}</td>
                    <td className="px-4 py-2 border-b">{user.name}</td>
                    <td className="px-4 py-2 border-b">{user.email}</td>
                    <td className="px-4 py-2 border-b">{user.password}</td>
                    <td className="px-4 py-2 border-b">
                      <div className="flex justify-evenly items-center">
                        <Link to={`/users/edit/${user._id}`}>
                          <FaEdit className="hover:text-red-300 text-2xl" />
                        </Link>
                        <Link to={`/users/delete/${user._id}`}>
                          <FaTimesCircle className="hover:text-red-300 text-2xl" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Home;
