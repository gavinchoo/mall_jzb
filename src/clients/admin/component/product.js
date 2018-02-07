import React from 'react'

import ProductList from './product/list'

export default class ProductManage extends React.Component {

    render() {
        return (
          <div>
              商品管理
              <ProductList/>
          </div>
        )
    }
}