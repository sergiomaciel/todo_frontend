import * as React from "react";
import { Admin, Resource, ListGuesser, EditGuesser } from 'react-admin';
import jsonServerProvider from  'ra-data-json-server';
import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';
import TaskIcon from '@material-ui/icons/Work';

import Dashboard from './dashboard/dashboard';
import authProvider from './providers/authProvider';
import {PostList, PostEdit, PostCreate} from './posts';
import {TareaList, TareaEdit, TareaCreate} from './tareas/index';
import dataProvider from './providers/index';
// import { UserList, UserCreate, UserEdit } from './users/index';
// const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

const App = () => (
  <Admin dashboard={Dashboard} authProvider={authProvider} dataProvider={dataProvider}>
    {/* <Resource name="users" list={ListGuesser} />
    <Resource name="posts" icon={PostIcon} list={PostList} edit={PostEdit} create={PostCreate} /> */}
    <Resource name="tareas" icon={TaskIcon} list={TareaList} edit={TareaEdit} create={TareaCreate} />
  </Admin>
  );

export default App;
