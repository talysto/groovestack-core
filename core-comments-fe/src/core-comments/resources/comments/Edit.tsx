import React from 'react'

import {
    Edit,
    SimpleForm,
    TextInput,
    TextField,
    EditProps,
} from "react-admin";

import { AuthorField } from './AuthorField'
import { ResourceField } from './ResourceField'

const CommentsTitle = (props: any) => {
    const { record } = props;
    return record ? (
        <span>
            {"Comments"}
        </span>
    ) : null;
};

type CommentsEditProps = EditProps & {
    editLayoutWrapper?: {
        component: any
        props: { [key: string]: any }
    }
}

export const CommentsEdit: React.FC<CommentsEditProps> = ({ editLayoutWrapper = { component: null, props: null }, ...props }) => {
    const renderLayout = () => (
        <SimpleForm>
            <TextField source="id" />
            <AuthorField source="author" addLabel />
            <ResourceField source="resource" addLabel />
            <TextInput source="body" multiline />
        </SimpleForm>
    )

    const { component: WrapperComponent, props: wrapperProps } = editLayoutWrapper

    return (
        <Edit title={<CommentsTitle />} {...props}>
            {!!WrapperComponent ? (
                <WrapperComponent {...wrapperProps}>{renderLayout()}</WrapperComponent>
            ) : (
                <>{renderLayout()}</>
            )}
        </Edit>
    )
};