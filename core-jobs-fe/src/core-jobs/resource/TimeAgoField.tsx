import React from 'react'

import moment from 'moment';
import { useRecordContext } from "react-admin";

export const timeAgo = (timestamp: string) => {
  if (!timestamp) return null;

  const m = moment(timestamp);
  return (
    <span title={m.format('dddd, MMMM Do YYYY, h:mm a')}>{m.fromNow()}</span>
  );
};

export const TimeAgoField:React.FC<{ label?: string; source: string; }> = ({ source }) => {
  const record = useRecordContext()

  if (!record) return null 

  return timeAgo(record[source]);
}