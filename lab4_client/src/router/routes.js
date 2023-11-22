import Login from "../pages/Login/Login";
import MainPage from "../pages/MainPage/MainPage";
import NewsPage from "../pages/NewsPage/NewsPage";
import NewsDetails from "../pages/NewsDetails/NewsDetails";
import HotelPage from "../pages/HotelPage/HotelPage";
import HotelDetails from "../pages/HotelDetails/HotelDetails";
import ClientPage from "../pages/ClientPage/ClientPage";
import ClientDetails from "../pages/ClientDetails/ClientDetails";
import OrderPage from "../pages/OrderPage/OrderPage";
import OrderDetails from "../pages/OrderDetails/OrderDetails";
import SandboxPage from "../pages/SandboxPage/SandboxPage";

export const privateRoutes = [
    // { path: '', component: <MainPage/>, exact: true },
    // { path: '/news', component: <NewsPage/>, exact: true },

    // { path: '/events/addEvent', component: <EventAddPage/>, exact: true },
    // { path: '/events/:id', component: <EventPage/>, exact: true },
    //
    // { path: '/users', component: <UserListPage/>, exact: true },
    // { path: '/users/addUser', component: <Users/>, exact: true },
    // { path: '/users/userDetails', component: <Users/>, exact: true },
    //
    // { path: '/error', component: <ErrorPage/>, exact: true },

    /*{ path: '/users', component: , exact: true },*/
    { path: '/sandbox', component: <SandboxPage/>, exact: true },

    { path: '/client', component: <ClientPage/>, exact: true },
    { path: '/client/:id', component: <ClientDetails/>, exact: true },

    { path: '/order', component: <OrderPage/>, exact: true },
    { path: '/order/:id', component: <OrderDetails/>, exact: true },


]
export const publicRoutes = [
    { path: '', component: <MainPage/>, exact: true },
    { path: '/news', component: <NewsPage/>, exact: true },
    { path: '/news/:id', component: <NewsDetails/>, exact: true },

    { path: '/hotel', component: <HotelPage/>, exact: true },
    { path: '/hotel/:id', component: <HotelDetails/>, exact: true },

    // { path: '/login', component: <Login/>, exact: true },
    // { path: '/error', component: <ErrorPage/>, exact: true },
]