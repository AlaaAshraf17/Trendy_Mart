import { createContext, useState ,useEffect} from "react";

export const WishlistContext =createContext()

export default function WishlistContextProvider({children}){
    const[wishlist, setWishlist]=useState([])

        
        useEffect(() => {
            const storedWishlist = localStorage.getItem("list");
            if (storedWishlist) {
            setWishlist(JSON.parse(storedWishlist));
            }
        }, []);
        
        useEffect(() => {
            localStorage.setItem("list", JSON.stringify(wishlist));
        }, [wishlist]);

    function addToWishlist(product){
        setWishlist((prev)=>{
            if(prev.find((item)=>item.id===product.id)){
                return prev.filter((item)=>item.id!=product.id)
            }
            else{
                return [...prev,product]
            }
        })
    }
    function inWishlist(productId){
        return wishlist.some((item)=>item.id===productId)
    }
    return(
        <WishlistContext.Provider value={{wishlist,addToWishlist,inWishlist}}>
            {children}
        </WishlistContext.Provider>
    )

}