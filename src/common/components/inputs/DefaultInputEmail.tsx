import { ActionCreatorWithPayload } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
import { Input, FormFeedback } from "reactstrap"
import { InputType } from "reactstrap/types/lib/Input"
import { useState } from "react"
import * as Yup from "yup"

interface InputProps<T> extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  field: keyof T
  store: T
  setFieldValue: ActionCreatorWithPayload<
    { field: keyof T; value: T[keyof T] },
    string
  >
  type?: InputType
  required?: boolean
  [key: string]: any
}

const emailValidationSchema = Yup.string()
  .matches(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    "O e-mail deve ser válido."
  )
  .required("O e-mail é obrigatório.")

const DefaultInputEmail = <T extends object>({
  label,
  field,
  store,
  setFieldValue,
  type = "email",
  required = false,
  ...rest
}: InputProps<T>) => {
  const fieldValue = store[field]
  const dispatch = useDispatch()

  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value as T[keyof T]
    dispatch(setFieldValue({ field, value: newValue }))
    setError(null)
  }

  const validateEmail = (value: string) => {
    try {
      emailValidationSchema.validateSync(value)
      setError(null)
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value

    if (required && !value) {
      setError(`${label} é obrigatório.`)
    } else if (value) {
      validateEmail(value)
    }
  }

  return (
    <div {...rest}>
      <label>{label}</label>
      <Input
        type={type}
        value={fieldValue as string}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={`Insira ${label}`}
        invalid={!!error}
      />
      {error && (
        <FormFeedback className="mt-1 text-break">{error}</FormFeedback>
      )}
    </div>
  )
}

export default DefaultInputEmail
