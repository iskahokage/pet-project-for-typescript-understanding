import axios from 'axios';
import React, { FC, MouseEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import List from '../components/List';
import UserItem from '../components/UserItem';

import { IUser } from '../types/types';

const UserPage: FC = () => {


    const [userList, setUserList] = useState<IUser[]>([])
    useEffect(()=> {
        getUsers()
    }, [])

    const getUsers = async()=> {
        try {
            const {data} = await axios.get<IUser[]>('https://jsonplaceholder.typicode.com/users')
            setUserList(data)
        } catch (error) {
            alert(error)
        }
    }

    const navigate = useNavigate()

    const clickHandler = (e :MouseEvent<HTMLParagraphElement>) => {
        navigate('/')
    }


    return (
        <div>
            <p onClick={clickHandler} className='goBackTitle'>Go Back</p>
            <p>There I am using jsonplaceholder and open-meteo APIs</p>
            <List items={userList} renderItem={(user: IUser)=> <UserItem user={user} key={user.id}/>}/>
        </div>
    );
};

export default UserPage;