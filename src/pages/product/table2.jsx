import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { ContextCurrency } from '../../context/currency';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { addToBacket } from '../../modals/order/slice';


export default function NewTable(props) {


    const prodByCategory = useMemo(() => {

        return props.products.reduce((acc, el) => {
            let categoryIndex = acc.findIndex((accEl) => el.categoryId === accEl.categoryId);
            let category;

            // console.log(el);

            if (categoryIndex < 0) {
                category = {
                    categoryName: el.categoryName,
                    categoryId: el.categoryId,
                    products: [],
                }
                acc.push(category);
            } else {
                category = acc[categoryIndex];
            }

            category.products.push(el.products);
            return acc
        }, []);
    }, [props.products])


    const currencyContext = React.useContext(ContextCurrency);
    const exchangeRate = useMemo(() => {
        return currencyContext?.exchange_rate || 1;
    }, [currencyContext?.exchange_rate])

    const dispatch = useDispatch();

    const handleFactoryBuy = (product) => {
        return () => {
            dispatch(addToBacket(product))
        }
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="right">Categort</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>


                    {prodByCategory.map((item) => {
                        return item.products[0].map((el) => {
                            return (<TableRow
                                key={el.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {el.id}
                                </TableCell>
                                <TableCell align="left">{el.name}</TableCell>
                                <TableCell align="right">{el.category.name}</TableCell>
                                <TableCell align="right">{el.price * exchangeRate}</TableCell>
                                <TableCell align="right">
                                    <Button onClick={handleFactoryBuy(el)}>Buy</Button>
                                </TableCell>
                            </TableRow>)
                        })
                    })}



                </TableBody>
            </Table>
        </TableContainer>
    );
}



// {/* <TableRow
//     key={row.name}
//     sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
// >
//     <TableCell component="th" scope="row">
//         {row.name}
//     </TableCell>
//     <TableCell align="right">{row.calories}</TableCell>
//     <TableCell align="right">{row.fat}</TableCell>
//     <TableCell align="right">{row.carbs}</TableCell>
//     <TableCell align="right">{row.protein}</TableCell>
// </TableRow> */}