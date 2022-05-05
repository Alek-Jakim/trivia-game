import React, { createContext, useState } from "react"
import { API_URL } from "../config";
import { useRouter } from "next/router";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const [gameUrl, setGameUrl] = useState("");
    const [userProfile, setUserProfile] = useState(null);

    //this is to not be able to refresh the page and get new questions
    const [matchStarted, setMatchStarted] = useState(false);
    const [error, setError] = useState("");

    const router = useRouter();


    const login = async (userLogin) => {
        if (userProfile) return;

        let response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            body: JSON.stringify(userLogin),
            headers: {
                "Content-Type": "application/json"
            }
        });


        console.log(response)

        if (response.ok) {
            let data = await response.json();

            setUserProfile(data);
            router.push("/player/dashboard");
        } else {
            setUserProfile(null);
        }
    }

    const signup = async (newUser) => {
        const response = await fetch(`${API_URL}/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
        });



        if (response.ok) {
            const data = await response.json();
            setUserProfile(data);
            router.push("/player/dashboard");
        } else {
            setUserProfile(null);
        }
    }


    const logout = async () => {
        const res = await fetch(`${API_URL}/auth/logout`, {
            method: "POST"
        });

        if (res.ok) {
            setUserProfile(null);
        } else {
            router.push("/")
        }
    }


    return (
        <GameContext.Provider value={{ gameUrl, setGameUrl, matchStarted, setMatchStarted, login, signup, userProfile, setUserProfile, logout }}>
            {children}
        </GameContext.Provider>
    )
};

export default GameContext;


