import { useEffect } from 'react'
import { useState } from 'react'
import Axios from "axios"
import Cards from '../components/Cards'
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom"
import logo from "../assets/YouTube.svg"

const Favorite = () => {
  const navigate = useNavigate()
  const id = localStorage.getItem("id")


  const [data, setData] = useState([])
  const fetchData = async () => {
    try {
      const { data } = await Axios({
        url: `http://localhost:3000/favorite/UserId/${id} `,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`
        }
      })

      setData(data)
    } catch (error) {
      console.log(error.message);
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

  const handleGoHome = () => {
    navigate(`/`);
  };

  const handleCardClick = (id) => {
    navigate(`/${id}`);
  };

  // const handleCardDelete = async (id) => {
  //   console.log(id)
  // }


  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className='px-5 w-full bg-slate-50'>
      <div className='w-full flex  justify-between items-center'>
        <div onClick={handleGoHome}>
          <img src={logo} alt='logo-Youtube' className='w-32' />
        </div>

        <div className="flex gap-5" onClick={() => handleLogout}>
          <div className="flex items-center">
            <button className="m1-4 p-2 bg-red-500 text-white rounded-lg" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>

      <div className='w-full flex flex-wrap gap-5 pb-10 '>
        {data && data.length > 0 ? data.map((el) => {
          return (
            <Cards key={el.id} judul={el.titleVideo} avatar={el.avatarUrl} thumnail={el.thumbnailUrl} channel={el.titleChannel} onClick={() => handleCardClick(el.videoId)} type={"favorite"} />
          )
        }) : ""}

      </div>
    </div>
  )
}

export default Favorite