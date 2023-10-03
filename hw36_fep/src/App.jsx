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

import { sortedList } from './store';


function App() {
  const [loaded, setLoaded] = useState(false);

// Geting data from API
  useEffect(() => {
  const fetchData = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
// Loading fetched data to state using func loadListToState()
    loadListToState(sortedList(data));
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
  const loadListToState = (data) => {
                              dispatch(SetList(data))
  }
  
  const dispatch = useDispatch();
  const list = useSelector(state => state.list)  

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
