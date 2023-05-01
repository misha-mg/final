import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useMemo, useState, useContext } from 'react';
import { ContextCurrency } from '../../context/currency';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addToBacket } from '../../modals/order/slice';


function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);

  console.log(row);

  const currencyContext = useContext(ContextCurrency);
  const exchangeRate = useMemo(() => {
    return currencyContext?.exchange_rate || 1;
  }, [currencyContext?.exchange_rate])

  const dispatch = useDispatch();

  const handleFactoryBuy = (product) => {
    return () => {
      dispatch(addToBacket(product))
    }
  }

  // console.log(row);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="left">{row.categoryName}</TableCell>
        <TableCell align="right">{row.products[0].products.length} products</TableCell>
        <TableCell align="right"></TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.products.map((item) => (
                    item.products.map((el) => {
                      return (<TableRow key={el.id}>
                        <TableCell component="th" scope="row">
                          {el.id}
                        </TableCell>
                        <TableCell>{el.name}</TableCell>
                        <TableCell align="right">{el.price * exchangeRate}</TableCell>
                        <TableCell align="right">
                          <Button onClick={handleFactoryBuy(el)}>Buy</Button>
                        </TableCell>
                      </TableRow>)
                    })
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}




export default function CollapsibleTable(props) {

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

      category.products.push(el);
      return acc
    }, []);
  }, [props.products])



  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell align="right"></TableCell>
            <TableCell align="left">Ctegory</TableCell>
            <TableCell align="right">Count</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {prodByCategory.map((row) => (
            <Row key={row.categoryId} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}