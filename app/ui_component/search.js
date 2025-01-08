import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area"
import { useState, useEffect } from 'react';
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

const SearchBar = ({ placeholder }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loadingx, setLoadingx] = useState(false);
  const [isChecked, setIsChecked] = useState(placeholder);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
    setLoadingx(true);
    try {
      const response = await fetch(`https://api.jikan.moe/v4/manga?q=${searchTerm}&limit=10`);
      const data = await response.json();
      setSearchResults(data.data || []);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoadingx(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm) handleSearch();
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const handleSwitchChange = () => {
    setIsChecked(!isChecked);
    if (isChecked) {
      window.location.href = '/';
    } else {
      window.location.href = '/digital';
    }
};

  return (
    <div className="ml-auto flex items-center justify-center">
     <div className="mt-1.5 ml-5 gap-4 items-center hidden sm:flex">
        <p className="fon text-sm -mt-1">Printed</p>
        <Switch className="ml-auto -mt-0.5" checked={isChecked} onCheckedChange={handleSwitchChange} />
        <p className="fon text-sm -mt-1">Digital</p>
      </div>
      <div className="dropdown mr-0 mt-1 md:mr-8">
        <div tabIndex={0} className="m-1">
          <div style={{ width: "110%", backgroundColor: "#212121", borderRadius: "50px" }} className="hidden sm:block flex items-center justify-center border-[#212121]">
            <Input
              className="fon mb-0.5 border-[#474747] h-[30px] w-[200px] ml-auto sm:w-[300px] text-sm rounded-2xl placeholder:text-[#999999]"
              style={{ backgroundColor: "#212121" }}
              placeholder="Search for manga..."
              value={searchTerm}
              onChange={handleInputChange}
            />
          </div>
<div className="block sm:hidden">
              <Dialog >
                <DialogTrigger><div className=""><svg style={{marginTop:"5px"}} className=" text-[#999999]" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14"/></svg>
                </div></DialogTrigger>
                <DialogContent className="bg-trasparent border-none ">
                <Input
              className="fon mb-0.5 border-[#474747] h-[30px] w-full   text-sm rounded-2xl placeholder:text-[#999999]"
              style={{ backgroundColor: "#212121" }}
              placeholder="Search for manga..."
              value={searchTerm}
              onChange={handleInputChange}
            />
             <ScrollArea className="h-[500px] w-full rounded-md border border-none">
              <div >
              
              {(loadingx || searchResults.length > 0) && (
  <ul tabIndex={0} className="px-2 pb-1 pt-2 dropdown-content sm:-ml-16 ml-0 mr-1 z-[1] rounded-2xl w-full bg-[#303030]">
    {loadingx ? (
      <div className="flex items-center justify-center">
        <span style={{ color: "white" }} className="ml-auto mr-auto loading loading-spinner loading-lg mt-10 mb-10"></span>
      </div>
    ) : (
      searchResults.map((item) => (
        <a className="w-full" key={item.mal_id} href={"/manga/" + item.mal_id} rel="noopener noreferrer">
          <div
            className="rounded-md w-full mb-2 items-center flex border border-[#303030]"
            style={{ backgroundColor: "#161616", transition: "transform 0.3s ease" }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.025)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            <div className="h-[130px] w-fit">
              <img src={item.images.jpg.image_url} className="h-[130px] rounded-md min-w-[90px] w-[90px]" alt={item.title + " Manga Fusion"} />
            </div>
            <div className="ml-5 h-[100px]">
              <p className="fon text-sm" align="left">
                {(item.title_english || item.title).slice(0, 50) || 'N/A'}
              </p>
              <div className="justify-center items-center">
                <div className="flex">
                  <p className="text-xs fon mt-0.5" style={{ color: "#f3ce13" }}>
                    {item.status || 'N/A'}
                  </p>
                </div>
                <div className="flex gap-3 mt-0.5">
                  <div className="flex">
                    <p className="fon mr-2 text-xs">Type:</p>
                    <p className="text-xs fon flex" style={{ color: "#f3ce13" }}>
                      {item.type || 'N/A'}
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 mt-0.5">
                  <div className="flex">
                    <p className="fon mr-2 text-xs">Authors:</p>
                    <p className="text-xs fon flex" style={{ color: "#f3ce13" }}>
                      {item.authors && item.authors[0] && item.authors[0].name || 'N/A'}
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 mt-0.5 mb-1">
                  <div className="flex">
                    <p className="text-xs fon flex" style={{ color: "#f3ce13" }}>
                      {"Volumes: " + item.volumes || '0'} | {item.score || '0'} | {item?.serializations[0]?.name || 'Solo Releses'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </a>
      ))
    )}
  </ul>
)}</div>
</ScrollArea>
         




                </DialogContent>
              </Dialog>
            </div>
            



          <ul tabIndex={0} className="hidden sm:block dropdown-content sm:-ml-16 ml-0 mr-1 z-[1] mt-4 rounded-2xl w-[400px]" style={{ backgroundColor: "#212121" }}>
            {loadingx ? (
              <div className="flex items-center justify-center">
                <span style={{ color: "white" }} className="ml-auto mr-auto loading loading-spinner loading-lg mt-10 mb-10"></span>
              </div>
            ) : (
              searchResults.slice(0,5).map((item) => (
                <a key={item.mal_id} href={"/manga/" + item.mal_id} rel="noopener noreferrer">
                  <div
                    className="rounded-md items-center flex mt-2 w-[380px] mb-2 ml-auto mr-auto border border-[#303030]"
                    style={{ backgroundColor: "#161616", transition: "transform 0.3s ease" }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.025)"}
                    onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                  >
                    <div className="h-[130px] w-fit">
                      <img src={item.images.jpg.image_url} className="h-[130px] rounded-md min-w-[90px] w-[90px]" alt={item.title + " Manga Fusion"} />
                    </div>
                    <div className="ml-5 h-[100px]">
                      <p className="fon text-sm" align="left">
                        {(item.title_english || item.title).slice(0, 50) || 'N/A'}
                      </p>
                      <div className="justify-center items-center">
                        <div className="flex">
                          <p className="text-xs fon mt-0.5" style={{ color: "#f3ce13" }}>
                            {item.status || 'N/A'}
                          </p>
                        </div>
                        <div className="flex gap-3 mt-0.5">
                          <div className="flex">
                            <p className="fon mr-2 text-xs">Type:</p>
                            <p className="text-xs fon flex" style={{ color: "#f3ce13" }}>
                              {item.type || 'N/A'}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-3 mt-0.5">
                          <div className="flex">
                            <p className="fon mr-2 text-xs">Authors:</p>
                            <p className="text-xs fon flex" style={{ color: "#f3ce13" }}>
                              {item.authors && item.authors[0] && item.authors[0].name || 'N/A'}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-3 mt-0.5 mb-1">
                          <div className="flex">
                            <p className="text-xs fon flex" style={{ color: "#f3ce13" }}>
                              {"Volumes: " + item.volumes || '0'} | {item.score || '0'} | {item?.serializations[0]?.name || 'Solo Releses'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
