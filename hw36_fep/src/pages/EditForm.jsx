import { useFormik } from 'formik';
import { React, useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import EntryList from './EntryLlst';
 
function EditForm(props) {
    console.log(props.editEntry);
    let entry = useLocation().state;
    const navigate = useNavigate();
    const formik = useFormik({
     initialValues: {
                    name: entry.name,
                    phone: entry.phone,
                    id: entry.id,
    },
        onSubmit: (values) => {
        //  console.log(values)
            if (values.name && values.phone) {
                props.editEntry(values);
                // props.deleteEntry(values.id);
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
          <button className='cancel'><NavLink to='/'>cancel</NavLink></button>
        </form>
        </>
   );
};

export default EditForm