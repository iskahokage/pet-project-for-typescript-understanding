import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { getWeather } from "../helper";
import {IUser, IWeather } from "../types/types";
import Card from "./Card";

interface UserItemProps {
    user: IUser;
}

const UserItem: FC<UserItemProps> = ({ user }) => {

    const [weather, setWeather] = useState<IWeather>();

    const [image, setImage] = useState("https://picsum.photos/240/320");

    const lat: string = user.address.geo.lat
    const lng: string = user.address.geo.lng
    useEffect(()=> {
        getWeather(lat, lng).then(res => setWeather(res))
        setImage(`https://picsum.photos/240/32${ user.id === 10 ? 0 : user.id}`)
    }, [user.id])

    

    const unit = weather?.hourly_units?.temperature_2m
    

    return (
            <Card onClick={(num: number)=> console.log(num)} width="320px" minHeight="380px" margin="15px 15px 0 0">
                <div className='cardTitle'>
                    <h1>{user.id}. {user.name}</h1>
                    <div>
                        <img src={image} alt="" width='70px' height='70px' style={{borderRadius: '50%'}} />
                    </div>
                </div>
                <h2>City: {user.address.city}</h2>
                <h2>Weather: {weather?.current_weather.temperature} {unit}</h2>
            </Card>
    );
};

export default UserItem;
