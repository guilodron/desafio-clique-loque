import { Route, Routes } from "react-router"
import { Login } from "../pages/Login"
import { Contract } from "@/pages/Contract"
import Receipt from "@/pages/Receipt"

export const AppRoutes = () => {
  return (
    <Routes>
        <Route Component={Login} path="/" />
        <Route Component={Contract} path="/contracts" />
        <Route Component={Receipt} path="/contracts/receipt" />
    </Routes>
  )
}
