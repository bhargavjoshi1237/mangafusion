export default function Man({ imagex, name = "No name available", link, price, tags }) {
  const truncatedName = name.length > 25 ? name.substring(0, 20) + '...' : name;

  return (
    <>
      <a href={(link).replace("https://global.bookwalker.jp", "/digitalvolume")}>
        <div className="  box ">
          <img
            className="h-[235px] w-[163px] rounded-sm"
            src={imagex}
          />
          <p className="w-[163px] font text-xs fon text-white mt-2" align="center">
            {truncatedName}
          </p>
          {/* <p  className="w-[163px] font text-xs fon text-white " align="center">{(price).replace("US", "")}</p> */}
          <div className="hid-box flex flex-wrap justify-center rounded-md">
            {tags.map((tag, index) => (
              <div key={index} className="border border-[#474747]  m-0.5 px-4 rounded-lg flex">
                <p className="text-xs fon text-white">{(tag).replace("Illust","Illustrated")}</p>
              </div>
              
            ))}
            <div className='bg-green-400 w-full mt-1 flex items-center justify-center rounded-md'><p className='fon text-xs'>{price}</p></div>
          </div>
        </div>
      </a>
    </>
  );
}