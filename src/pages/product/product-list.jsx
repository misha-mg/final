import Table from "./table"
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Alert, AlertTitle, CircularProgress, Typography } from "@mui/material";
import { fetchProducts, toIdleStatus } from './slice'
import { stateValues } from "../../common/state-values";
import NewTable from "./table2";


function ProductList() {

    const productListStatus = useSelector((state) => {
        return state.productList.status;
    });

    const products = useSelector((state) => {
        return state.productList.products;
    });

    const error = useSelector((state) => {
        return state.productList.error;
    });

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(toIdleStatus());
     }, []);

    useEffect(() => {
        if (productListStatus === stateValues.idle) {
            dispatch(fetchProducts())
        }
    }, [dispatch, productListStatus]);
    // productListStatus

    let content;

    if (productListStatus === stateValues.loading) {
        content = <CircularProgress color="secondary" />;
    } else if (productListStatus === stateValues.succeeded) {
        content = <NewTable products={products} />;
    } else if (productListStatus === stateValues.failed) {
        content = (
            <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                {error}
            </Alert>
        )
    }


    return (
        <>
            <Typography variant='h3'>Product List</Typography>
            <section>
                {content}
            </section>
        </>

    )
}

export default ProductList;











 // КОНЕЦ

//  const context = useContext(ContextCurrency);

    // const [products, setProducts] = useState([]);
    // const [categories, setCategories] = useState([]);
    // const [mappedProducts, setMappedProducts] = useState([]);


    // useEffect(() => {
    //     const fetchData = async () => {
    //         const fetchProducts = await axios.get("http://localhost:3010/product");
    //         setProducts(fetchProducts.data.items);
    //     }
    //     fetchData();
    // }, []);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const fetchCategories = await axios.get("http://localhost:3010/category");
    //         setCategories(fetchCategories.data.items);
    //     }
    //     fetchData();
    // }, []);

    // useEffect(() => {

    //     if (products.length && categories.length) {
    //         const newProducts = products.map((el) => {
    //             const id = el.category;
    //             const category = categories.find((elC) => elC.id === id)
    //             return { ...el, category }
    //         });

    //         setMappedProducts(newProducts);

    //     }


    // }, [products, categories]);