import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { deleteFromBacket } from './slice';
import { FieldArray } from 'formik'


const columns = [
    { name: 'Name', column: 'name' },
    { name: 'Category', column: 'category.name' },
    { name: 'Price', column: 'price' },
    { name: 'Order', input: true },
    { name: 'Amount', column: 'amount' },
];

function getDescendantProp(obj, desc) {
    if (!desc) return;
    var arr = desc.split(".");
    while (arr.length && (obj = obj[arr.shift()]));
    return obj;
}



export default function ProductsTable(props) {


    const dispatch = useDispatch();

    const handleFactoryDelete = (product) => {
        return () => {
            dispatch(deleteFromBacket(product))
        }

    }


    // console.log(props.products);

    return (
        <TableContainer component={Paper}>

                              <Table sx={{ minWidth: 350 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="left">category</TableCell>
                        <TableCell align="right">Amount</TableCell>
                        <TableCell align="left">Order</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.products.map((row) => (

                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >

                            {columns.map((column, index) => {
                                return (<TableCell key={index} component='th' scope='row' align="left">
                                    {column.column ? getDescendantProp(row, column.column) : (
                                        <input
                                            align="left"
                                            id="product"
                                            name="product"
                                            type="number"
                                            style={{ width: 60 }}
                                            onChange={props.formik.handleChange}
                                            value={props.formik.values.product}
                                        />)}
                                </TableCell>);
                            })}

                            <TableCell onClick={handleFactoryDelete(row)} align="right"><Button variant="outlined" color="error" >Delete</Button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
  
        </TableContainer>
    );
}