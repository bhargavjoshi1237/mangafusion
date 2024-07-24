import PubDiv from "./publishing_div";

export default function TopPublishing() {
    return (
<>
    <div className="w-[90%] mt-4 ml-auto mr-auto rounded-xl h-[235px] overflow-hidden flex " >
       <PubDiv imagex={'https://cdn.myanimelist.net/images/manga/3/235363l.jpg'}/>
       <PubDiv imagex={'https://mangadex.org/covers/aa6c76f7-5f5f-46b6-a800-911145f81b9b/426242c4-b281-4f19-bb79-c4e15ab6bb24.jpg'}/>
       <PubDiv imagex={'https://mangadex.org/covers/6b958848-c885-4735-9201-12ee77abcb3c/53a05c31-1043-4f74-b1e4-8f1963f04466.jpg'}/>


</div>
</>
);
}
