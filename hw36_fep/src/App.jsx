import { useEffect, useState } from 'react'
import './App.css'
import { useSelector, useDispatch } from 'react-redux';

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
  const [loaded, setLoaded] = useState(false);
// Geting data from API
  useEffect(() => {
  const fetchData = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    setDbresult(sortedList(data));
// Loading fetched data to state using func loadListToState()
    loadListToState();
  };
    fetchData().then(() => setLoaded(true))
// Trigger the render when data is "loaded".
  }, [loaded]);
  
// Action to  trigger the LOADING of the data to state
  const SET_LIST = "SET_LIST";
  const SetList = (array) => {
                            return {
                            type: SET_LIST,
                            payload: array
                            };
  };

// Function to load fetched data to state
  const loadListToState = () => {
                              dispatch(SetList(dbResult))
  }
  
  const dispatch = useDispatch();
  const list = useSelector(state => state.list)

//Function to sort the list before rendering it:
  const sortedList = (array) => {
    console.log('we are sorting')
        return array.sort(function (a, b) {
            let nameA = a.name.toLowerCase();
            let nameB = b.name.toLowerCase();
            return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
        });
  };
  

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
                                  element: <EntryList/>,
                                },
                                {
                                  path: "/form",
                                  element: <EntryForm/>,
                                },
                                {
                                  path: "/edit",
                                  element: <EditForm/>,
                                },
                              ]
                },
]);
   
  return (
          <RouterProvider router={router} />
  )
}

export default App
