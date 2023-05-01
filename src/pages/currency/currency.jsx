import Table from "./table"
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { ContextCurrency } from "../../context/currency";
import { Alert, AlertTitle, CircularProgress, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toIdleStatus } from "./slice";
import { stateValues } from "../../common/state-values";
import { fetchCurrency } from "./slice";



function CurrencyList() {

    const currencyListStatus = useSelector((state) => {
        return state.currencyList.status;
    });
    const currency = useSelector((state) => {
        return state.currencyList.currency;
    });
    const error = useSelector((state) => {
        return state.currencyList.error;
    });

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(toIdleStatus());
     }, []);

    useEffect(() => {
        if (currencyListStatus === stateValues.idle) {
            dispatch(fetchCurrency())
        }
    }, [dispatch, currencyListStatus]);

    let content;

    if (currencyListStatus === stateValues.loading) {
        content = <CircularProgress color="secondary" />;
    } else if (currencyListStatus === stateValues.succeeded) {
        content = <Table currency={currency} />;
    } else if (currencyListStatus === stateValues.failed) {
        content = (
            <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                {error}
            </Alert>
        )
    }

    return (
        <>
            <Typography variant='h3'>Currency list</Typography>
            <section>
                {content}
            </section>
        </>

    )
}

export default  CurrencyList;

