import Axios from "axios"

const Cards = ({ id, thumnail, judul, channel, avatar, onClick, type }) => {
    const handleCardClick = () => {
        if (onClick) {
            onClick();
        }
    };


    const handleDelete = async (e) => {

        try {
            const { data } = await Axios({
                url: `http://localhost:3000/favorite/${id} `,
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            })

            // setData(data)
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className='w-[330px] h-[300px] rounded-md'>
            <div className='w-[330px] h-[190px] bg-slate-100' onClick={handleCardClick}>
                <img src={thumnail} alt='Konten' className="w-full h-full" />
            </div>
            <div>
                <div className='w-full flex '>
                    <div className='w-[20%] p-2'>
                        <img src={avatar} alt='Profile' className="rounded-full w-[40px]" />
                    </div>
                    <div className='w-[80%]'>
                        <p>{channel}</p>
                        <p>{judul}</p>
                    </div>
                    {type == "favorite" ?
                        <div className='w-[20%] p-2'>
                            <button className="w-[55px] border-[1px]  rounded-md bg-red-500 text-white" onClick={() => handleDelete(id)}>Delete</button>
                        </div>
                        : null}
                </div>
            </div>
        </div>
    )
}

export default Cards
