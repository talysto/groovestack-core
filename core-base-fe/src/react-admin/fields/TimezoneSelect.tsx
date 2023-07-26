interface TimeZoneOption {
  id: string
  name: string
}

export function generateTimeZoneOptions(): TimeZoneOption[] {
  return Intl.supportedValuesOf('timeZone').map((tz) => ({ id: tz, name: tz }))
}
