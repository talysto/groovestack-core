// Based on
//https://github.com/marmelab/react-admin/blob/master/packages/ra-ui-materialui/src/input/RadioButtonGroupInput.tsx
import clsx from 'clsx'
// import PropTypes from 'prop-types'
// import get from 'lodash/get'
import {
  FormControl,
  FormControlProps,
  FormHelperText,
  FormLabel,
  ToggleButton,
  ToggleButtonGroup,
  ToggleButtonGroupProps,
  styled,
} from '@mui/material'
import {
  ChoicesProps,
  CommonInputProps,
  FieldTitle,
  InputHelperText,
  Labeled,
  LinearProgress,
  sanitizeInputRestProps,
  useChoices,
  useChoicesContext,
  useInput,
} from 'react-admin'
// import { useChoices } from 'ra-core'
// import { sanitizeInputRestProps } from './sanitizeInputRestProps'


/**
 * React Admin Custom Input built off the the RadioButtonGroupInput (https://github.com/marmelab/react-admin/blob/master/packages/ra-ui-materialui/src/input/RadioButtonGroupInput.tsx)
 * Allows for single choice to be selected via toggle buttons, similar to a radio button input.
 * 
 * @component
 *
 * @example
 * return (
 *  <ToggleButtonInput source='status' />
 * )
 */

export function ToggleButtonInput(props: ToggleButtonGroupInputProps) {
  const {
    alwaysOn,
    choices: choicesProp,
    className,
    format,
    helperText,
    isFetching: isFetchingProp,
    isLoading: isLoadingProp,
    label,
    margin = 'dense',
    onBlur,
    onChange,
    options = defaultOptions,
    optionText = 'name',
    optionValue = 'id',
    parse,
    resource: resourceProp,
    // row = true,
    orientation = 'horizontal',
    source: sourceProp,
    translateChoice = true,
    validate,
    ...rest
  } = props

  const {
    allChoices,
    isLoading,
    error: fetchError,
    resource,
    source,
  } = useChoicesContext({
    choices: choicesProp,
    isFetching: isFetchingProp,
    isLoading: isLoadingProp,
    resource: resourceProp,
    source: sourceProp,
  })

  if (source === undefined) {
    throw new Error(
      `If you're not wrapping the ToggleButtonInput inside a ReferenceArrayInput, you must provide the source prop`,
    )
  }

  if (!isLoading && !fetchError && allChoices === undefined) {
    throw new Error(
      `If you're not wrapping the ToggleButtonInput inside a ReferenceArrayInput, you must provide the choices prop`,
    )
  }

  const { id, isRequired, fieldState, field, formState } = useInput({
    format,
    onBlur,
    onChange,
    parse,
    resource,
    source,
    validate,
    ...rest,
  })

  const { error, invalid, isTouched } = fieldState
  const { isSubmitted } = formState

  if (isLoading) {
    return (
      <Labeled
        htmlFor={id}
        label={label}
        source={source}
        resource={resource}
        className={clsx('ra-input', `ra-input-${source}`, className)}
        isRequired={isRequired}
      >
        <LinearProgress />
      </Labeled>
    )
  }

  const renderHelperText =
    !!fetchError ||
    helperText !== false ||
    ((isTouched || isSubmitted) && invalid)

  return (
    <StyledFormControl
      component="fieldset"
      className={clsx('ra-input', `ra-input-${source}`, className)}
      margin={margin}
      error={fetchError || ((isTouched || isSubmitted) && invalid)}
      {...sanitizeRestProps(rest)}
      {...rest}
    >
      <FormLabel
        component="legend"
        className={ToggleButtonGroupInputClasses.label}
      >
        <FieldTitle
          label={label}
          source={source}
          resource={resource}
          isRequired={isRequired}
        />
      </FormLabel>

      <ToggleButtonGroup
        id={id}
        {...field}
        {...options}
        orientation={orientation} // row={row}
        {...sanitizeRestProps(rest)}
        {...rest}
        exclusive
      >
        {allChoices?.map((choice, idx: number) => {
          const { getChoiceText, getChoiceValue } = useChoices({
            optionText,
            optionValue,
            translateChoice,
          })
          const label = getChoiceText(choice)
          const value = getChoiceValue(choice)
          const nodeId = `${source}_${value}`

          return (
            <ToggleButton
              key={idx}
              // htmlFor={nodeId}
              value={value}
              id={nodeId}
              color="primary"
            >
              {label}
            </ToggleButton>
          )
        })}
      </ToggleButtonGroup>
      {renderHelperText ? (
        <FormHelperText>
          <InputHelperText
            touched={isTouched || isSubmitted || fetchError}
            error={error?.message || fetchError?.message}
            helperText={helperText}
          />
        </FormHelperText>
      ) : null}
    </StyledFormControl>
  )
}

// ToggleButtonInput.propTypes = {
//   choices: PropTypes.arrayOf(PropTypes.any),
//   label: PropTypes.oneOfType([
//     PropTypes.string,
//     PropTypes.bool,
//     PropTypes.element,
//   ]),
//   options: PropTypes.object,
//   optionText: PropTypes.oneOfType([
//     PropTypes.string,
//     PropTypes.func,
//     PropTypes.element,
//   ]),
//   optionValue: PropTypes.string,
//   resource: PropTypes.string,
//   source: PropTypes.string,
//   translateChoice: PropTypes.bool,
// }

const sanitizeRestProps = ({
  afterSubmit,
  allowNull,
  alwaysOn,
  beforeSubmit,
  choices,
  className,
  crudGetMatching,
  crudGetOne,
  data,
  filter,
  filterToQuery,
  formatOnBlur,
  isEqual,
  limitChoicesToValue,
  multiple,
  name,
  pagination,
  perPage,
  ref,
  reference,
  refetch,
  render,
  setFilter,
  setPagination,
  setSort,
  sort,
  subscription,
  type,
  validateFields,
  validation,
  value,
  ...rest
}: any) => sanitizeInputRestProps(rest)

export type ToggleButtonGroupInputProps = Omit<CommonInputProps, 'source'> &
  ChoicesProps &
  FormControlProps &
  ToggleButtonGroupProps & {
    options?: ToggleButtonGroupProps
    source?: string
  }

const PREFIX = 'RaToggleButtonGroupInput'

export const ToggleButtonGroupInputClasses = {
  label: `${PREFIX}-label`,
}

const StyledFormControl = styled(FormControl, {
  name: PREFIX,
  overridesResolver: (props, styles) => styles.root,
})(({ theme }) => ({
  [`& .${ToggleButtonGroupInputClasses.label}`]: {
    // transform: 'translate(0, 5px) scale(0.75)',
    // transformOrigin: `top ${theme.direction === 'ltr' ? 'left' : 'right'}`,
  },
}))

const defaultOptions = {}
