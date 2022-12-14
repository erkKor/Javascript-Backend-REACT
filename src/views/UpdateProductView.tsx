import React, { useContext, useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import Footer from '../components/Footer'
import Card from '../components/items/Card'
import Navbar from '../components/Navbar'
import UpdateProducts from '../components/UpdateProducts'
import { useQuery } from '@apollo/client'
import { GET_PRODUCT_QUERY } from '../queries/productQueries'

const UpdateProductsView = () => {
  const {id} = useParams()
  const {loading, error, data} = useQuery(GET_PRODUCT_QUERY, {
    variables: {id:id}
  })
  if (loading) return <option disabled>Laddar...</option>
  if (error) return <option disabled>Error fel</option>

  return (
    <>
    <Navbar headerType='header-light'/>
    <section className="breadcrumb">
      <div className="container">
          <ul className="breadcrumb-list">
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/Manage">Manage</NavLink></li>
              <li>Update Product</li>
          </ul>
      </div>
    </section>
    <UpdateProducts idNumber={id} productData={data.product}/>
    <div className="update-info">
      <h3>Preview</h3>
      <span className="info-text">ONLY UPDATES INFO ON SUBMIT</span>
      <Card product={data.product}/>
    </div>
    <Footer />
    </>
  )
}

export default UpdateProductsView