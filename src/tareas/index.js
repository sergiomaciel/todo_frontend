import * as React from "react";
import { useMediaQuery } from '@material-ui/core';
import RichTextInput from 'ra-input-rich-text';
import { 
    List,
    Edit,
    Create,
    Datagrid,
    Filter,
    ImageField,
    ImageInput,
    TextField,
    TextInput,
    Tab, 
    TabbedShowLayout,
    EditButton, 
    SimpleForm,
    SelectField ,
    SelectInput,
} from 'react-admin';

const title = ({ record }) => { 
    return <span>ID Tarea {record ? `"${record.id}"` : ''}</span>;
};

const validateData = (values) => {
    const errors = {};
    if (!values.descripcion) {
        errors.descripcion = ['Ingresar una descripción'];
    }
    if (!values.estado) {
        errors.estado = ['Seleccionar un estado'];
    } else if (!values.foto) {
        errors.foto = ['Cargar una foto'];
    }
    return errors
};

const TareaFilter = (props) => (
    <Filter {...props}>
        {/* <TextInput label="Search" source="q" alwaysOn /> */}
        <TextInput label="Descripcion" source="descripcion" alwaysOn />
        {/* <SelectField 
            label="Estado" 
            source="estado" 
            choices={[
                { id: 1, name: 'Listo' },
                { id: 2, name: 'Pendiente' },
                { id: 3, name: 'Trabajando' },
            ]} 
        /> */}
    </Filter>
);

export const TareaList = (props) => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
        <List {...props} filters={<TareaFilter/>} >
            {isSmall ? (
                        // <SimpleList
                        //     primaryText={record => record.id}
                        // />
                        <Datagrid>
                            <TextField source="id" />
                            <TextField source="estado" />
                            <EditButton />
                        </Datagrid>
                    ) : (
                        <Datagrid>
                            <TextField source="id" />
                            <TextField source="descripcion" />
                            <SelectField source="estado" choices={[
                               { id: 1, name: 'Listo' },
                               { id: 2, name: 'Pendiente' },
                               { id: 3, name: 'Trabajando' },
                            ]} />
                            <EditButton />
                        </Datagrid>
                    )}
        </List>
    );
}

export const TareaEdit = props => (
    <Edit title={<title />} {...props}>
        <SimpleForm validate={validateData}>
           {/* <TextInput disabled source="id" /> */}
           <RichTextInput source="descripcion" />
           <SelectInput source="estado" choices={[
                { id: 1, name: 'Listo' },
                { id: 2, name: 'Pendiente' },
                { id: 3, name: 'Trabajando' },
            ]} />
            <TabbedShowLayout>
                <Tab label="Imagen">
                    <ImageField source="foto" title="foto" />
                </Tab>
                <Tab label="Cargar" >
                    <ImageInput source="foto" label="Foto" accept="image/*" multiple={false} placeholder={<h3>SUBIR IMAGEN</h3>}>
                        <ImageField source="src" title="foto" />
                    </ImageInput>
                </Tab>
            </TabbedShowLayout>
        </SimpleForm>
    </Edit>
);

export const TareaCreate = props => (
    <Create title={"Nueva Tarea"} {...props}>
        <SimpleForm validate={validateData}>
            <RichTextInput source="descripcion" />
            <SelectInput source="estado" choices={[
                { id: 1, name: 'Listo' },
                { id: 2, name: 'Pendiente' },
                { id: 3, name: 'Trabajando' },
            ]} />
            <ImageInput source="foto" label="Foto" accept="image/*" multiple={false} placeholder={<h3>SUBIR IMAGEN</h3>}>
                <ImageField source="src" title="foto" />
            </ImageInput>
        </SimpleForm>
    </Create>
);