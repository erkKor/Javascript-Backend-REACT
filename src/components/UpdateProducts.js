import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { GET_VENDORS_QUERY, GET_PRODUCT_QUERY, UPDATE_MUTATION } from '../queries/productQueries'
import { validateProducts } from '../assets/scripts/validation'

const UpdateProducts = ({idNumber, productData}) => {
  const [succesMessage, setSuccesMessage]= useState('')
  const [errorMessage, setErrorMessage] = useState()
  const [product, setProduct] = useState(productData)
  const {loading: loadingVendor, error: errorVendor, data: dataVendor} = useQuery(GET_VENDORS_QUERY)
  const [updateProduct] = useMutation(UPDATE_MUTATION, {
    refetchQueries: [{query: GET_PRODUCT_QUERY, variables: {id: idNumber}}]
  })

  const populateVendors = () => {
    if (loadingVendor) return <option disabled>Laddar...</option>
    if (errorVendor) return <option disabled>Error fel</option>
    return dataVendor.vendors.map(vendor => <option key={vendor._id} value={vendor._id}>{vendor.name}</option>)
  }

  // Validation
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [tag, setTag] = useState('')
  const [price, setPrice] = useState('')
  const [rating, setRating] = useState('')
  const [imageName, setImageName] = useState('')
  const [vendorId, setVendorId] = useState('')
  const [errors, setErrors] = useState({
    name,
    category,
    tag,
    price,
    rating,
    imageName,
    vendorId
  })

  const handleChange = (e) => {
    const {id, value} = e.target
    switch(id) {
      case 'name':
        setName(value)
        break
      case 'category':
        setCategory(value)
        break
      case 'tag':
        setTag(value)
        break
      case 'price':
        setPrice(value)
        break
      case 'rating':
        setRating(value)
        break
      case 'imageName':
        setImageName(value)
        break
      case 'vendorId':
        setVendorId(value)
        break
    }

    setErrors({...errors, [id]: validateProducts(e)})
  }



  const handleSubmit = (e) => {
    e.preventDefault()
    localStorage.getItem('accesToken')
    
    if(localStorage.accesToken != undefined){
      if (product.name.length >= 2 && product.category.length >= 2 && product.tag.length >= 1 && product.price >= 0 && product.price.length >= 1 && product.rating <= 5 && product.rating.length >= 1 && product.imageName.length >= 2){
        if (errors.name === '' && errors.category === '' && errors.price === '' && errors.rating === '' && errors.imageName === '' && errors.vendorId === ''){
        updateProduct({variables: {id:product._id, 
          name:product.name,
          category: product.category,
          tag: product.tag,
          price: product.price,
          rating: product.rating,
          imageName: product.imageName,
          vendorId: product.vendorId
        }})
        setSuccesMessage('Update Succes')
        }
    }else{
      setErrorMessage('Fields cannot be empty')  
    }
    }else{
      setErrorMessage('You need to be logged in to update')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="d-grid mb-5 mt-5 create">
      <h5>Update Product Information</h5>
        <div className="fieldName">Name</div>
        <div className="errorMessage">{errors.name}</div>
      <input id="name" value={product.name} onChange={(e) => {setProduct({...product, name: e.target.value}); handleChange(e)}} className={` form-control mb-2 ${errors.name ? 'errorField': ''}`} type="text" placeholder="Enter product namn"></input>
        <div className="fieldName">Category</div>
        <div className="errorMessage">{errors.category}</div>
      <input id="category" value={product.category} onChange={(e) => {setProduct({...product, category: e.target.value}); handleChange(e)}} className={` form-control mb-2 ${errors.category ? 'errorField': ''}`} type="text" placeholder="Enter product category"></input>
        <div className="fieldName">Tag</div>
        <div className="errorMessage">{errors.tag}</div>
      <input id="tag" value={product.tag} onChange={(e) => {setProduct({...product, tag: e.target.value}); handleChange(e)}} className={` form-control mb-2 ${errors.tag ? 'errorField': ''}`} type="text" placeholder="Enter product tag"></input>
        <div className="fieldName">Price</div>
        <div className="errorMessage">{errors.price}</div>
      <input id="price" value={product.price} onChange={(e) => {setProduct({...product, price: e.target.value}); handleChange(e)}} className={` form-control mb-2 ${errors.price ? 'errorField': ''}`} type="text" placeholder="Enter product price"></input>
        <div className="fieldName">Rating</div>
        <div className="errorMessage">{errors.rating}</div>
      <input id="rating" value={product.rating} onChange={(e) => {setProduct({...product, rating: e.target.value}); handleChange(e)}} className={` form-control mb-2 ${errors.rating ? 'errorField': ''}`} type="text" placeholder="Enter product rating"></input>
        <div className="fieldName">Image URL</div>
        <div className="errorMessage">{errors.imageName}</div>
      <input id="imageName" value={product.imageName} onChange={(e) => {setProduct({...product, imageName: e.target.value}); handleChange(e)}} className={` form-control mb-2 ${errors.imageName ? 'errorField': ''}`} type="text" placeholder="Enter image URL or atleast 2 characters"></input>

        <div className="fieldName">Brand</div>
      <select value={product.vendorId} onChange={(e) => setProduct({...product, vendorId: e.target.value})} className="form-select mb-3" type="text">
        <option value="0" disabled>Choose a Brand</option>
        {populateVendors()}
      </select>
      <button className="button-theme" type="submit">Update Product</button>
      <h5 className='succesMessage mt-2'>{succesMessage}</h5>
      <h5 className='faultyMessage mt-2'>{errorMessage}</h5>
    </form>
  )
}

export default UpdateProducts