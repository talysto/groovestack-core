import React from 'react'

import {
    AutocompleteInput,
    InputProps,
    ReferenceInput,
    ReferenceInputProps,
    TextInput,
    useRecordContext,
} from 'react-admin'

interface PolymorphicReferenceInputProps extends ReferenceInputProps {
    source: string
}

export const PolymorphicReferenceInput = ({
    source
}: PolymorphicReferenceInputProps) => {
    const record = useRecordContext()
    console.log(record)

    // let refReference = record[`${source}_type`]
    // let refSource = `${source}_id`

    // if (record[source]) {
    //     refReference = record[source]['type']
    //     refSource = `${source}.id`
    // }

    //     return (<ReferenceInput source={refSource} reference={refReference} alwaysOn>
    //     <AutocompleteInput />
    //   </ReferenceInput >)

    return (<ReferenceInput alwaysOn label="Author" source="author_id" reference="User" perPage={10}>
        <AutocompleteInput />
    </ReferenceInput>)




}
