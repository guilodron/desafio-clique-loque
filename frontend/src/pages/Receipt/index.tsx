import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Logo from '/logo.png'
import { useReceipt } from './useReceipt';
import { ReceiptForm } from './components/ReceiptForm';



const Receipt = () => {

    const {form, loggedUser, contract, onSubmit, setIsRetencaoImpostosActive, valorRetencaoTecnica, isRetencaoImpostosActive} = useReceipt();

    return (
        <div className='w-screen h-screen flex items-center justify-center'>
            <Card className='w-full max-w-3xl'>
                <CardHeader className='w-full flex flex-row items-center'>
                    <img src={Logo} className='max-w-28 bg-blue-loque' />
                    <span className='w-full text-center text-xl font-bold'>PAGAMENTO DE FORNECEDOR</span>
                </CardHeader>
                <CardContent>
                    <div className='flex flex-row justify-between'>
                        <span><b>Razão Social</b>: {loggedUser?.razaoSocial}</span>
                        <span><b>CNPJ</b>: {loggedUser?.cnpj}</span>
                    </div>
                    <span><b>Nome Fantasia:</b> {loggedUser?.nomeFantasia}</span>
                    <hr />
                    <p className='mt-3 mb-3 w-full text-center font-bold'>Dados da Nota Fiscal</p>
                    <hr />
                    <div className='mt-4'>
                        <span className='mr-8'><b>Codigo do contrato: </b>{contract.codigoContrato}</span>
                        <span>{contract.titulo}</span>
                    </div>
                    <ReceiptForm 
                        contract={contract}
                        form={form}
                        onSubmit={onSubmit}
                        setIsRetencaoImpostosActive={setIsRetencaoImpostosActive}
                        isRetencaoImpostosActive={isRetencaoImpostosActive}
                        valorRetencaoTecnica={valorRetencaoTecnica}
                    />
                </CardContent>
            </Card>
        </div>
    )
}

export default Receipt