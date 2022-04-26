import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./UpdateProduct.css";
import { clearErrors, updateProduct, productDetails } from "../../../state/actions/productAction";
import { useAlert } from "react-alert";
import { useHistory, useParams } from "react-router-dom";
import { UPDATE_PRODUCT_RESET } from "../../../state/constants/productConstants";
import { allCategories } from "../Products/Products";

const UpdateProduct = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const alert = useAlert();
  const params = useParams();

  const productId = params.id;

  var categoryBtn = useRef(null);

  const { product, sucess, loading, error } = useSelector(state => state.productDetails)

  const {
    error: updateError,
    isUpdated,
  } = useSelector(state => state.product)

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [productImages, setProductImages] = useState([]);
  const [category, setCategory] = useState("")
  const [oldImages, setOldImages] = useState("");
  const [productImagesPreview, setProductImagesPreview] = useState([])

  const updateProductSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("stock", stock);

    productImages.forEach((image) => {
      myForm.append("images", image);
    })
    dispatch(updateProduct(productId, myForm));
  }

  const updateProductImageOnChange = (e) => {
    const files = Array.from(e.target.files);

    setProductImages([]);
    setProductImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setProductImages([...productImages, reader.result]);
          setProductImagesPreview([...productImagesPreview, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    })
  }

  useEffect(() => {
    if (sucess) {
      setName(product.name);
      setDescription(product.description);
      setCategory(product.category);
      setPrice(product.price);
      setStock(product.stock);
      setOldImages(product.images)
    } else {
      dispatch(productDetails(productId));
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Product Updated Sucessfully");
      dispatch({ type: UPDATE_PRODUCT_RESET })
      history.push("/admin/dashboard")
    }
  }, [dispatch, history, alert, isUpdated, sucess, productId, updateError]);

  return (
    <div className="updateProductWrapperSection section">
      <div className="updateProductWrapper">
        <div className="title-text">
          <div className="title login">
            Add Product
          </div>
        </div>
        <div className="form-container">
          <div className="form-inner">
            <form
              action="#"
              className="updateProduct"
              onSubmit={updateProductSubmit}
              encType="multipart/form-data"
            >
              <div className="field">
                <input
                  name="name"
                  type="text"
                  value={name}
                  placeholder="Product Name"
                  onChange={(e) => { setName(e.target.value) }}
                  required
                />
              </div>
              <div className="field">
                <input
                  name="price"
                  type="number"
                  value={price}
                  placeholder="Product Price"
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
              <div className="field">
                <input
                  name="stock"
                  type="number"
                  value={stock}
                  placeholder="Product Stock"
                  onChange={(e) => setStock(e.target.value)}
                  required
                />
              </div>
              <div className="field">
                <textarea
                  name="description"
                  type="textarea"
                  value={description}
                  placeholder="Product Description"
                  onChange={(e) => setDescription(e.target.value)}
                  cols="30"
                  required
                />
              </div>
              <div className="field">
                <select ref={categoryBtn} value={category}>
                  {
                    allCategories.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))
                  }
                </select>
              </div>
              <div className="field" id="updateProductFormFile">
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={updateProductImageOnChange}
                  multiple="multiple"
                />
              </div>
              <div className="field">
                {
                  oldImages && oldImages.map((image, index) => (
                    <img height="35px" src={image.url} key={image.public_id} alt="Product Preview" />
                  ))
                }
              </div>
              <div className="field">
                {
                  productImagesPreview.map((image, index) => (
                    <img height="35px" src={image} key={index} alt="Product Preview" />
                  ))
                }
              </div>
              <div className="field btn">
                <div className="btn-layer"></div>
                <input type="submit" value="Update Product" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateProduct
