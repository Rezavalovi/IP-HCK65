import Axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Swal from 'sweetalert2';


const UpdateForm = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [address, setAddress] = useState("")


    const [currentData, setcurrentData] = useState(null)
    const findData = async () => {
        try {
            const { data } = await Axios({
                url: `http://localhost:3000/users`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                },
            })

            setcurrentData(data)
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        findData()
    }, [])

    useEffect(() => {
        if (currentData) {
            setUsername(currentData.username)
            setPhoneNumber(currentData.phoneNumber)
            setAddress(currentData.address) }
    }, [currentData])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await Axios({
                url: `https://localhost:3000/users/profile/${id}`,
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                },
                data: {
                    username, phoneNumber, address
                }
            })
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Update Succesfully",
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/')
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <form className="w-full max-w-sm mx-auto mt-8" onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="title" className="block mb-2">Username</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border border-gray-300 rounded-md px-4 py-2 w-full"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="content" className="block mb-2">phoneNumber</label>
                <textarea
                    id="content"
                    name="content"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="border border-gray-300 rounded-md px-4 py-2 w-full h-32 resize-none"
                ></textarea>
            </div>
            <div className="mb-4">
                <label htmlFor="imgUrl" className="block mb-2">Password</label>
                <input
                    type="text"
                    id="imgUrl"
                    name="imgUrl"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="border border-gray-300 rounded-md px-4 py-2 w-full"
                />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Update</button>
        </form>
    );
};

export default UpdateForm;
