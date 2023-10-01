import { useEffect, useState } from 'react'
import './App.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import ErrorPage from "./error-page";
import EntryList from './pages/EntryLlst.jsx';
import EntryForm from './pages/EntryForm.jsx';
import Home from './pages/home';
import Root from './components/root';
import EditForm from './pages/EditForm';

import { v4 as uuidv4 } from 'uuid';


function App() {
              const [dbResult, setDbresult] = useState([]);
              
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users ')
      .then(response => response.json())
      .then(data => setDbresult(data))
  }, []);

  function deleteEntry(id) {
    console.log('deleteing ', id);
    const updatedList = dbResult.filter((entry) => entry.id !== id);
    setDbresult(updatedList);
    console.log(updatedList)
  };

  function editEntry(values) {
    console.log('editing ', values.id);
    const updatedListEdit = dbResult.filter((entry) => entry.id !== values.id);
    let newEntry = {
      ...values,
    }
    updatedListEdit.push(newEntry)
    setDbresult(updatedListEdit);
  };

  function addEntry (values) { 
    let newEntry = {
      ...values,
      id: uuidv4(),
    }
    // console.log(newEntry);
    return setDbresult([...dbResult, newEntry]);
  }

  const router = createBrowserRouter([
                {
                  path: "/",
                  element: <Root />,
                    errorElement: <ErrorPage />,
                    children: [
                                {
                                  path: "/",
                                  element: <Home/>,
                                },
                                {
                                  path: "/list",
                                  element: <EntryList
                                    dbResult={dbResult}
                                    deleteEntry={deleteEntry}
                                            />,
                                },
                                {
                                  path: "/form",
                                  element: <EntryForm  
                                  addEntry={addEntry}/>,
                                },
                                {
                                  path: "/edit",
                                  element: <EditForm
                                    deleteEntry={deleteEntry}
                                    addEntry={addEntry}
                                    editEntry={editEntry}
                                    />,
                                },
                              ]
                },
]);
   
  return (
          <RouterProvider router={router} />
  )
}

export default App
