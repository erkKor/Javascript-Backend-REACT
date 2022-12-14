// import React, { useState } from 'react'
// import { validateProducts } from '../../assets/scripts/validation'
// import { IProductContext, ProductContext } from '../../contexts/ProductContext'


// const AddProducts: React.FC = () => {
//   const { productRequest, setProductRequest, create } = React.useContext(ProductContext) as IProductContext

//   const [name, setName] = useState('')
//   const [category, setCategory] = useState('')
//   const [tag, setTag] = useState('')
//   const [price, setPrice] = useState('')
//   const [rating, setRating] = useState('')
//   const [errors, setErrors] = useState({
//     name,
//     category,
//     tag,
//     price,
//     rating
//   })

//   const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
//     const {id, value} = e.target
//     switch(id) {
//       case 'name':
//         setName(value)
//         break
//       case 'category':
//         setCategory(value)
//         break
//       case 'tag':
//         setTag(value)
//         break
//       case 'price':
//         setPrice(value)
//         break
//       case 'rating':
//         setRating(value)
//         break
//     }

//     setErrors({...errors, [id]: validateProducts(e)})
//   }

//   const handleSubmit = (e: any) => {
//     e.preventDefault()
//     setErrors(validateProducts(e, {name, category, tag, price, rating}))

//     if (productRequest.name.length >= 2 && productRequest.category.length >= 2 && productRequest.price >= 0 && productRequest.rating <= 5){ 
//      if (errors.name === null && errors.category === null && errors.price === null && errors.rating === null) {
//       setName('')
//       setCategory('')
//       setTag('')
//       setPrice('')
//       setRating('')

//       create(e)
//       }
//     }else{
//       console.log("didnt work")
//     } 
//   }
 

//   return (
//     <form onSubmit={handleSubmit} className="d-grid mb-5 mt-5 create">
//       <h3>Add Product</h3>
//         <input id="name" value={productRequest.name} onChange={(e) => {setProductRequest({...productRequest, name: e.target.value}); handleChange(e)}} type="text" className="form-control py-2 mb-3" placeholder="Enter name..."/>
//          <div className="errorMessage">{errors.name}</div>
//         <input id="category" value={productRequest.category} onChange={(e) => {setProductRequest({...productRequest, category: e.target.value}); handleChange(e)}} type="text" className="form-control py-2 mb-3" placeholder="Enter category..."/>
//          <div className="errorMessage">{errors.category}</div>
//         <input id="tag" value={productRequest.tag} onChange={(e) => {setProductRequest({...productRequest, tag: e.target.value}); handleChange(e)}} type="text" className="form-control py-2 mb-3" placeholder="Enter tag..."/>
//          <div className="errorMessage">{errors.tag}</div>
//         <input id="price" value={productRequest.price || ''} onChange={(e) => {setProductRequest({...productRequest, price: Number(e.target.value)}); handleChange(e)}} type="number" className="form-control py-2 mb-3" placeholder="Enter price..."/>
//          <div className="errorMessage">{errors.price}</div>
//         <input id="rating" value={productRequest.rating || ''} onChange={(e) => {setProductRequest({...productRequest, rating: Number(e.target.value)}); handleChange(e)}} type="number" className="form-control py-2 mb-3" placeholder="Enter rating (1-5)..."/>
//           <div className="errorMessage">{errors.rating}</div>
//         <input id="imageName" value={productRequest.imageName} onChange={(e) => setProductRequest({...productRequest, imageName: e.target.value})} type="text" className="form-control py-2 mb-3" placeholder="Image URL link (optional)"/>
//          <div className="errorMessage"></div>
//         <button type="submit" className="button-theme">Add Product</button>
//     </form>
//   )
// }

// export default AddProducts