import { useFormik } from 'formik';
import { React } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { sortedList } from '../store';
 
function EntryForm() {
  const navigate = useNavigate();
  const list = useSelector(state => state.list)
  const dispatch = useDispatch();
  
  //Action to  trigger the ADD of the enrty from state
  const ADD_ENTRY = "ADD_ENTRY"
  const EditEntry = (array) => {
                                    return {
                                                type: ADD_ENTRY,
                                                payload: array
                                            };
                                    };

//Dispatcher to update the list in state with ADDED entry
    const AddEntrytoState = (entry) => {
                                            dispatch(EditEntry(AddEntryToList(entry)))
                                        }
    
//Form list of entris with EDITED entry
  function AddEntryToList(entry) {
        let newEntry = {
                        ...entry,
                        id: uuidv4(),
                      }
    const updatedList = list;
    updatedList.push(newEntry)
    console.log(updatedList)
        return sortedList(updatedList);
  };

  const formik = useFormik({
                            initialValues: {
                                              firstName: '',
                                              lastName: '',
                                              phone: '',
                                            },
 onSubmit: (values) => {
       if (values.firstName && values.lastName && values.phone) {
         values.name = values.firstName + " " + values.lastName;
         AddEntrytoState(values);
         navigate('/list');
       } else {
         alert('Please enter all mandatory data');
       }
     },
   });
    return (
      <>
        <h1>Add new entry</h1>
        <form onSubmit={formik.handleSubmit}>
            <div className='card_cntr'>
              <ul className="card">
                  <li>
                          <label htmlFor="firstName">First Name</label>
                          <input
                              id="firstName"
                              name="firstName"
                              type="text"
                              onChange={formik.handleChange}
                              value={formik.values.firstName}
                          />
                  </li>
                  <li>
                          <label htmlFor="lastName">Last Name</label>
                          <input
                              id="lastName"
                              name="lastName"
                              type="text"
                              onChange={formik.handleChange}
                              value={formik.values.lastName}
                          />
                  </li>
                  <li>
                          <label htmlFor="email">Phone number</label>
                          <input
                              id="phone"
                              name="phone"
                              type="phone"
                              onChange={formik.handleChange}
                              value={formik.values.phone}
                          />
                </li>
                
              </ul>
          </div>
          <button className="submit" type="submit">Submit</button>
          <button className='cancel'><NavLink to='/list'>cancel</NavLink></button>
        </form>
    </>
   );
};

export default EntryForm