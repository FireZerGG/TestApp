import React from 'react'
import c from './productCard.module.css'


const ProductCard = ({product}) => {
  return (
    <li className={c.card}>
        <div className={c.product}>
            <div className={c.name}>
                {product.product}
            </div>
            <div className={c.id}>
                {product.id}
            </div>
        </div>

    <div className={c.info}>
        <div className={c.brand}>
            {product.brand ? product.brand : 'бренд не указан'}
        </div>
        <div className={c.price}>
            {product.price} &#8381;
        </div>
    </div>
    </li>
  )
}

export default ProductCard