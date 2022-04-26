import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./NewProduct.css";
import { clearErrors, addProduct } from "../../../state/actions/productAction";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";
import { NEW_PRODUCT_RESET } from "../../../state/constants/productConstants";
import { allCategories } from "../Products/Products";

const NewProduct = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const alert = useAlert();
  var categoryBtn = useRef(null);

  const { error, loading, sucess } = useSelector(state => state.newProduct)

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [productImages, setProductImages] = useState([]);
  const [productImagesPreview, setProductImagesPreview] = useState([])

  const newProductSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", categoryBtn.current.value);
    myForm.set("stock", stock);

    productImages.forEach((image) => {
      myForm.append("images", image);
    })

    console.log();

    dispatch(addProduct(myForm));
  }

  const newProductImageOnChange = (e) => {
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
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (sucess) {
      alert.success("Product Added Sucessfully");
      dispatch({ type: NEW_PRODUCT_RESET })
    }

  }, [dispatch, error, alert, sucess, loading]);


  return (
    <div className="newProductWrapperSection section">
      <div className="newProductWrapper">
        <div className="title-text">
          <div className="title login">
            Add Product
          </div>
        </div>
        <div className="form-container">
          <div className="form-inner">
            <form
              action="#"
              className="newProduct"
              onSubmit={newProductSubmit}
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
                <select ref={categoryBtn}>
                  <option value="" disabled selected>Select your Category</option>
                  {
                    allCategories.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))
                  }
                </select>
              </div>
              <div className="field" id="newProductFormFile">
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={newProductImageOnChange}
                  multiple="multiple"
                  required
                />
              </div>
              <div className="field" id="newProductFormImageDisplay">
                {
                  productImagesPreview.map((image, index) => (
                    <img height="35px" src={image} key={index} alt="Product Avatar Preview" />
                  ))
                }
              </div>
              <div className="field btn">
                <div className="btn-layer"></div>
                <input disabled={loading} type="submit" value="Add Product" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewProduct
