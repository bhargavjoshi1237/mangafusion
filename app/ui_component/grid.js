import Man from "./manga";

export default function GridX() {
    return (
<>
    <div className="w-[85%] mt-6 ml-auto mr-auto  h-[325px] overflow-hidden mb-4" >
        <p className="text-xl text-white">Trending This Week</p>
        <div className="flex  mt-4  items-center justify-center h-[300px]  overflow-hidden mb-4">
        <Man imagex={'https://cdn.myanimelist.net/images/manga/3/235363l.jpg'} />
        <Man imagex={'https://mangadex.org/covers/f2f2921c-07df-4f17-94f7-c4344ad7ab44/79c85a32-0b45-4d95-aede-7e4ef3638513.png.512.jpg'} />
        <Man imagex={'https://mangadex.org/covers/bd35f5a7-bcce-40dc-b628-22315cc9aaf7/793ba971-d5dd-4e23-935f-d1f96dba9184.jpg.512.jpg'} />
        <Man imagex={'https://mangadex.org/covers/76827d5e-30e5-4d54-be68-102cd4366853/696bf46a-7cb1-4241-923e-abb4f5dd1427.jpg.512.jpg'} />
        <Man imagex={'https://mangadex.org/covers/1b72739a-7626-495e-a50d-fd1f52bc4397/8a7e9b2f-1de1-4a89-ad53-7c21995f05c0.jpg.512.jpg'} />
        <Man imagex={'https://mangadex.org/covers/3e7cb9d3-e0e2-4285-a58b-2490fdf2c746/578dbe3f-386a-4a21-b3c3-15bd4552b07e.jpg.512.jpg'} />
        <Man imagex={'https://mangadex.org/covers/10939bf2-2dc7-4aae-8e4b-e96ba25c94de/0420a0b8-7c94-4cf6-bdf6-f5a81a249833.jpg.512.jpg'} />
        <Man imagex={'https://mangadex.org/covers/557615b9-6fec-4ab7-a512-03cbde39815f/0985ba3f-2152-4c18-9deb-ee418c60ce36.jpg.512.jpg'} />
        <Man imagex={'https://mangadex.org/covers/76e73264-aff4-4d9e-ab03-7f923ea3be67/55540a18-2e62-4e16-a338-d2f3f36bd886.jpg.512.jpg'} />

 </div>
       

</div>
</>
);
}
