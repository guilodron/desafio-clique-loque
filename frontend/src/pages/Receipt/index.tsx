import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useLoggedContext } from '@/hooks/loggedContext'
import Logo from '/logo.png'
import { useLocation, useNavigate } from 'react-router'
import type { ContractsDTO } from '@/hooks/loggedContextDto';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { type ReceiptFormInput, receiptSchema } from './dto';
import { zodResolver } from '@hookform/resolvers/zod';
import { CustomFormField } from '@/components/CustomFormField';
import { Checkbox } from '@/components/ui/checkbox';
import { useEffect, useState } from 'react';
import type { CheckedState } from '@radix-ui/react-checkbox';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { toast } from 'sonner';

interface ReceiptLocationState {
    contract: ContractsDTO;
}

const Receipt = () => {

    const { loggedUser } = useLoggedContext()
    const { state } = useLocation() as { state: ReceiptLocationState }
    const [isRetencaoImpostosActive, setIsRetencaoImpostosActive] = useState<CheckedState>(false);
    const [valorRetencaoTecnica, setValorRetencaoTecnica] = useState('');
    const { contract } = state
    const navigate = useNavigate()
    const form = useForm<ReceiptFormInput>({
        resolver: zodResolver(receiptSchema),
        defaultValues: {
            numeroNota: "",
            dataEmissao: "",
            dataVencimento: "",
            valor: "",
            isRetencaoImpostosActive: false,
            issqn: '',
            irrf: '',
            csll: '',
            cofins: '',
            inss: '',
            pis: '',
            isRetencaoTecnica: false,
            percentual: contract.retencaoTecnica + '',
            valorRetencao: '',
            files: []
        }
    });
    useEffect(() => {
        console.log('entrou effect')
        const valor = parseFloat(form.watch("valor"));
        const percentual = contract.retencaoTecnica; // e.g., 5 for 5%
        const isRetencaoTecnica = form.watch("isRetencaoTecnica");
        if (isRetencaoTecnica && !isNaN(valor) && !isNaN(percentual)) {
            const valorRetencao = ((valor * percentual) / 100).toFixed(2);
            setValorRetencaoTecnica(valorRetencao)
            form.setValue('valorRetencao', valorRetencao)
        } else {
            form.setValue('valorRetencao', "")
            setValorRetencaoTecnica("")

        }
    }, [form.watch("valor"), form.watch("isRetencaoTecnica"), contract.retencaoTecnica, form]);

    const onSubmit: SubmitHandler<ReceiptFormInput> = (data) => {
        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
            if (key !== "files") {
                formData.append(key, value as string);
            }
        });

        const files = data.files as FileList;
        if (files && files.length) {
            Array.from(files).forEach(file => {
                formData.append("files", file);
            });
        }
        console.log(formData)
        axios.post('http://localhost:3000/contracts/sendData', formData, {
            headers: { "Content-Type": "multipart/form-data" }
        })
            .then((response) => {
                toast.success(response.data)
                navigate('/')
            })
            .catch(() => {
                toast.error("Ocorreu um erro ao enviar o formulário")
            });
    };

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
                    <Form {...form}>
                        <form encType='multipart/form-data' onSubmit={form.handleSubmit(onSubmit)}>
                            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4'>
                                <CustomFormField
                                    form={form}
                                    label='Número da Nota'
                                    name='numeroNota'
                                    placeholder='Número Nota'
                                />
                                <CustomFormField
                                    form={form}
                                    label='Data da Emissão'
                                    name='dataEmissao'
                                    type='date'
                                />
                                <CustomFormField
                                    form={form}
                                    label='Data do Vencimento'
                                    name='dataVencimento'
                                    type='date'
                                />
                                <CustomFormField
                                    form={form}
                                    label='Valor'
                                    name='valor'
                                    placeholder='R$ 00,00'
                                    type='number'
                                    step={"0.01"}
                                    handleBlur={e => {
                                        const value = parseFloat(e.target.value);
                                        if (!isNaN(value)) {
                                            form.setValue('valor', value.toFixed(2));
                                        }
                                    }}
                                />
                            </div>
                            <div>
                                <Checkbox
                                    className="mt-4 mb-4"
                                    onCheckedChange={(checked) => {
                                        form.setValue("isRetencaoImpostosActive", !!checked);
                                        setIsRetencaoImpostosActive(checked)
                                    }}
                                    checked={form.watch("isRetencaoImpostosActive")}
                                />
                                <span>Retenção de impostos</span>
                            </div>
                            {isRetencaoImpostosActive &&
                                <Card>
                                    <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                                        <CustomFormField
                                            form={form}
                                            label='ISSQN'
                                            name='issqn'
                                            type='number'
                                        />
                                        <CustomFormField
                                            form={form}
                                            label='IRRF'
                                            type='number'
                                            name='irrf'
                                        />
                                        <CustomFormField
                                            form={form}
                                            label='CSLL'
                                            type='number'
                                            name='csll'
                                        />
                                        <CustomFormField
                                            form={form}
                                            label='COFINS'
                                            type='number'
                                            name='cofins'
                                        />
                                        <CustomFormField
                                            form={form}
                                            label='INSS'
                                            type='number'
                                            name='inss'
                                        />
                                        <CustomFormField
                                            form={form}
                                            label='PIS'
                                            type='number'
                                            name='pis'
                                        />
                                    </CardContent>
                                </Card>

                            }
                            <div>
                                <Checkbox
                                    className="mt-4 mb-4"
                                    onCheckedChange={(checked) => {
                                        form.setValue("isRetencaoTecnica", !!checked);
                                    }}
                                    checked={form.watch("isRetencaoTecnica")}
                                />
                                <span>Retenção Técnica</span>
                            </div>
                            {form.watch("isRetencaoTecnica") &&
                                <Card>
                                    <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <CustomFormField
                                            form={form}
                                            label='Valor'
                                            name='valorRetencao'
                                            value={valorRetencaoTecnica}
                                            disabled
                                        />
                                        <CustomFormField
                                            form={form}
                                            label='Percentual'
                                            type='number'
                                            name='percentual'
                                            disabled
                                            value={contract.retencaoTecnica + ''}
                                        />

                                    </CardContent>
                                </Card>
                            }
                            {/* TODO file managment */}

                            <FormField
                                control={form.control}
                                name='files'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                type='file'
                                                name={field.name}
                                                multiple
                                                ref={field.ref}
                                                accept='*'
                                                onChange={event => {
                                                    field.onChange(event.target.files);
                                                }}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button type='submit'>click</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

export default Receipt