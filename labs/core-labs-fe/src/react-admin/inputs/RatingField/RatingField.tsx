import { Rating, RatingProps } from "@mui/material"
import { FieldProps, useRecordContext } from "react-admin"

export interface RatingFieldProps extends FieldProps {
  componentProps?: RatingProps
}

/**
 * RatingField is a React Admin field that formats a rating value as a MUI rating component.
 *
 * FEATURES
 * - Standard React Admin Field property interface and the ability to pass MUI Rating component props via 'componentProps'
 *
 * TODO
 * - test further
 *
 * NOTES
 * - Rating field show what others think of something.
 */
export const RatingField = ({componentProps, ...props}: RatingFieldProps) => {
  const record = useRecordContext(props);
  const value = props.source ? record[props.source] : undefined;
  return <Rating value={value} {...componentProps} readOnly={true} />
}