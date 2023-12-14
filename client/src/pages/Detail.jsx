import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import ReactPlayer from "react-player"
import CardDua from "../components/CardDua"
import Axios from "axios"
import Swal from "sweetalert2"
import logo from "../assets/YouTube.svg"
const Detail = () => {

  const navigate = useNavigate()
  const { id } = useParams()

  const [detail, setDetail] = useState({})
  const [video, setVideo] = useState([])
  const [idChannel, setIdChannel] = useState(null)


  const fetchdata = async () => {
    try {
      const { data } = await Axios({
        url: `http://localhost:3000/youtube/details/${id}`,
        method: "GET"
      })
      setDetail(data)
      setIdChannel(data.channelId)

    } catch (error) {
      console.log(error)
    }
  }

  const fetch = async () => {
    try {
      const { data } = await Axios({
        url: `http://localhost:3000/youtube/video/${idChannel}`,
        method: "GET"
      })
      setVideo(data)
    } catch (error) {
      console.log(error)
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
    fetchdata()
  }, [id])

  useEffect(() => {
    fetch()
  }, [idChannel])



  function ubahFormatWaktu(waktuAwal) {
    const hariList = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

    const tanggal = new Date(waktuAwal);

    const hari = hariList[tanggal.getDay()];
    const tahun = tanggal.getFullYear();
    const bulan = ("0" + (tanggal.getMonth() + 1)).slice(-2);
    const tanggalKalendar = ("0" + tanggal.getDate()).slice(-2);

    const waktuAkhir = `${hari}, ${tanggalKalendar}-${bulan}-${tahun}`;
    return waktuAkhir;
  }

  const handleCardClick = (id) => {
    navigate(`/${id}`);
  };
  const handleGoHome = () => {
    navigate(`/`);
  };

  const handleFavorite = () => {
    navigate(`/favorite`);
  };

  let body = {
    avatarUrl: detail.avatar,
    channelId: detail.channelId,
    titleChannel: detail.titleChannel,
    description: detail.description,
    thumbnailUrl: detail.thumbnail,
    views: detail.totalViews,
    videoId: detail.videoId,
    titleVideo: detail.titleVideo,
  }

  const submitFavorite = async (e) => {
    e.preventDefault()

    try {

      const token = localStorage.getItem("access_token")
      let { data } = await Axios({
        url: "http://localhost:3000/favorite",
        method: "POST",
        data: body,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`
      }
      })
      Swal.fire({
        title: "Successfully!",
        text: "Congrats!",
        icon: "success"
      });
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <div>
      <div className='w-full flex  justify-between items-center px-10'>
        <div onClick={handleGoHome}>
          <img src={logo} alt='logo-Youtube' className='w-32' />
        </div>

        <div className="flex items-center gap-5">
          <button className="m1-4 p-2 bg-slate-500 text-white rounded-lg" onClick={handleFavorite}>My Favorites</button>
          <button className="m1-4 p-2 bg-red-500 text-white rounded-lg" onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <div className='px-16 py-5 flex w-full gap-10'>

        <div className='w-[60%]'>
          <div>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${detail.videoId}`}
              controls
              height={450}
              width={800}
            />
          </div>
          <div className='w-full mt-5'>
            <div className="mb-2">
              <p className="text-xl font-black">{detail.titleVideo}</p>
            </div>
            <div className='flex justify-between'>
              <div>
                <div>
                  <img src={detail.avatar} alt='avatar' className="rounded-full" />
                </div>
                <div>
                  <p>{detail.titleChannel}</p>
                  <p>{ubahFormatWaktu(detail.release)}</p>
                </div>
              </div>
              <div className='flex gap-3'>
                <button className='w-24 bg-slate-50 border-[1px] border-slate-300 font-black rounded-full h-10'>
                  Gabung
                </button>
                <button className='w-24 bg-black text-white rounded-full h-10 font-black'>
                  Subribe
                </button>
                <button className='w-24 bg-slate-50 border-[1px] border-slate-300 font-black rounded-full h-10' onClick={(e) => submitFavorite(e)}>
                  + Vaforite
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className='p-5 w-[30%]'>
          {
            video && video.length > 0 ? video.map((el) => {
              return (
                <CardDua key={el.videoId} thumbnail={el.thumbnailUrl} judul={el.titleVideo} onClick={() => handleCardClick(el.videoId)} />
              )
            })
              : ""
          }
        </div>
      </div>
    </div>
  )
}

export default Detail
