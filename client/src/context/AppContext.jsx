import axios from 'axios';
import { createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { useUser, useAuth } from "@clerk/clerk-react"
import { useState } from 'react';
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
export const Appcontext = createContext(null);

const AppContextProvider = ({ children }) => {

    const currency = import.meta.env.VITE_CURRENCY;
    const navigate = useNavigate();
    const { user,isLoaded } = useUser();
    const { getToken } = useAuth();

    const [isOwner, setIsOwner] = useState(false);
    const [isOwnerChecked, setIsOwnerChecked] = useState(false);
    const [showHotelReg, setShowHotelReg] = useState(false);
    const [searchedcities, setSearchedcities] = useState([]);
    const [rooms,setRooms] = useState([]);

    let retryCount = 0;
    
    // FetchUSer 
    const fetchUser = async () => {
        try {
            const token = await getToken();
            const res = await axios.get("/api/user", {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (res.data.success) {
                setIsOwner(res.data.role === "hotelOwner");
                setSearchedcities(res.data.recentSearchCities);
            }
            else if (retryCount < 3) {
                retryCount++;
                setTimeout(() => {
                    fetchUser();
                }, 5000)
            }
            setIsOwnerChecked(true);
        }
        catch (error) {
            toast.error(error.message);
            setIsOwnerChecked(true);
        }
    }

    // fetch Rooms 

    const fetchRooms = async () => {
        try {
            const {data} = await axios.get("/api/room/rooms");
            console.log(data);
            if(data.success){
                setRooms(data.rooms);
            }
            else{
                toast.error(data.message);
            }
        } 
        catch (error) {
            toast.error(error.message);
        }
    }
    useEffect(() => {
        if (user) {
            setIsOwnerChecked(false);
            fetchUser();
        } else if (isLoaded) {
            setIsOwnerChecked(true);
        }
    }, [user, isLoaded]);

    useEffect(() => {
        fetchRooms();
    },[])

    const value = {
        currency,
        navigate,
        user,
        getToken,
        isOwner, setIsOwner, isOwnerChecked,
        showHotelReg, setShowHotelReg,
        rooms,setRooms,
        searchedcities,setSearchedcities,
        isLoaded,fetchRooms
    }

    return (
        <Appcontext.Provider value={value}>
            {children}
        </Appcontext.Provider>
    )
}

export default AppContextProvider;
