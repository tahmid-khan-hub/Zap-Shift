import React from "react";
import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Authentication/Login/Login";
import Register from "../pages/Authentication/Register/Register";
import Coverage from "../pages/Coverage/Coverage";
import PrivateRoute from "../Routes/PrivateRoute"
import SendParcel from "../pages/SendParcel/SendParcel";
import DashBoardLayout from "../layouts/DashBoardLayout";
import Myparcels from "../pages/DashBoard/Myparcels";
import Payment from "../pages/DashBoard/Payment";
import PaymentHistory from "../pages/DashBoard/PaymentHistory/PaymentHistory";
import TrackParcel from "../pages/DashBoard/TrackParcel/TrackParcel";
import BeARider from "../pages/DashBoard/BeARider/BeARider";
import PendingRiders from "../pages/DashBoard/PendingRiders/PendingRiders";
import ActiveRiders from "../pages/DashBoard/ActiveRiders/ActiveRiders";
import MakeAdmin from "../pages/DashBoard/MakeAdmin/MakeAdmin";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'coverage',
        Component: Coverage,
        loader: () => fetch('./serviceCenter.json')
      },
      {
        path: 'sendParcel',
        element: <PrivateRoute>
          <SendParcel></SendParcel>
        </PrivateRoute>,
        loader: () => fetch('./serviceCenter.json')
      },
      {
        path: 'beARider',
        element: <PrivateRoute>
          <BeARider></BeARider>
        </PrivateRoute>
      }
    ],
  },
  {
    path: '/',
    Component: AuthLayout,
    children:[
      {
        path: 'login',
        Component: Login
      },
      {
        path: 'register',
        Component: Register
      }
    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoute>
      <DashBoardLayout></DashBoardLayout>
    </PrivateRoute>,
    children:[
      {
        path: 'myParcels',
        Component: Myparcels
      },
      {
        path: 'payment/:parcelId',
        Component: Payment
      },
      {
        path: 'paymentHistory',
        Component: PaymentHistory
      },
      {
        path: 'track',
        Component: TrackParcel
      },
      {
        path: 'pendingRiders',
        Component: PendingRiders
      },
      {
        path: 'activeRiders',
        Component: ActiveRiders
      },
      {
        path: 'makeAdmin',
        Component: MakeAdmin
      }
    ]
  }
]);
