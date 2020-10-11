import * as React from "react";
import { useMediaQuery } from '@material-ui/core';
import RichTextInput from 'ra-input-rich-text';
import { 
    List,
    Edit,
    Create,
    Datagrid,
    Filter,
    TextField,
    TextInput, 
    ReferenceField,
    ReferenceInput,
    EditButton, 
    SimpleForm,
    SimpleList,
    SelectInput,
} from 'react-admin';

const PostTitle = ({ record }) => { 
    return <span>Post {record ? `"${record.title}"` : ''}</span>;
};

const PostFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <ReferenceInput label="User" source="userId" reference="users" allowEmpty>
            <SelectInput optionText="name" />
        </ReferenceInput>
    </Filter>
);

export const PostList = (props) => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
        <List filters={<PostFilter />} {...props}>
            {isSmall ? (
                        <SimpleList
                            primaryText={record => record.title}
                            secondaryText={record => `${record.id} id`}
                            tertiaryText={() =>`Fecha`}
                        />
                    ) : (
                        <Datagrid>
                            <TextField source="id" />
                            <ReferenceField label="User" source="userId" reference="users">
                                <TextField source="name" />
                            </ReferenceField>
                            <TextField source="title" />
                            <TextField source="body" />
                            <EditButton />
                        </Datagrid>
                    )}
        </List>
    );
}

export const PostEdit = props => (
    <Edit title={<PostTitle />} {...props}>
        <SimpleForm>
           <TextInput disabled source="id" />
            <ReferenceInput source="userId" reference="users">
               <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="title" />
           <RichTextInput source="body" />
        </SimpleForm>
    </Edit>
);

export const PostCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <ReferenceInput source="userId" reference="users">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="title" />
            <RichTextInput source="body" />
        </SimpleForm>
    </Create>
);