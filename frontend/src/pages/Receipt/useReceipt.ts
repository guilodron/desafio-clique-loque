import { useLoggedContext } from "@/hooks/loggedContext";
import type { CheckedState } from "@radix-ui/react-checkbox";
import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { receiptSchema, type ReceiptFormInput, type ReceiptLocationState } from "./dto";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";

export function useReceipt() {
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

    return { form, loggedUser, contract, onSubmit, setIsRetencaoImpostosActive, valorRetencaoTecnica, isRetencaoImpostosActive }
}