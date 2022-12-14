/* 
    App > List + Edit + Means
    Login
    Register
    History模式  --  BrowserRouter
    Hash模式     --  HashRouter
*/

import React, { lazy, Suspense } from 'react'
import App from '../App'
// import ListTable from '../pages/ListTable'
// import ListList from '../pages/ListList'
import Loading from "components/Loading"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


//定义数组每一项的接口
interface IRoute {
    path: string;
    component: any;
    children?: IRoute[]
}

const router_arr: IRoute[] = [
    {
        path: "/", component: App, children: [
            { path: "/list", component: lazy(() => import("pages/List")) },
            { path: "/edit", component: lazy(() => import("pages/Edit")) },
            { path: "/edit/:id", component: lazy(() => import("pages/Edit")) },
            { path: "/means", component: lazy(() => import("pages/Means")) },
            { path: "/namelist", component: lazy(() => import("pages/NameList")) },
        ]
    },
    { path: "/login", component: lazy(() => import("pages/Login")) },
    { path: "/register", component: lazy(() => import("pages/Register")) },
]

const MyRouter = () => (
    <Router >
        <Suspense fallback={<Loading />}>
            <Routes>
                {
                    router_arr.map((item, index) => {
                        return (
                            item.children ? //有子路由
                                <Route key={index} path={item.path} element={<item.component />}>
                                    {
                                        item.children.map((e, i) => <Route key={i} path={e.path} element={<e.component />}></Route>)
                                    }
                                </Route>
                                ://没子路由
                                <Route key={index} path={item.path} element={<item.component />}></Route>
                        )
                    })
                }
            </Routes>
        </Suspense>

    </Router>
)

export default MyRouter