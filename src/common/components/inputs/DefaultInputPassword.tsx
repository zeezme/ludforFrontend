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

const passwordValidationSchema = Yup.string()
  .min(6, "Senha deve ter no mínimo 6 caracteres.")
  .max(20, "Senha deve ter no máximo 20 caracteres.")
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
    "Senha deve conter pelo menos uma letra minúscula, uma letra maiúscula e um número."
  )

const DefaultInputPassword = <T extends object>({
  label,
  field,
  store,
  setFieldValue,
  type = "text",
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

  const validatePassword = async (value: string) => {
    try {
      await passwordValidationSchema.validate(value)
      setError(null)
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleBlur = () => {
    if (type === "password") {
      validatePassword(fieldValue as string)
    }

    if (required && !fieldValue) {
      setError(`${label} é obrigatório.`)
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

export default DefaultInputPassword
