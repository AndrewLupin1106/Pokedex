import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Snorlax from "/snorlax.png"
import BackGround from "/background.jpg"

export default function NotFound () {
    return(
        <div className="min-h-screen max-w-full bg-[url('/background.jpg')] bg-no-repeat bg-cover bg-bottom flex justify-center items-center">
            <div className="flex w-full h-full items-center justify-center py-10 md:py-0">
                <div className="flex flex-col justify-center items-center
                 gap-y-5">
                    <h1 className="text-7xl text-white px-6 py-4 rounded-md font-bold bg-gray-900">Erro 404</h1>
                    <div className="">
                        <img src={Snorlax} alt="Pokemon snorlax"/>
                    </div>
                    <p className="text-center m-4 text-2xl md:text-3xl text-gray-900 font-bold bg-slate-200 px-4 py-4 outline rounded-md">Opps, a wild Snorlax blocked your way</p>
                    <Link to="/" className="w-1/2 flex justify-center bg-gray-900 rounded-md px-4 py-2">
                        <span className="text-white font-semibold">Back</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}