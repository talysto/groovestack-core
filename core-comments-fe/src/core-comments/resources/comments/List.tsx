import React from 'react'

import {
    List,
    Datagrid,
    TextField,
    DateField,
    EditButton,
    ListProps,
    SearchInput,
    DateInput,
    ReferenceInput,
    SelectInput
} from "react-admin";

import { AuthorField } from './AuthorField'
import { ResourceField } from './ResourceField'

const ActionsField = (props: any) => {
    return (
        <EditButton
            // basePath={props.basePath} // TODO: Upgrade this
         record={props.record} />
    )
}

const commentFilters = [
    <SearchInput source="q" alwaysOn />,
    <DateInput source="createdAtLte" label="Before" />,
    <DateInput source="createdAtGte" label="After" />,
    <ReferenceInput
        source="authorId"
        label="Author"
        reference="User" // TODO this is a polymorphic reference on comments table so shouldn't be limited to User
        allowEmpty
    >
        <SelectInput optionText="name" />
    </ReferenceInput>,
];

export const CommentsList = (props: ListProps) => {
    return (
        <List
            {...props}
            sort={{ field: 'createdAt', order: 'DESC' }}
            filters={commentFilters}
        >
            <Datagrid >
                <AuthorField source="author" />
                <ResourceField source="resource" />
                <TextField source="body" label="Comment" />
                <DateField source="createdAt" label="Date" />
                <ActionsField source="actions" />
            </Datagrid>
        </List>
    )
}