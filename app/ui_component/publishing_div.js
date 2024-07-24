export default function PubDiv({ imagex }) {
    return (
        <div className="relative flex w-full ml-4 mr-4 mt-4 mb-4 rounded-xl overflow-hidden">
            {/* Pseudo-element for the background image */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${imagex})`, filter: 'brightness(0.3)' }}
            ></div>

            {/* Content Layer */}
            <div className="relative z-10 w-full flex">
                <div className="ml-5 -mt-1">
                    <p className="mt-6 text-lg text-white">My Dressup Darling</p>
                    <p className="text-xs text-white">Chapter: 120</p>
                    <p className="text-sm mt-1 text-white">Recently Updated</p>
                    <p className="text-3xl mt-[65px] text-white">Vol. 10</p>
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
