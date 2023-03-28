// import React from 'react'

// import {
//     AutocompleteInput,
//     InputProps,
//     ReferenceInput,
//     ReferenceInputProps,
//     TextInput,
//     useRecordContext,
// } from 'react-admin'

// interface PolymorphicReferenceInputProps extends ReferenceInputProps {
//     source: string
// }

// export const PolymorphicReferenceInput = ({
//     source
// }) => {
//     const record = useRecordContext()
//     console.log(record)

//     // let refReference = record[`${source}_type`]
//     // let refSource = `${source}_id`

//     // if (record[source]) {
//     //     refReference = record[source]['type']
//     //     refSource = `${source}.id`
//     // }

//     //     return (<ReferenceInput source={refSource} reference={refReference} alwaysOn>
//     //     <AutocompleteInput />
//     //   </ReferenceInput >)

//     return (<ReferenceInput alwaysOn label="Author" source="author_id" reference="User" perPage={10}>
//         <AutocompleteInput />
//     </ReferenceInput>)
// }
import React from 'react'

import {
  PublicFieldProps,
  ReferenceField,
  ReferenceInput,
  TextField,
  useListContext,
  useRecordContext,
  useResourceContext,
} from 'react-admin'

interface PolymorphicReferenceFieldProps extends PublicFieldProps {
  source: string
}


export const PolymorphicReferenceInput = ({
  source,
}: PolymorphicReferenceFieldProps) => {
  const {data} = useListContext()
  console.log("record = ", data)
  if(!data) return null
  const record = data[0]
  
  let refReference = record[`${source}_type`]
  let refSource = `${source}_id`

  if (record[source]) {
    refReference = record[source]['type']
    refSource = `${source}.id`
  }
  return <ReferenceInput alwaysOn source={refSource} reference={refReference} />
}
