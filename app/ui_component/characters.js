"use client"
import React, { useState, useEffect } from 'react';
import { Separator } from "@/components/ui/separator"

const Charx = ({ id, languagePreference }) => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch(`https://api.jikan.moe/v4/manga/${id}/characters`);
        const data = await response.json();
        
        // Extract information for the first 5 characters
        const first5Characters = data.data.slice(0, 10).map(characterData => {
          const character = characterData.character;
          const voiceActor = characterData.voice_actors.find(actor => actor.language === (languagePreference === 1 ? "Japanese" : "English"));
        
          const dubName = voiceActor ? `${voiceActor.person.name} (${languagePreference === 1 ? "JP" : "EN"})` : "N/A";
          const dubImg = voiceActor ? voiceActor.person.images.jpg.image_url : "N/A";
        
          return {
            name: character.name,
            description: character.role,
            imageLink: character.images.jpg.image_url,
            dub: dubName,
            dubimg: dubImg,
            favorites: character.favorites || 0,
          };
        });
        
        // Sort characters by favorites (descending order)
        const sortedCharacters = first5Characters.sort((a, b) => b.favorites - a.favorites);

        setCharacters(sortedCharacters);
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };

    fetchCharacters();
  }, [id, languagePreference]);

  return (
    <div className='flex w-[93%] ml-auto mr-auto'>
        <div className='w-1/2 '>
      {characters?.slice(0,4).map((character, index) => (
        <div className="charx mt-10 mb-10" key={index}>
          <img className='float-left' style={{ height: "100px", width: "65px" }} src={character.imageLink} alt={character.name} />
          <div className="charx-content">
            <div className='float-left' style={{ width: "fit-content", height: "10px" }}>
              <h2 className='fon float-left ml-2' style={{ fontSize: "12px" }}>{character.name}</h2>
              <br />
              <p className='fon float-left ml-2 mb-0' style={{ fontSize: "8px" }}>{character.description}</p>
            </div>
            <img className='float-right' style={{ height: "100px", width: "65px" }} src={character.dubimg} alt={character.name} />
            <p className='fon float-right mt-12 mr-3' style={{ fontSize: "11px" }}>{character.dub}</p>
          </div>
          <br />
          <br />
          <br />
        </div>
      ))}
    </div>
    <div>
    <Separator className="ml-10 mr-10 h-[93%] mt-7" orientation="vertical" /> 
    </div>
    <div className='w-1/2'>
      {characters?.slice(4,8).map((character, index) => (
        <div className="charx mt-10 mb-10" key={index}>
        <img className='float-left' style={{ height: "100px", width: "65px" }} src={character.imageLink} alt={character.name} />
        <div className="charx-content">
          <div className='float-left' style={{ width: "fit-content", height: "10px" }}>
            <h2 className='fon float-left ml-2' style={{ fontSize: "12px" }}>{character.name}</h2>
            <br />
            <p className='fon float-left ml-2 mb-0' style={{ fontSize: "8px" }}>{character.description}</p>
          </div>
          <img className='float-right' style={{ height: "100px", width: "65px" }} src={character.dubimg} alt={character.name} />
          <p className='fon float-right mt-12 mr-3' style={{ fontSize: "11px" }}>{character.dub}</p>
        </div>
        <br />
        <br />
        <br />
      </div>
      ))}
    </div>
    </div>
  );
};

export default Charx;
