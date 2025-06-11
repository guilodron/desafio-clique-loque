import type { LoggedUser } from "@/pages/Login/dto";

export interface LoggedContextDTO {
    loggedUser: LoggedUser | null;
    setLoggedUser: (user: LoggedUser) => void;
    loadContracts: (userId: string) => Promise<boolean>;
    contracts: ContractsDTO[]
}

export interface ContractsDTO {
    
    id: string;
    userId: string;
    titulo: string;
    codigoContrato: string;
    retencaoTecnica: number;

}