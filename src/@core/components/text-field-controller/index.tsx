import {Control, Controller, FieldError} from 'react-hook-form'
import TextField from '@mui/material/TextField'

interface Props {
  errors: FieldError | any
  control: Control<any>
  fieldName: any
  labelText: string
  placeholder: string
  disabled?: boolean
}

const TextFieldController = ({
                               fieldName,
                               control,
                               errors,
                               labelText,
                               placeholder,
                               disabled = false,
                               ...rest
                             }: Props | any): JSX.Element => {
  return (
    <>
      <Controller
        name={fieldName}
        control={control}
        render={({field: {ref, onChange, onBlur, value, name}}) => (
          <TextField
            error={errors?.[fieldName]?.message ? true : false}
            helperText={`${errors?.[fieldName]?.message ?? ''}`}
            id={fieldName}
            label={labelText}
            placeholder={placeholder}
            disabled={disabled}
            ref={ref}
            {...{
              onChange,
              onBlur,
              value,
              name
            }}
            {...rest}
          />
        )}
      />
    </>
  )
}

export default TextFieldController
