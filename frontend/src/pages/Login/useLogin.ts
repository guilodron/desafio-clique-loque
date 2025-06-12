import type { SubmitErrorHandler, SubmitHandler } from "react-hook-form"
import type { LoggedUser, LoginFormInput } from "./dto"
import { toast } from "sonner"
import axios from 'axios'
import { useNavigate } from "react-router"
import { useLoggedContext } from "@/hooks/loggedContext"

export function useLogin () {

    const navigate = useNavigate();
    // const {setLoggedUser, loadContracts}  = useLoggedContext();
    const {loadContracts, setLoggedUser} = useLoggedContext();

    const onSubmit: SubmitHandler<LoginFormInput> = async (data) => {
        axios.post<LoggedUser>('http://localhost:3000/user/login', {
            cnpj: data.cnpj
        }).then(async resp => {
            const user = resp.data;
            setLoggedUser(user)
            const hasContracts = await loadContracts(user.id)
            if(hasContracts) {
                return navigate('contracts')
            }
            toast.error("Usuário não possui contratos")            
        }).catch((e) => {
            if(e?.response?.data?.message) {
                toast.error(e.response.data.message)
            } else {
                toast.error(e.message)
            }
            console.log(e)

        })
    }
    const onInvalid: SubmitErrorHandler<LoginFormInput> = (errors) => {
        console.log(errors)
        toast.error(errors.cnpj?.message)
    }


    return {onSubmit, onInvalid}
}
