import { FieldProps, useRecordContext } from 'react-admin'
import get from 'lodash/get'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import localizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(localizedFormat)
dayjs.extend(relativeTime)

// TODO
// timeAgo should support Date type as well as strings

export const timeAgo = (timestamp: string) => {
  if (!timestamp) return null

  const m = dayjs(timestamp)

  return <span title={m.format('LLLL')}>{m.fromNow()}</span>
}

// export interface ImageFieldProps<
//     RecordType extends Record<string, unknown> = Record<string, any>
// > extends FieldProps<RecordType> {
//     src?: string;
//     title?: string;
//     sx?: SxProps;
// }

// export const ImageField = <
//     RecordType extends Record<string, unknown> = Record<string, any>
// >(
//     props: ImageFieldProps<RecordType>
// ) => {
//     const { className, emptyText, source, src, title, ...rest } = props;

// ImageField implementation
// https://github.com/marmelab/react-admin/blob/0155a34f7d70535b21a385e5c0b18370ed071e64/packages/ra-ui-materialui/src/field/ImageField.tsx#L111

/**
 * React Admin Field that renders a timestamp relative to the current time.  For example:
 * - 2 hours ago
 * - 12 minutes from now
 * The full timestamp is available as a tooltip.
 *
 * @component
 *
 * @example
 * return (
 *   <TimeAgoField source='created_at' />
 * )
 */
export const TimeAgoField = (props: FieldProps) => {
  const record = useRecordContext(props)
  const { source, ...rest } = props

  if (!record || !source) return null

  const sourceValue = get(record, source)

  return timeAgo(sourceValue)
}

// export interface TimeAgoFieldProps<
//      RecordType extends Record<string, unknown> = Record<string, any>
// > extends FieldProps<RecordType> {
// //     src?: string;
// //     title?: string;
// //     sx?: SxProps;
// }

// = <
//     RecordType extends Record<string, unknown> = Record<string, any>
// >(
//     props: TimeAgoFieldProps<RecordType>
// ) =>
