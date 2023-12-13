import { useEffect, useState } from "react"
import { Link, useNavigate } from 'react-router-dom'
import Axios from 'axios'

export default function LoginPage() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    let dataForm = {
        email,
        password
    }

    const handleCredentialResponse = async (response) => {
        try {
            const google_token = response.credential;
            const { data } = await Axios.post("http://localhost:3000/users/google-login", { google_token: google_token });
            console.log(data);

            localStorage.setItem("access_token", data.access_token);
            navigate("/")
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        window.google.accounts.id.initialize({
            client_id: "983248272931-me4cbpilgoog8bf3vk2t86ukccfc814m.apps.googleusercontent.com",
            callback: handleCredentialResponse
        })
        window.google.accounts.id.renderButton(
            document.getElementById("buttonDiv"),
            { theme: "outline", size: "large" },
        )
    }, [])


    const handleOnSubmit = async (event) => {
        event.preventDefault()
        try {
            const { data } = await Axios.post('http://localhost:3000/users/login', dataForm)
            localStorage.setItem('access_token', data.access_token)
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-red-700 uppercase">
                    Welcome
                </h1>
                <form className="mt-6" onSubmit={handleOnSubmit}>
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
                    <a href="#" className="text-xs text-purple-600 hover:underline">
                        Forget Password?
                    </a>
                    <div className="mt-6">
                        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-700 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600">
                            Login
                        </button>
                    </div>
                </form>
                <div className="relative flex items-center justify-center w-full mt-6 border border-t">
                    <div className="absolute px-5 bg-white">Or</div>
                </div>
                <div className="flex mt-4 gap-x-2">
                    <div id="buttonDiv" type="button"
                        className="flex items-center justify-center w-full p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-red-600"></div>
                    {/* <button
                        type="button"
                        className="flex items-center justify-center w-full p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-red-600"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 32 32"
                            className="w-5 h-5 fill-current"
                        >
                            <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z" />
                        </svg>
                    </button> */}
                </div>
                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    <Link to="/register">
                        <span href="" className="font-medium text-red-600 hover:underline">
                            Sign up
                        </span>
                    </Link>
                </p>
            </div>
        </div>
    )
}