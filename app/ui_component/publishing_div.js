
export default function PubDiv({ data }) {
    return (
        <div className="relative flex w-full ml-4 mr-4 mt-4 mb-4 rounded-xl overflow-hidden h-[200px]">
            {/* Pseudo-element for the background image */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(https://meo2.comick.pictures/${data.comickData?.md_comics?.md_covers[0]?.b2key})`, filter: 'brightness(0.3)' }}
            ></div>

            {/* Content Layer */}
            <div className="relative z-10 w-full flex">
                <div className="ml-5 -mt-1">
                    <p className=" fon mt-6 text-lg text-white ">{(data.comickData?.md_comics?.title)?.substring(0,35)}</p>
                    <p className=" fon text-xs text-white">Chapter: {data.comickData?.md_comics?.last_chapter}</p>
                    <p className=" fon text-sm mt-1 text-white ">Recently Updated</p>
                    <p className=" fon text-3xl sm:mt-[60px] mt-[40px] text-white">Vol. {parseInt((data.comickData?.md_comics?.last_chapter)/10)}</p>
                </div>
                <img
                    className="h-[40px] w-[40px] mr-5 mt-3 ml-auto"
                    src="https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg"
                    alt=""
                />
            </div>
        </div>
    );
}
