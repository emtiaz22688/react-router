import React from 'react';
import Header from '../components/shared/Header/Header';
import { Outlet } from 'react-router-dom';
import Counter from '../components/counter/Counter';
import Demo1 from '../components/Demo/Demo1';
import Card from '../components/Card/Card';

const Main = () => {
    return (
        <div>
            <Header></Header>
            <Outlet></Outlet>
            <Counter></Counter>
            <Demo1></Demo1>
            <Card></Card>
            <footer></footer>
        </div>
    );
};

export default Main;