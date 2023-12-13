
export const SideBar = () => {
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-gray-800 text-gray-100">
                <div className="p-4">
                    <h2 className="text-lg font-semibold mb-4">Daftar Putar</h2>
                    <ul>
                        <li><a href="#" className="block py-1">Putar 1</a></li>
                        <li><a href="#" className="block py-1">Putar 2</a></li>
                        <li><a href="#" className="block py-1">Putar 3</a></li>
                        {/* Tambahkan daftar putar lainnya di sini */}
                    </ul>
                </div>
                <div className="p-4">
                    <h2 className="text-lg font-semibold mb-4">Channel Rekomendasi</h2>
                    <ul>
                        <li><a href="#" className="block py-1">Channel 1</a></li>
                        <li><a href="#" className="block py-1">Channel 2</a></li>
                        <li><a href="#" className="block py-1">Channel 3</a></li>
                        {/* Tambahkan channel lainnya di sini */}
                    </ul>
                </div>
                {/* Tautan ke bagian lain situs web */}
                <div className="p-4">
                    <h2 className="text-lg font-semibold mb-4">Tautan</h2>
                    <ul>
                        <li><a href="#" className="block py-1">Beranda</a></li>
                        <li><a href="#" className="block py-1">Trending</a></li>
                        <li><a href="#" className="block py-1">Abu-abu</a></li>
                        {/* Tambahkan tautan lainnya di sini */}
                    </ul>
                </div>
            </div>

            {/* Konten utama situs web */}
            <div className="flex-1 p-10">
                {/* Konten utama situs web akan berada di sini */}
            </div>
        </div>
    )
}
