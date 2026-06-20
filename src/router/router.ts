import { lazy } from "react";

export const Login = lazy(() => import("../components/login"));
export const Register = lazy(() => import("../components/registr"));
export const Home = lazy(() => import("../components/Home"));
export const Debts = lazy(() => import("../components/Debts"));
export const ProfileMenu = lazy(() => import("../User/user"));
export const NotFound = lazy(() => import("../NotFound"));