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
                    <DialogContent className="bg-[#161616] border border-[#161616]">
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
                <a href="/auth">
                    <button className="btn btn-outline border-none hover:bg-transparent hover:text-[#999999]">
                        Login
                    </button>
                </a>
            )}
        </div>
    );
}
