import { useState } from "react"
import Axios from "axios"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"


const Register = () => {

  const navigate = useNavigate()

  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [phoneNumber, setPhoneNumber] = useState()
  const [address, setAddress] = useState()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await Axios({
        url: "http://localhost:3000/users/register",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`
        },
        data: { username, email, password, phoneNumber, address }
      })
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Succesfully",
        showConfirmButton: false,
        timer: 1500
      });
      navigate('/')
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-black-700 uppercase">
          Sign Up
        </h1>
        <form className="mt-6">
          <div className="mb-2">
            <label
              htmlFor="username"
              className="block text-sm font-semibold text-gray-800"
            >
              Username
            </label>
            <input
              type="username"
              placeholder="Enter Your Username"
              autoComplete="yes"
              value={username}
              onChange={(el) => setUsername(el.target.value)}
              className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Enter Your Email"
              autoComplete="yes"
              value={email}
              onChange={(el) => setEmail(el.target.value)}
              className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Enter Your Password"
              autoComplete="yes"
              value={password}
              onChange={(el) => setPassword(el.target.value)}
              className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-semibold text-gray-800"
            >
              PhoneNumber
            </label>
            <input
              type="phoneNumber"
              placeholder="Enter Your Phone Number"
              autoComplete="yes"
              value={phoneNumber}
              onChange={(el) => setPhoneNumber(el.target.value)}
              className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border rounded-md focus:border-black-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="address"
              className="block text-sm font-semibold text-gray-800"
            >
              Addres
            </label>
            <input
              type="Address"
              placeholder="Enter Your Address"
              autoComplete="yes"
              value={address}
              onChange={(el) => setAddress(el.target.value)}
              className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border rounded-md focus:border-black-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-6">
            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-700 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600" type="submit" onClick={(e) => handleSubmit(e)}>
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
