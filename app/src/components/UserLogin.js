import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';

const UserLogin = ({ errors, touched, values, status }) => {
  
  const [users, setUsers] = useState([])
  useEffect(() => {
    if (status) {
      setUsers(users => [...users, status])
    }
  }, [status])
  
  return (
    <div className="form-container">
      <h1>My Form</h1>
      <Form className="input-form">
        <Field className="input-field" type="text" name="name" placeholder="Name" />
        {touched.name && errors.name && (
          <p className="error">{errors.name}</p>
        )}

        <Field className="input-field" type="text" name="email" placeholder="Email" />
        {touched.email && errors.email && (
          <p className="error">{errors.email}</p>
        )}

        <Field className="input-field" type="text" name="password" placeholder="Password" />
        {touched.password && errors.password && (
          <p className="error">{errors.password}</p>
        )}

        <label className="input-field" id="checkbox"> 
          <Field type="checkbox" name="tos" />
          I agree to the terms of service.
        </label>

        <button className="input-field" type="submit">Submit</button>
      </Form>
    <div>
      {users.map((user) => {
        return (
          <p key={user.name} >{user.name}, {user.email}, {user.tos}</p>
        )
      })}
    </div>
    </div>
  )
}

const FormikUserLogin = withFormik({
  mapPropsToValues({ name, email, password, tos}) {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      tos: tos || false
    }
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required('Please put your name in'),
    email: Yup.string().email(`You've typed poorly`).required(),
    password: Yup.string().required(`Don't fight the password`),
    tos: Yup.bool().required('Terms of Service is required')
  }),

  handleSubmit(values, {setStatus}) {
    console.log('form submitted', values);
    axios
      .post('https://reqres.in/api/users', values)
      .then(res => {
        console.log(res.data)
        setStatus(res.data)
      })
      .catch(err => console.log(err.response))
    }
    

})(UserLogin)

export default FormikUserLogin;