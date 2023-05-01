import React from 'react';
import { useFormik } from 'formik';
import { Box, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import "./form.css"
import ProductsTable from './table-order';
import axios from 'axios';

// A custom validation function. This must return an object
// which keys are symmetrical to our values/initialValues
const validate = values => {
    const errors = {};
    if (!values.firstName) {
        errors.firstName = 'Required';
    } else if (values.firstName.length < 1) {
        errors.firstName = 'Must be 1 characters or more';
    } else if (values.firstName.length > 20) {
        errors.firstName = 'Must be 20 characters or less';
    }

    if (!values.lastName) {
        errors.lastName = 'Required';
    } else if (values.lastName.length < 1) {
        errors.lastName = 'Must be 1 characters or more';
    } else if (values.lastName.length > 20) {
        errors.lastName = 'Must be 20 characters or less';
    }

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    if (!values.product) {
        errors.product = 'Required';
    } else if (values.product.length < 1) {
        errors.product = 'More';
    }


    return errors;
};

export const OrderForm = (props) => {

    const products = useSelector((state) => {
        return state.order.products;
    });

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            products: products,
        },
        validate,
        onSubmit: (values) => {

            const body = {
                id: 0,
                createdAt: new Date(),
                products: JSON.stringify(values, null, 2),
              }
            
            axios.post('http://localhost:3010/order', body);  
        },
    });




    return (
        <form onSubmit={formik.handleSubmit}>
            <Box>

                {/* <label htmlFor="firstName">First Name</label> */}
                <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder='First Name'
                    onChange={formik.handleChange}
                    value={formik.values.firstName}
                />

                {formik.errors.firstName ? <div>{formik.errors.firstName}</div> : null}

            </Box>

            <Box>

                {/* <label htmlFor="lastName">Last Name</label> */}
                <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder='Last Name'
                    onChange={formik.handleChange}
                    value={formik.values.lastName}
                />
                {formik.errors.lastName ? <div>{formik.errors.lastName}</div> : null}

            </Box>

            <Box>
                {/* <label htmlFor="email">Email Address</label> */}
                <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder='Email'
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
                {formik.errors.email ? <div>{formik.errors.email}</div> : null}
            </Box>
            {/* {JSON.stringify(products)} */}
            <ProductsTable formik={formik} products={products} />
            <Box>
                <Button variant="contained" color="success" type="submit">Submit</Button>
                <Button sx={{ m: 1 }} variant="outlined" color="error" onClick={props.handleClose}>Cancel</Button>
            </Box>


        </form>
    );
};