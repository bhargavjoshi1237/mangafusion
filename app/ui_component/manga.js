
export default function Man({ imagex, name = "No name available",}) {
    const truncatedName = name.length > 25 ? name.substring(0, 20) + '...' : name;

    return (
        <>
           <div className="ml-4 -mt-5">
    <img
      className="h-[235px] w-[163px] rounded-sm"
      src={imagex }
    //   onError={event => {
    //     event.target.src = "https://cdn.myanimelist.net/images/anime/1006/143302l.jpg"
    //     event.onerror = null
    //   }}
    />
    <p className="w-[163px] font text-xs mt-1" align="center">
      {truncatedName}
    </p>
  </div>
        </>
    );
}