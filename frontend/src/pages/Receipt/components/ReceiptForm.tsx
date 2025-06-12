import { Card, CardContent } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { CustomFormField } from '@/components/CustomFormField';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import type { UseFormReturn } from 'react-hook-form';
import type { ReceiptFormInput } from '../dto';
import type { CheckedState } from '@radix-ui/react-checkbox';


type ReceiptFormProps = {
    form: UseFormReturn<ReceiptFormInput>;
    onSubmit: (data: ReceiptFormInput) => void;
    setIsRetencaoImpostosActive: (active: CheckedState) => void;
    isRetencaoImpostosActive: CheckedState;
    valorRetencaoTecnica: string;
    contract: { retencaoTecnica: number };
};

export const ReceiptForm = ({
    form,
    onSubmit,
    setIsRetencaoImpostosActive,
    isRetencaoImpostosActive,
    valorRetencaoTecnica,
    contract
}: ReceiptFormProps) => {
    return (
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
    )
}
