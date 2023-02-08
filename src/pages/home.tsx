import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import Card, { cardVariant } from "../components/Card";
import EventsExample from "../components/EventsExample";
import RepoCard from "../components/RepoCard";
import { getWeather } from "../helper";
import { useDebounce } from "../hooks/debounce";
import { useLazyGetUserReposQuery, useSearchUsersQuery } from "../store/github/github.api";
import { IWeather } from "../types/types";

const Home: React.FC = () => {
    const [lat, setLat] = useState<number>();
    const [long, setLong] = useState<number>();
    const [weather, setWeather] = useState<IWeather>();
    const [search, setSearch] = useState<string>("");

    const debounced = useDebounce(search);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success, error);
    }, [debounced]);

    const success = (pos: GeolocationPosition) => {
        const crd = pos.coords;
        const lat = crd.latitude;
        const long = crd.longitude;
        getWeather(lat, long).then((res) => setWeather(res));
        setLat(lat);
        setLong(long);
    };

    const error = () => {};

    const unit = weather?.hourly_units?.temperature_2m;

    const { isLoading, isError, data } = useSearchUsersQuery(debounced, {
        skip: debounced.length < 3,
    });

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const [fetchRepos, {isLoading:isReposLoading, data: repos}] =  useLazyGetUserReposQuery()

    const clickHandler = (username: string) => {
        fetchRepos(username)
        console.log(repos)
    }
    return (
        <div>
            <div className="flex justify-between mx-auto max-w-screen-md text-2xl py-5">
                <NavLink to={"/"} className="font-bold">
                    TypeScript Project
                </NavLink>
                <nav className="">
                    <NavLink to={"/users"} className="mr-5">
                        Users
                    </NavLink>
                    <NavLink to={"/todos"}>Todos</NavLink>
                </nav>
            </div>
            <h1>This project is for TypeScript understanding</h1>
            <p>Some navigation</p>

            <h2>Weather at your position</h2>
            <p>
                {lat} {long}
            </p>
            <p>
                {weather?.current_weather.temperature} {unit}
            </p>
            <div className="flex justify-center pt-10 mx-auto  h-screen w-screen">
                {isError && (
                    <p className="text-center text-red-600">
                        Something went wrong...
                    </p>
                )}

                <div className="relative w-[560px]">
                    <input
                        type="text"
                        name=""
                        id=""
                        className="border py-2 px-4 w-full h-[42px] mb-2"
                        placeholder="search for GitHub username..."
                        value={search}
                        onChange={changeHandler}
                    />

                    <ul className="list-none absolute top-[42px] left-0 right-0 max-h-[200px] shadow-md bg-white overflow-y-scroll">
                        {isLoading && <p>Loading...</p>}
                        {data?.map((user) => (
                            <li
                                key={user.id}
                                onClick={()=>clickHandler(user.login)}
                                className="py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer"
                            >
                                {user.login}
                            </li>
                        ))}
                    </ul>
                <div className='container'>
                    {isReposLoading && <p>Repos are Loading</p>}
                    { repos?.map(repo=> (
                        <RepoCard key={repo.id} repo={repo}/>
                    ))}
                </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
