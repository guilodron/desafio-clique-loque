import { useLoggedContext } from '@/hooks/loggedContext'

export const Contract = () => {

    const {contracts} = useLoggedContext();
    console.log(contracts)

  return (
    <div>
        asdfasdfasdf
        {contracts.map(item => (
            <h1 key={item.id}>{item.titulo} e {item.codigoContrato}</h1>
        ))}
    </div>
  )
}
