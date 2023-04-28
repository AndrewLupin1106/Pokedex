import "./index.css"

export default function Header() {
    return(
        <div className="wraper">
        <header className="header-cut bg-redfundo border-black border-b-1 w-full h-36 ">
                <div className="flex flex-row items-center h-full p-5">
                    <div className="relative flex z-20 items-center justify-center bg-gray-300 h-24 w-24 rounded-full  shadow-xl">
                        <div className="bg-cyan-400 h-20 w-20 rounded-full shadow-lg">
                            <div className="relative bg-white top-2 left-1 h-6 w-10 -rotate-[40deg] oval"></div>
                        </div>
                    </div>
                    <div className="ml-10 lg:ml-14 flex flex-row gap-x-5 h-full">
                        <div className="bg-red-500 h-8 w-8 rounded-full shadow-md">
                            <div className="relative top-[0.8px] -rotate-[30deg] bg-red-300 h-4 w-6 rounded-full small-oval">
                            </div>
                        </div>
                        <div className="bg-yellow-400 h-8 w-8 rounded-full shadow-md">
                        <div className="relative top-[0.8px] -rotate-[30deg] bg-yellow-300 h-4 w-6 rounded-full small-oval">
                            </div>
                        </div>
                        <div className="bg-green-400 h-8 w-8 rounded-full shadow-md">
                        <div className="relative top-[0.8px] -rotate-[30deg] bg-green-300 h-4 w-6 rounded-full small-oval">
                            </div>
                        </div>
                    </div>
                </div>
            <div className="flex w-full justify-end z-40">
                <h1 >oi</h1>
            </div>
        </header>
        </div>
    )
}