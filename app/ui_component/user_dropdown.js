'use client'
import { supabase } from "../supabaseC";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function UserDropdown() {
    const [session, setSession] = useState(null);
    const [watchlist, setWatchlist] = useState([]);

    useEffect(() => {
        async function fetchExternalData() {
            const { data: { session } } = await supabase.auth.getSession();
            setSession(session);
            if (session?.user) {
                const { data, error } = await supabase
                    .from('watchlist')
                    .select('*')
                    .eq('email', session.user.email);
                
                if (error) {
                    console.error('Error fetching watchlist:', error);
                } else {
                    setWatchlist(data);
                }
            }
        }
        fetchExternalData();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setSession(null); // Clear session on logout
    };

    return (
        <div className="">
            {session?.user ? (
                <Dialog>
                    <DialogTrigger>
                        <img
                            src={session.user.user_metadata.avatar_url || "https://animealley.online/dp.jpg"}
                            className="sm:ml-2 h-[30px] rounded-full cursor-pointer sm:mr-2 mt-2.5 border-none"
                            alt="User Avatar"
                        />
                    </DialogTrigger>
                    <DialogContent className="bg-[#161616] border border-[#161616] rounded-sm">
                        <Tabs defaultValue="account">
                            <TabsList className="h-[47px] w-full border bg-[#212121] border-[#212121]">
                                <TabsTrigger value="account" className=" w-full  fonx bg-[#212121]">
                                    <span className="material-icons mr-2">person_outline</span>Account
                                </TabsTrigger>
                                <TabsTrigger value="password" className="w-full fonx bg-[#212121]">
                                    <span className="material-icons mr-2">receipt_long</span>Watch List
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="account">
                                <div className=" w-full h-full">
                                    <div className="flex mt-5 mb-2.5">
                                        
                                            <img
                                                src={session.user.user_metadata.avatar_url || "https://animealley.online/dp.jpg"}
                                                className="sm:ml-2 sm:h-[43px] h-[43px]  rounded-full cursor-pointer sm:mr-2 mt-1"
                                                alt="User Avatar"
                                            />
                                       
                                        <div className="w-full ml-4">
                                            <p align="left" className="fon mt-0.5 text-lg w-full">{session.user.user_metadata.name}</p>
                                            <p style={{fontSize:"10px"}} className="text-xs fon ">{session.user.user_metadata.email}</p>
                                        </div>
                                    </div>
                                    <div className="form-control mt-4 w-full">
                                        <label className="label cursor-pointer">
                                            <span className="label-text">Receive WatchList price drop emails.</span>
                                            <input type="checkbox" className="toggle toggle-accent" defaultChecked />
                                        </label>
                                    </div>
                                    <div className="form-control w-full">
                                        <label className="label cursor-pointer">
                                            <span className="label-text">Receive Promotional emails.</span>
                                            <input type="checkbox" className="toggle toggle-accent" defaultChecked />
                                        </label>
                                    </div>
                                    <button onClick={handleLogout} className="btn btn-outline hover:bg-red-700 bg-red-600 border-none text-white mt-4 w-full ">
                                        <span className="material-icons">logout</span> Logout
                                    </button>
                                </div>
                            </TabsContent>
                            <TabsContent value="password">
                                <ScrollArea className="max-h-[600px] rounded-md">
                                    {watchlist.length > 0 ? (
                                        watchlist.map((item) => (
                                          <a key={item.id} href={"/volume/"+item.isbn}> <div  key={item.id} className="mt-3  bg-[#212121] rounded-lg border border-[#474747] ml-auto mr-auto w-[100%] h-[120px] flex">
                                                <div className="w-[95%] ml-3 flex mr-auto h-[110px] mt-[10px]">
                                                    <div className="flex">
                                                        <p
                                                            className="bg-green-600 fon text-xs h-[100px] mr-2 w-fit"
                                                            align="center"
                                                            style={{
                                                                writingMode: "vertical-rl",
                                                                transform: "rotate(180deg)"
                                                            }}
                                                        >
                                                            {item.platform}
                                                        </p>
                                                    </div>
                                                    <img src={item.img} className="h-[100px]" alt="" />
                                                    <div className="lex flex-col justify-between h-full ml-4 w-full ">
                                                        <p className="fon text-sm sm:text-xs md:text-sm lg:text-md w-fit ml-4 mr-auto">
                                                            {item.name}
                                                        </p>
                                                        <div className="sm:mt-5"><div className="ml-4">
                                                            <p className="text-md fon mt-3">Price: {item.price_when_added}/-</p>
                                                        </div>
                                                        <div className="ml-4">
                                                            <p className="text-xs fon">Added on: {new Date(item.created_at).toLocaleDateString()}</p>
                                                        </div></div>
                                                        <div className="flex ml-auto hidden sm:flex -mt-1">
                                                            <button onClick={() => window.location.href = item.link} className="ml-auto btn btn-outline -mt-12">
                                                                <span className="material-icons">logout</span> Visit
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                            </div></a> 
                                            
                                        ))
                                    ) : (
                                        <p className="text-center fon text-sm mt-4">Your watchlist is empty.</p>
                                    )}
                                </ScrollArea>
                                <p className="fon w-[90%] ml-auto mr-auto fon text-xs mt-3" align="center">You will recive an email from us when the price drops!</p>

                            </TabsContent>
                        </Tabs>
                    </DialogContent>
                </Dialog>
            ) : (
                <div>
                <a href="/auth" className="hidden sm:block">
                  <button className="btn btn-outline border-none hover:bg-transparent hover:text-[#999999]">
                    Login
                  </button>
                </a>
                <a href="/auth" ><button className="-mr-4 ml-1 btn btn-outline border-none hover:bg-transparent hover:text-[#999999] block sm:hidden">
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2M7.35 18.5C8.66 17.56 10.26 17 12 17s3.34.56 4.65 1.5c-1.31.94-2.91 1.5-4.65 1.5s-3.34-.56-4.65-1.5m10.79-1.38a9.95 9.95 0 0 0-12.28 0A7.96 7.96 0 0 1 4 12c0-4.42 3.58-8 8-8s8 3.58 8 8c0 1.95-.7 3.73-1.86 5.12"/>
                    <path fill="currentColor" d="M12 6c-1.93 0-3.5 1.57-3.5 3.5S10.07 13 12 13s3.5-1.57 3.5-3.5S13.93 6 12 6m0 5c-.83 0-1.5-.67-1.5-1.5S11.17 8 12 8s1.5.67 1.5 1.5S12.83 11 12 11"/>
                  </svg>
                </button></a>
              </div>
            )}
        </div>
    );
}
