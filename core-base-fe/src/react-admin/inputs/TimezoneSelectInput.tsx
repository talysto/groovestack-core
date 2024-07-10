import { AutocompleteInput, AutocompleteInputProps, SelectInputProps } from "react-admin"

interface TimeZoneOption {
  id: string
  name: string
}

export function generateTimeZoneOptions(): TimeZoneOption[] {
  let zones = Intl.supportedValuesOf('timeZone')

  const currentZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  if(currentZone) {
    zones = zones.filter(item => item !== currentZone)
    zones.unshift(currentZone)
  }

  return zones.map((tz) => ({ id: tz, name: tz.replace(/_/g, ' ') }))
}

/**
 * React Admin Input that allows user to select a timezone. '
 * Input provides the current timezone as a first option and autocomplete to quickly find your local timezone.
 *
 * @component
 *
 *
 * @example
 * return (
 *   <TimezoneSelectInput source='timezone' />
 * )
 */
export const TimezoneSelectInput = (props: AutocompleteInputProps) => {

  const zones = generateTimeZoneOptions()

  return (
    <AutocompleteInput
      defaultValue={Intl.DateTimeFormat().resolvedOptions().timeZone}
      choices={zones}
      {...props}
    />
  )
}