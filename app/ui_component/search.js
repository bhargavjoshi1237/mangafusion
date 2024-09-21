// components/SearchBar.js
import { Input } from "@/components/ui/input";
import { useState, useEffect } from 'react';

const SearchBar = ({ placeholder }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://api.jikan.moe/v4/manga?q=${searchTerm}&limit=5`);
      const data = await response.json();
      setSearchResults(data.data || []);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm) handleSearch();
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  return (
    <div className="dropdown ml-auto mr-8 mt-1">
      <div tabIndex={0} className="m-1">
        <div style={{ width: "110%", backgroundColor: "#212121", borderRadius: "50px" }} className="flex items-center justify-center border-[#212121]">
          <Input
            className="fon mb-0.5 border-[#474747] h-[30px] w-[150px] ml-auto sm:w-[300px] text-sm rounded-2xl placeholder:text-[#999999]"
            style={{ backgroundColor: "#212121" }}
            placeholder={placeholder || "Search for manga..."}
            value={searchTerm}
            onChange={handleInputChange}
          />
        </div>
        <ul tabIndex={0} className="dropdown-content sm:-ml-16 -ml-44 mr-1 z-[1] mt-4  rounded-2xl w-[400px]" style={{ backgroundColor: "#212121" }}>
          {searchResults.length > 0 ? (
            searchResults.map((item) => (
              <a key={item.mal_id} href={"/manga/"+item.mal_id}  rel="noopener noreferrer">
                <div
                  className="rounded-md items-center flex mt-2 w-[380px] mb-2 ml-auto mr-auto"
                  style={{ backgroundColor: "#161616", transition: "transform 0.3s ease" }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.025)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                >
                  <div className="h-[130px] w-fit">
                    <img src={item.images.jpg.image_url} className="h-[130px] rounded-md w-[90px]" alt={item.title+" Manga Fusion"} />
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
                            {item.authors[0].name || 'N/A'}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3 mt-0.5 mb-1">
                        <div className="flex">
                     
                          <p className="text-xs fon flex" style={{ color: "#f3ce13" }}>
                            {"Volumes: "+item.volumes || '0'} | {item.score || '0'} | {item?.serializations[0]?.name || 'Solo Releses'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            ))
          ) : (
            <div className="flex items-center justify-center"><span className="ml-auto mr-auto loading loading-spinner loading-lg mt-10 mb-10"></span></div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SearchBar;
