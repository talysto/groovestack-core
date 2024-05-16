import { Box, Button, InputAdornment, SxProps, TextField } from '@mui/material'
import { RefObject, useEffect, useState } from 'react'
import { TextInput, TextInputProps, useInput } from 'react-admin'

export enum QuantityInputMode {
  Controlled,
  Uncontrolled,
}

export type QuantityInputProps = {
  defaultValue?: number
  mode?: QuantityInputMode
  onChangeSuccess?: (newValue: number) => void
  ref?: RefObject<HTMLInputElement>
  sx?: SxProps
  min?: number
  max?: number
} & TextInputProps

export const QuantityInput = ({
  defaultValue,
  mode = QuantityInputMode.Uncontrolled,
  onChangeSuccess,
  ref,
  source,
  min = 0,
  max,
  ...props
}: QuantityInputProps) => {
  const {
    field,
    fieldState: { isDirty },
  } = useInput({ source, defaultValue })
  const [qty, setQty] = useState<number | null>(defaultValue as number | null)
  const [inited, setInited] = useState<boolean>(false)

  const val = mode === QuantityInputMode.Controlled ? qty : field.value
  // const onChange = mode === QuantityInputMode.Controlled ? setQty : field.onChange

  function increment() {
    if (mode === QuantityInputMode.Controlled) {
      setQty((prev) => {
        const newValue = (prev || 0) + 1
        return max != null && newValue > max ? max : newValue
      })
    } else {
      const newValue = Number(field.value) + 1
      field.onChange(
        max != null && newValue > max ? max.toString() : newValue.toString(),
      )
    }
  }

  function decrement() {
    if (mode === QuantityInputMode.Controlled) {
      setQty((prev) => {
        const newValue = (prev || 1) - 1
        return min != null && newValue < min ? min : newValue
      })
    } else {
      const newValue = Number(field.value) - 1
      field.onChange(
        min != null && newValue < min ? min.toString() : newValue.toString(),
      )
    }
  }

  useEffect(() => {
    // FOR CONTROLLED MODE
    if (mode === QuantityInputMode.Controlled) {
      if (onChangeSuccess && inited && qty != null) onChangeSuccess(qty)
      else setInited(true)
    }
  }, [qty])

  useEffect(() => {
    // FOR UNCONTROLLED MODE
    if (mode === QuantityInputMode.Uncontrolled && isDirty && onChangeSuccess)
      onChangeSuccess(field.value)
  }, [field.value])

  const defaultProps = {
    sx: { flex: 1 },
    label: 'Quantity',
    required: true,
    inputProps: { pattern: '[0-9]*', sx: { textAlign: 'center' } },
    InputLabelProps: {
      shrink: true,
    },
    InputProps: {
      startAdornment: (
        <InputAdornment disablePointerEvents={val === 0} position="start">
          <Button
            sx={{ minWidth: '2rem' }}
            disabled={val === 0}
            onClick={decrement}
          >
            -
          </Button>
        </InputAdornment>
      ),
      endAdornment: (
        <InputAdornment position="end">
          <Button sx={{ minWidth: '2rem' }} onClick={increment}>
            +
          </Button>
        </InputAdornment>
      ),
    },
  }

  return (
    <Box sx={{ mt: 1 }}>
      {mode === QuantityInputMode.Controlled ? (
        <TextField
          inputRef={ref}
          variant="outlined"
          value={qty}
          onChange={(e) => {
            const newVal = parseInt(e.target.value)
            if (isNaN(newVal)) setQty(null)
            else if (newVal < 0) setQty(0)
            else setQty(newVal)
          }}
          {...defaultProps}
          {...props}
        />
      ) : (
        <TextInput
          helperText={false}
          source={source}
          inputRef={ref}
          variant="outlined"
          {...defaultProps}
          {...props}
        />
      )}
    </Box>
  )
}
