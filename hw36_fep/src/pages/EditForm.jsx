import { useFormik } from 'formik';
import { React } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { sortedList } from '../store';
 
function EditForm() {
    let entry = useLocation().state;
    const navigate = useNavigate();
    const list = useSelector(state => state.list)
    const dispatch = useDispatch();

    
//Action to  trigger the DELETE of the enrty from state
    const UPDATE_ENTRY = "UPDATE_ENTRY"
    const EditEntry = (array) => {
                                    return {
                                                type: UPDATE_ENTRY,
                                                payload: array
                                            };
                                    };

//Dispatcher to update the list in state with target entry EDITED
    const EditEntryInState = (entry) => {
                                            dispatch(EditEntry(EditEntryInList(entry)))
                                        }
    
//Form list of entris with EDITED entry
    function EditEntryInList(entry) {
        const updatedList = list.filter((el) => el.id !== entry.id);
        updatedList.push(entry);
        return sortedList(updatedList);
  };
    
    const formik = useFormik({
                                initialValues: {
                                                    name: entry.name,
                                                    phone: entry.phone,
                                                    id: entry.id,
                                                },
                                onSubmit: (values) => {
                                                            if (values.name && values.phone) {
                                                                        EditEntryInState(values);
                                                                        navigate('/list');
                                                                    } else {
                                                                            alert('Please enter all mandatory data');
                                                                            }
                                                        },
                            });
    
    return (
         <>
            <h1>Edit entry {entry.name}</h1>
            <form onSubmit={formik.handleSubmit}>
            <div className='card_cntr'>
              <ul className="card">
                    <li>
                          <label htmlFor="firstName">Name</label>
                          <input
                              id="name"
                              name="name"
                              type="text"
                              onChange={formik.handleChange}
                              value={formik.values.name}
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

export default EditForm