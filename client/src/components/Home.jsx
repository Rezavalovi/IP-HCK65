import { useNavigate } from "react-router-dom"
import logo from "../assets/YouTube.svg"
import Cards from "../components/Cards"
import Swal from "sweetalert2"
import Axios from "axios"
import { useEffect, useState } from "react"

export const Home = () => {
    const navigate = useNavigate()

    const [data, setData] = useState([])
    const [search, setSearch] = useState("")

    const fetchData = async () => {
        try {
            const { data } = await Axios.get(`http://localhost:3000/youtube/search/${search === "" ? "trailers" : search} `)
            // console.log(data)
            setData(data)
        } catch (error) {
            console.log(error);
        }
    }

    const handleLogout = () => {
        Swal.fire({
            title: "Do you want to logout?",
            text: "Yang Bener",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then(async (result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("access_token")
                navigate("/login")

                Swal.fire({
                    title: "Successfully!",
                    text: "See you!!",
                    icon: "success"
                });
            }
        });
    }


    useEffect(() => {
        fetchData()
    }, [])

    const handleCardClick = (id) => {
        navigate(`/${id}`); 
    };
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            fetchData();
        }
    };
    const handleFavorite = () => {
        navigate(`/favorite`);
    };
    return (

        <div className='px-5 w-full bg-slate-50'>
            <div className='w-full flex  justify-between items-center'>
                <div>
                    <img src={logo} alt='logo-Youtube' className='w-32' />
                </div>
                <div className='flex items-center justify-center'>
                    <input
                        type='text'
                        name='search'
                        id='search'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className='w-[500px] h-10 px-4 border border-gray-300 rounded-full text-sm focus:outline-none'
                        placeholder='Telusuri'
                        autoComplete='off'
                        onKeyDown={handleKeyDown}
                    />
                </div>
                <div className="flex gap-5">
                    <button className="m1-4 p-2 bg-slate-500 text-white rounded-lg" onClick={handleFavorite}>My Favorites</button>
                    <div className="flex items-center">
                        <button className="m1-4 p-2 bg-red-500 text-white rounded-lg" onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </div>

            <div className='w-full flex flex-wrap gap-5 pb-10 justify-between'>
                {data && data.length > 0 ? data.map((el) => {
                    return (
                        <Cards key={el.id} judul={el.titleVideo} avatar={el.avatarUrl} thumnail={el.thumbnailUrl} channel={el.titleChannel} onClick={() => handleCardClick(el.videoId)} />
                    )
                }) : ""}

            </div>
        </div>
    )
}
