import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useLoggedContext } from '@/hooks/loggedContext'
import Logo from '/logo.png'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import {Search} from 'lucide-react'
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import type { ContractsDTO } from '@/hooks/loggedContextDto';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import type { CheckedState } from '@radix-ui/react-checkbox';

export const Contract = () => {

  const { contracts, loggedUser } = useLoggedContext();
  const [selectedContracts, setSelectedContracts] = useState<ContractsDTO[]>([]);
  const navigate = useNavigate();

  const handleCheck = (checked: CheckedState, contract: ContractsDTO) => {
    if(checked){
      setSelectedContracts([...selectedContracts, contract])
    } else {
      setSelectedContracts(selectedContracts.filter(c => c.id != contract.id))
    }
  }

  const handleNext = () => {
    if(selectedContracts.length == 0) {
      return toast.error("Ao menos um Contrato deverá ser selecionado")
    }
    else if(selectedContracts.length > 1) {
      return toast.error("Somente um Contrato deverá ser selecionado")
    }
    navigate('/contracts/receipt', {state: {contract: selectedContracts[0]}})
  }

  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <Card className='w-full max-w-3xl'>
        <CardHeader className='w-full flex flex-row items-center'>
          <img src={Logo} className='max-w-28 bg-blue-loque'/>
          <span className='w-full text-center text-xl font-bold'>PAGAMENTO DE FORNECEDOR</span>
        </CardHeader>
        <CardContent>
          <div className='flex flex-row justify-between'>
            <span><b>Razão Social</b>: {loggedUser?.razaoSocial}</span>
            <span><b>CNPJ</b>: {loggedUser?.cnpj}</span>
          </div>
          <span><b>Nome Fantasia:</b> {loggedUser?.nomeFantasia}</span>
          <hr />
          <p className='mt-3 mb-3 w-full text-center font-bold'>Contratos Vinculados</p>
          <Table>
            <TableHeader>
              <TableRow className='bg-gray-100'>
                <TableHead></TableHead>
                <TableHead>Nome do Contrato</TableHead>
                <TableHead>Código do Contrato</TableHead>
                <TableHead>Retenção Técnica</TableHead>
                <TableHead>Detalhes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
                {contracts.map(contract => (
                  <TableRow key={contract.id}>
                    <TableCell>
                      <Checkbox 
                        checked={selectedContracts.some(c => c.id === contract.id)}
                        onCheckedChange={(e) => handleCheck(e, contract)}
                      />
                    </TableCell>
                    <TableCell>{contract.titulo}</TableCell>
                    <TableCell>{contract.codigoContrato}</TableCell>
                    <TableCell>{contract.retencaoTecnica}%</TableCell>
                    <TableCell>
                      <Button>
                        <Search />
                      </Button>
                    </TableCell>                    
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <div className='flex flex-row justify-end mt-4'>
            <Button onClick={() => console.log(selectedContracts)} className='mr-3 p-5'>ANTERIOR</Button>
            <Button onClick={handleNext} className='p-5'>PROXIMO</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
