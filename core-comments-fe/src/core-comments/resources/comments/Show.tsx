import React from 'react'

import {
    ShowProps,
    Show,
    SimpleShowLayout,
    TextField,
} from "react-admin";
import { PolymorphicReferenceField } from './PolymorphicReferenceField';

// import { AuthorField } from './AuthorField'

const CommentsTitle = (props: any) => {
    const { record } = props;
    return record ? (
        <span>
            {"Comments"}
        </span>
    ) : null;
};

type CommentsShowProps = ShowProps & {
    showLayoutWrapper?: {
        component: any
        props: { [key: string]: any }
    }
}

export const CommentsShow: React.FC<CommentsShowProps> = ({ showLayoutWrapper = { component: null, props: null }, ...props }) => {
    const renderLayout = () => (
        <SimpleShowLayout>
            <TextField source="id" />
            {/* <AuthorField source="author" addLabel /> */}
            <PolymorphicReferenceField source="resource" addLabel />
            <TextField source="body" />
        </SimpleShowLayout>
    )

    const { component: WrapperComponent, props: wrapperProps } = showLayoutWrapper

    return (
        <Show title={<CommentsTitle />} {...props}>
            {!!WrapperComponent ? (
                <WrapperComponent {...wrapperProps}>{renderLayout()}</WrapperComponent>
            ) : (
                <>{renderLayout()}</>
            )}
        </Show>
    )
};