import { Card, CardContent, CardHeader } from "@/components/ui/card"
import Logo from '/logo.png'
import { Controller, useForm } from "react-hook-form"
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {createDefaultMaskGenerator, MaskedInput} from 'react-hook-mask'
import { loginSchema, type LoginFormInput } from "./dto";
import { useLogin } from "./useLogin";

export const Login = () => {

    const {handleSubmit, control} = useForm<LoginFormInput>({
        resolver: zodResolver(loginSchema),

        defaultValues: {
            cnpj: ''
        }
    });
    const {onInvalid, onSubmit} = useLogin();

    const maskGenerator = createDefaultMaskGenerator('99.999.999/9999-99');

    return (
        <div className='flex w-screen h-screen justify-center items-center '>
            <Card className='w-md bg-blue-loque shadow-md/30 h-'>
                <CardHeader className="flex justify-center">
                    <img src={Logo} alt="logo clique loque" className='max-w-32' />
                </CardHeader>
                <CardContent className="flex flex-col justify-center items-center">
                    <h1 className="text-white text-xl font-bold">PAGAMENTO DE FORNECEDOR</h1>
                    <form className="mt-3 flex flex-col max-w-70 w-full" onSubmit={handleSubmit(onSubmit, onInvalid)} >
                        <Controller 
                            name="cnpj"
                            control={control}
                            render={({field}) => (
                                <MaskedInput 
                                    className="bg-white w-full mb-2 h-8 p-3"
                                    maskGenerator={maskGenerator}
                                    placeholder="00.000.000/0000-00"
                                    {...field}
                                
                                />
                            )}
                        />
                        <Button className="w-full h-9 p-2 bg-green-loque" type="submit">
                            Acessar
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
