import Table from "./table"
import { useEffect } from 'react';
import { Alert, AlertTitle, CircularProgress, FormControl, InputLabel, MenuItem, Pagination, Select, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { stateValues } from "../../common/state-values";
import { fetchCategory, setAmountOnPage, setPage } from "./slice";


function CategoryList() {

    // const [products, setProducts] = useState([]);
    // const [categories, setCategories] = useState([]);
    // const [mappedProducts, setMappedProducts] = useState([]);
    // const context = useContext(ContextCurrency);

    const counterSelector = useSelector((state) => state.categoryList.counter);
    const pageSelector = useSelector((state) => state.categoryList.page);
    const amountSelector = useSelector((state) => state.categoryList.amount);
    const totalCountSelector = useSelector((state) => state.categoryList.totalCount);



    const categoryListStatus = useSelector((state) => {
        return state.categoryList.status;
    });
    const categories = useSelector((state) => {
        return state.categoryList.categories;
    });
    const error = useSelector((state) => {
        return state.categoryList.error;
    });

    const dispatch = useDispatch();

    const handleChange = (event) => {
        dispatch(setAmountOnPage(event.target.value))
    };

    const onPaginationChange = (event, page) => {
        dispatch(setPage(page))
    };

    useEffect(() => {
        if (categoryListStatus === stateValues.idle) {
            dispatch(fetchCategory(pageSelector));
        }
    }, [dispatch, categoryListStatus, pageSelector]);



    let content;
    if (categoryListStatus === stateValues.loading) {
        content = <CircularProgress color="secondary" />;
    } else if (categoryListStatus === stateValues.succeeded) {
        content = <Table categories={categories} />
    } else if (categoryListStatus === stateValues.failed) {
        content = (
            <Alert severity="error">
                <AlertTitle >Error</AlertTitle>
                {error}
            </Alert>
        )
    }




    return (
        <>
            <article>
                <Typography variant='h3'>Category list</Typography>

                <FormControl >
                    <InputLabel id="demo-simple-select-label">Items</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={amountSelector}
                        label="Age"
                        onChange={handleChange}
                        
                    >
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={6}>6</MenuItem>
                    </Select>
                </FormControl>
            </article>



            <section>
                {content}
                <Stack spacing={2}>
                    <Pagination count={totalCountSelector / amountSelector} variant="outlined" page={pageSelector} shape="rounded" onChange={onPaginationChange} />
                </Stack>
            </section>
        </>

    )
}

export default CategoryList;






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
