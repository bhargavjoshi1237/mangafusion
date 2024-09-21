"use client"
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { supabase } from "../supabaseC";
import { useToast } from "@/components/ui/use-toast"

export default function TrackPriceDialog({ ISBN, current_price, platform,img,name }) {
  const { toast } = useToast()
  const handleAddToWatchlist = async () => {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !session) {
      console.error("Error: User not logged in.", sessionError);
      alert("You need to be logged in to track prices.");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("watchlist")
        .insert({
          price_when_added: current_price.slice(1),
          platform,
          link: "https://www.bookswagon.com/search-books/"+ISBN,
          isbn: ISBN,
          name: name,
          img: img,
          email: session.user.email,
        });

      if (error) {
        console.error("Error adding to watchlist:", error);
        alert("Failed to add to watchlist.");
        return;
      }

      console.log("Added to watchlist:", data);
      toast({
        title: "Added to watchlist",
        description: "You will be notified on you email when the price drops.",
      })
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <div className="w-[230px] bg-[#212121] mt-2.5 rounded-lg border-4 border-[#5c5c5c]">
          <p className="fonx text-[#5c5c5c] text-xs mt-1 mb-1" align="center">Track Price</p>
        </div>
      </DialogTrigger>
      <DialogContent className="bg-[#212121] border border-[#212121]">
        <DialogTitle className="fon">Track Price</DialogTitle>
        <div className="fon justify-center items-center flex ">
          Are you sure you want to track the price for this book on bookswagon?
        </div>
        <DialogClose asChild>
        <button className="btn btn-outline  mt-4" onClick={handleAddToWatchlist}>
          Confirm
        </button>
          </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
