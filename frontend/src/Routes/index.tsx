import { Route, Routes } from "react-router"
import { Login } from "../pages/Login"
import { Contract } from "@/pages/Contract"

export const AppRoutes = () => {
  return (
    <Routes>
        <Route Component={Login} path="/" />
        <Route Component={Contract} path="/contracts" />
    </Routes>
  )
}
