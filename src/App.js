import * as React from "react";
import { Admin, Resource } from 'react-admin';
import TaskIcon from '@material-ui/icons/Work';

import Dashboard from './dashboard/dashboard';
import authProvider from './providers/authProvider';
import {TareaList, TareaEdit, TareaCreate} from './tareas/index';
import dataProvider from './providers/index';


const App = () => (
  <Admin dashboard={Dashboard} authProvider={authProvider} dataProvider={dataProvider}>
    <Resource name="tareas" icon={TaskIcon} list={TareaList} edit={TareaEdit} create={TareaCreate} />
  </Admin>
  );

export default App;
