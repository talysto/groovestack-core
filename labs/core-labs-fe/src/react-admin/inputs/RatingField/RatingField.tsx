import { Rating, RatingProps } from "@mui/material"
import { FieldProps } from "react-admin"

export interface RatingFieldProps extends FieldProps {
  componentProps?: RatingProps
}

export const RatingField = ({componentProps, ...props}: RatingFieldProps) => {
  //  const record = useRecordContext(props);

  // const { record, source } = props
  // return <Rating value={record[source]} {...componentProps} />
  return <Rating {...componentProps} {...props} />
}