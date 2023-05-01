import './App.css';
import ProductList from './pages/product/product-list'; 
import CategoryList from './pages/category/category-list';
import ButtonAppBar from './app-bar'
import { useState } from 'react'
import { Provider } from 'react-redux'
import { ContextCurrency } from './context/currency';
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import store from './store';
import CurrencyList from './pages/currency/currency';
import { Main } from './pages/main/main-page';



function App() {

  const [currentCurrency, setCurrentCurrency] = useState(null)

  return (
    <Provider store={store} >
    <ContextCurrency.Provider value={currentCurrency}>
      <div className="App">
        <BrowserRouter >
          <ButtonAppBar context={{ currentCurrency, setCurrentCurrency }} />

          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/products' element={<ProductList />} />
            <Route path='categories' element={<CategoryList />} />
            <Route path='currency' element={<CurrencyList />} />


          </Routes>
        </BrowserRouter>
      </div>
    </ContextCurrency.Provider>

    </Provider>
  );
}

export default App;