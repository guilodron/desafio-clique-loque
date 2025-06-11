import type { LoggedUser } from "@/pages/Login/dto";
import { createContext, useContext, useState, type ReactNode } from "react";
import type React from "react";
import type { ContractsDTO, LoggedContextDTO } from "./loggedContextDto";
import axios from "axios";

const LoggedContext = createContext<LoggedContextDTO | null>(null);

export default function LoggerContextProvider({children}: {children: ReactNode}): React.ReactElement {
    

    const [loggedUser, setLoggedUser] = useState<LoggedUser | null>(null);
    const [contracts, setContracts] = useState<ContractsDTO[]>([])

    const loadContracts = async (userId: string) => {
        const contracts = await axios.get<ContractsDTO[]>(`http://localhost:3000/contracts/${userId}`);
        console.log(contracts.data)
        if(contracts?.data?.length > 0) {
            setContracts(contracts.data)
            return true;
        }
        return false;
    }

    return (
        <LoggedContext.Provider value={{loggedUser, setLoggedUser, loadContracts, contracts}}>
            {children}
        </LoggedContext.Provider>
    );
}

export const useLoggedContext = () => {
    const context = useContext(LoggedContext);
    if(context == null) {
        throw new Error("This should be called inside LoggedProvider!")
    }
    return context;
}