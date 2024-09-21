import Man from "./manga";

export default function GridY({ data, title, kitsu }) {
    return (
        <>
            <div className="w-[85%] mt-6 ml-auto mr-auto h-fit mb-1">
                <p className="text-xl text-white fon">
                    {title}
                </p>
                <div className="mt-10 items-center justify-center h-fit mb-1 hidden sm:flex -ml-3">
                    {Array.isArray(data) && data.length > 0 ? (
                        data.slice(0, 9).map((item, index) => {
                            return (
                               
                                <div key={index} className="mb-8" id="if kitsu is true">
                                <a href={`/manga/${item.mangadex?.data[0]?.attributes?.links?.mal}`}>
                                  <Man
                                    key={index}
                                    name={item?.main?.attributes?.titles?.en_us || item?.attributes?.titles?.en || item?.attributes?.titles?.en_jp}
                                    imagex={item?.main?.attributes?.posterImage.original}
                                  />
                                </a>
                              </div>
                            );
                        })
                    ) : (
                        <>
                            <Man name="No data available" imagex="https://animealley.online/404.jpg" />
                            <Man imagex="https://meo2.comick.pictures/jx3yqk.jpg" />
                            <Man imagex="https://meo2.comick.pictures/4kKKpy.jpg" />
                            <Man imagex="https://meo2.comick.pictures/w7p0lr.jpg" />
                            <Man imagex="https://meo2.comick.pictures/w7pN4L.jpg" />
                            <Man imagex="https://meo2.comick.pictures/4kKEvx.jpg" />
                            <Man imagex="https://meo2.comick.pictures/Krgg7N.jpg" />
                            <Man imagex="https://meo2.comick.pictures/YgER6O.png" />
                            <Man imagex="https://meo2.comick.pictures/7yKpae.jpg" />
                        </>
                    )}
                </div>
                <div className="sm:hidden mt-10 items-center justify-center h-fit mb-1 grid-cols-2 grid -ml-3">
                    {Array.isArray(data) && data.length > 0 ? (
                        data.slice(0, 8).map((item, index) => {
                            return (
                                <div key={index} className="mb-8">
                                    <a href={`/manga/${item.mangadex?.data[0]?.attributes?.links?.mal}`}> 
                                    <Man
                                    key={index}
                                    name={item?.main?.attributes?.titles?.en_us || item?.attributes?.titles?.en || item?.attributes?.titles?.en_jp}
                                    imagex={item?.main?.attributes?.posterImage.original}
                                  />
                                    </a>
                                </div>
                            );
                        })
                    ) : (
                        <>
                            <Man name="No data available" imagex="https://animealley.online/404.jpg" />
                            <Man imagex="https://meo2.comick.pictures/jx3yqk.jpg" />
                            <Man imagex="https://meo2.comick.pictures/4kKKpy.jpg" />
                            <Man imagex="https://meo2.comick.pictures/w7p0lr.jpg" />
                            <Man imagex="https://meo2.comick.pictures/w7pN4L.jpg" />
                            <Man imagex="https://meo2.comick.pictures/4kKEvx.jpg" />
                            <Man imagex="https://meo2.comick.pictures/Krgg7N.jpg" />
                            <Man imagex="https://meo2.comick.pictures/YgER6O.png" />
                            <Man imagex="https://meo2.comick.pictures/7yKpae.jpg" />
                        </>
                    )}
                </div>
            </div>
        </>
    );
}