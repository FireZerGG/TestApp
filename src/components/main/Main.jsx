import React, { useState } from 'react'
import c from './main.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, init, getSearchRes } from '../../store/ActionCreators';
import { useEffect } from 'react';
import ProductCard from '../productCard/ProductCard';
import Paginator from '../paginator/Paginator';
import Header from '../header/Header';


const Main = () => {

  const dispatch = useDispatch()

  const isLoading = useSelector(state => state.products.isLoading)
  const products = useSelector(state => state.products.products)
  const ids = useSelector(state => state.products.ids)
  const error = useSelector(state => state.products.error)

  const [page, setPage] = useState(1)
  const [resetPage, changeResetPage] = useState(false)

  const [firstRender, changeFirstRender] = useState(true)
  const [resultFromSearch, setResultFromSearch] = useState(false)

  const [query, setQuery] = useState('')
  const [queryParams, setQueryParams] = useState([])


  useEffect(() => {
    setQuery('init')
    dispatch(init())
  },[])

  const currentIds = ids.slice((page - 1) * 50, ((page - 1) * 50) + 50)

  useEffect(() => {
    if (!firstRender && !resetPage) {
      setQuery('getProducts')
      dispatch(getProducts(currentIds))
    }
    changeResetPage(false)
    changeFirstRender(false)
  }, [page])

  useEffect(() => {
    if (error !== '') {
      switch (query) {
        case 'init': 
          setTimeout(() => {
            dispatch(init())
          }, 2000)
          break
        case 'getProducts': 
          setTimeout(() => {
            dispatch(getProducts(currentIds))
          }, 2000)
          break
        case 'getSearchRes':
          setTimeout(() => {
            dispatch(getSearchRes(queryParams[0], queryParams[1]))
          }, 2000)
          break
      }
    }
  }, [error])

  const productsList = products.map((product, index) =>  <ProductCard product = {product} key = {index}/>)

  const resetSearch = () => {
    dispatch(init())
    setResultFromSearch(false)
    setPage(1)
  }

  return (
    <>
        <Header setPage = {setPage} 
                changeResetPage = {changeResetPage} 
                setResultFromSearch = {setResultFromSearch} 
                setQuery = {setQuery} 
                setQueryParams = {setQueryParams}/>

        { error !== ''
        
        ? <h3 className={c.info}>Ошибка сервера... перезагрузка</h3>
        
        : isLoading
        
        ? <h1 className={c.info}>Загрузка...</h1> 

        : <>
          {resultFromSearch && <div className={c.resetBtn_container}>
            <button onClick={resetSearch} className={c.resetBtn}>
              сбросить результаты поиска
            </button>
          </div>}

          {products.length === 0 

            ? <h2>Ничего не найдено</h2>

            : <>
              <Paginator setPage={setPage} page={page} productsCount = {products.length}/>
              <ul className={c.container}> {productsList} </ul>
              <Paginator setPage={setPage} page={page} productsCount = {products.length}/>
            </>}
        </>
        }
    </>
  )
}

export default Main