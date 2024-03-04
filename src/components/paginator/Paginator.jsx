import React from 'react'
import c from './paginator.module.css'


const Paginator = ({setPage, page, productsCount}) => {

    return (
      <div className={c.container}>
        <button className = {page > 1 ? c.btn : c.display_none} onClick = {() => setPage(prefPage => prefPage-1)} >{'<<<<<<<'}</button>
        <div>Страница {page}</div>
        <button className={productsCount < 50 ? c.display_none : c.btn} onClick = {() => setPage(prefPage => prefPage+1)} >{'>>>>>>>'}</button>
      </div>
    )
}

export default Paginator