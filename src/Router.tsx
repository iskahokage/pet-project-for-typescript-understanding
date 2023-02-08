import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import TodoPage from "./pages/TodoPage";
import UserPage from "./pages/UserPage";
import { store } from "./store";

const Router = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<Home />} />
                    <Route path={"/users"} element={<UserPage />} />
                    <Route path={"/todos"} element={<TodoPage />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    );
};

export default Router;
