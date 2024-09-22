import { useRef, useCallback, useState } from "react"

const ClientPaymentFormViewModel = () => {
 
    const creditCardRef = useRef() as any
    const [values, setValues] = useState({
        brand: '',
        cvv: '',
        expiration: '',
        holder: '',
        number: ''
    })

    const handleSubmit = useCallback(() => {
        if (creditCardRef.current) {
          const { error, data } = creditCardRef.current.submit()
          if (error !== null) {
              setValues(data)
          }
          console.log('ERROR: ', error)
          console.log('CARD DATA: ', data)
        }
      }, [])

  return {
    creditCardRef,
    handleSubmit
  }
}

export default ClientPaymentFormViewModel
