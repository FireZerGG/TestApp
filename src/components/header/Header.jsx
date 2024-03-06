import React, { useState } from 'react'
import c from './header.module.css'
import { useDispatch } from 'react-redux'
import { getSearchRes } from '../../store/ActionCreators'
import triangle from './triangle.svg'


const Header = ({setPage, changeResetPage, setResultFromSearch, setQuery, setQueryParams}) => {

    const dispatch = useDispatch()

    const [fieldsMenu, setFieldsMenu] = useState(false)
    const [inputPlaceholder, setInputPlaceholder] = useState('названию')
    const [inputText, setInputText] = useState('')


    const filterMouseOn = () => {
        setFieldsMenu(true)
    }

    const filterMouseOff = () => {
        setFieldsMenu(false)
    }

    const changePlaceholder = (text) => {
        setFieldsMenu(false)
        setInputPlaceholder(text)
    }

    const inputChange = (e) => {
        setInputText(e.target.value)
    }

    const search = (e) => {

        setQuery('getSearchRes')

        if (e.keyCode === 13 || e.type === 'click') {
            switch (inputPlaceholder) {
                case 'названию':
                    dispatch(getSearchRes('product', inputText))
                    setQueryParams(['product', inputText])
                    break
                case 'цене':
                    dispatch(getSearchRes('price', Number(inputText)))
                    setQueryParams(['price', Number(inputText)])
                    break
                case 'бренду':
                    dispatch(getSearchRes('brand', inputText))
                    setQueryParams(['brand', inputText])
                    break
            }
            setInputText('')
            changeResetPage(true)
            setPage(1)
            setResultFromSearch(true)
        }
    }

    return (
    <div className={c.container}>
        <div className={c.filter} 
            onMouseEnter={filterMouseOn}
            onMouseLeave={filterMouseOff}>
            Искать по
            <div className={c.triangle_container}>
                <img src={triangle} className={c.triangle} alt=''/>
            </div>
        </div>

        {fieldsMenu && 
            <div className={c.fields}
            onMouseEnter={filterMouseOn}
            onMouseLeave={filterMouseOff}>
                <div className={c.field}
                onClick={() => changePlaceholder('бренду')}>
                    брэнду
                </div>

                <div className={c.field}
                onClick={() => changePlaceholder('цене')}>
                    цене
                </div>

                <div className={c.field}
                onClick={() => changePlaceholder('названию')}>
                    названию
                </div>
        </div>}

        <input  placeholder = {inputPlaceholder} className={c.search}
            onKeyDown={search}
            onChange={inputChange}
            value={inputText}
        />

        <div className={c.submit} onClick={search}>
            Поиск
        </div>

    </div>
  )
}

export default Header
