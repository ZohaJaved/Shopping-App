import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbars from "../Navbar/Navbars";
import SideNav from "../SideNav";
import SidebarContext from "../Context/SidebarContext.js";
import { useContext } from "react";

export default function ProductInput() {
  const allTags = [
    "kurti",
    "jeans top",
    "party wear",
    "formal",
    "cotton",
    "wool",
    "red",
    "blue",
    "yellow",
    "hand bag",
    "traditional",
    "winter wear",
    "FestWear",
    "Ethnic Wear",
    "Trending Footwear",
  ];
  const [addedImages, setAddedImages] = useState([]);
  const [listProduct, setListProduct] = useState();
  const [subCategories, setSubCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productDetails, setProductDetails] = useState({
    productName: "",
    productPrice: "",
    productImages: [], // Array for multiple images
    colors: [{ colorName: "", imgUrl: "" }], // Array for color options with images
    productDescription: "",
    category: "",
    material: "",
    discount: 0,
    tags: [],
    brand: "",
    dimensions: "",
    weight: "",
    sizes: [],
  });
  const SideBarContext = useContext(SidebarContext);
  const { sidebar, setSidebar } = SideBarContext;

  const [productSizes, setProductSizes] = useState([
    { size: "S", quantity: 0 },
    { size: "M", quantity: 0 },
    { size: "L", quantity: 0 },
    { size: "XL", quantity: 0 },
    { size: "Onesize", quantity: 0 },
  ]);

  function handleColorChange(event, index, name) {
    event.preventDefault();
    let value = event.target.value;
    let newImage = "";

    if (name === "imgUrl") {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = function (event) {
        newImage = event.target.result;
        const updatedColors = productDetails.colors.map((color, i) =>
          i === index ? { ...color, imageUrl: newImage } : color
        );
        setProductDetails({ ...productDetails, colors: updatedColors });
      };
      reader.readAsDataURL(file);
    } else {
      const updatedColors = productDetails.colors.map((color, i) =>
        i === index ? { ...color, [name]: value } : color
      );
      setProductDetails({ ...productDetails, colors: updatedColors });
    }
  }

  const handleAddColor = (event) => {
    event.preventDefault();
    if (productDetails.colors.length >= 8) {
      alert("You cannot add more than 8 colors.");
      return;
    }
    const currentColors = Array.isArray(productDetails.colors)
      ? productDetails.colors
      : [];
    setProductDetails({
      ...productDetails,
      colors: [...currentColors, { colorName: "", imageUrl: "" }],
    });
  };

  const handleSizeQuantityChange = (event, i) => {
    const { value } = event.target;
    setProductSizes(
      productSizes.map((productSize, index) => {
        if (index === i) {
          return { ...productSize, quantity: value };
        }
        return productSize;
      })
    );
  };

  const handleSizeChange = (event, index) => {
    event.preventDefault();
    const updatedSize = [...productSizes];
    if (updatedSize[index] && updatedSize[index].quantity === 0) {
      updatedSize[index].quantity = 1;
    } else {
      updatedSize[index].quantity = 0;
    }
    setProductSizes([...updatedSize]);
  };

  function handleChange(event) {
    event.preventDefault();
    const { name, value } = event.target;
    setProductDetails((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  }

  const handleReplaceClick = (index) => {
    const fileInput = document.getElementById(`replaceImage-${index}`);
    if (fileInput) {
      fileInput.click();
    }
    setAddedImages(productDetails.productImages);
  };

  function handleChangePhoto(event, index = null) {
    event.preventDefault();
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        let newImage = event.target.result;
        if (index !== null) {
          let updatedImages = [...productDetails.productImages];
          updatedImages[index] = newImage;
          setProductDetails({
            ...productDetails,
            productImages: updatedImages,
          });
        } else {
          let updatedImages = [...productDetails.productImages];
          updatedImages = [...updatedImages, newImage];
          setProductDetails({
            ...productDetails,
            productImages: updatedImages,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  }

  function handleDeletePhoto(index, event) {
    event.preventDefault();
    let updatedImages = productDetails.productImages.filter(
      (_, i) => index !== i
    );
    setProductDetails({ ...productDetails, productImages: updatedImages });
    setAddedImages(updatedImages);
  }

  const handleTagsChange = (event) => {
    const { checked, value } = event.target;
    const updatedSelectedTags = checked
      ? [...productDetails.tags, value]
      : productDetails.tags.filter((tag) => tag !== value);

    setProductDetails({ ...productDetails, tags: updatedSelectedTags });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setProductDetails((productDetails) => ({
      ...productDetails,
      sizes: productSizes,
    }));
    const updatedDetails = { ...productDetails, sizes: productSizes };

    axios
      .post("http://localhost:3001/product/addProduct", updatedDetails)
      .then((response) => {
        updateProduct();
        setProductDetails({
          productName: "",
          productPrice: "",
          productImages: [],
          colors: [{ colorName: "", imgUrl: "" }],
          productDescription: "",
          sku: "",
          category: "",
          stockQuantity: 0,
          sizes: [],
          material: "",
          discount: 0,
          selectedTags: [],
          brand: "",
          dimensions: "",
          weight: "",
        });
      })
      .catch((error) => {
        console.error("Error adding product:", error);
      });
  }

   // Function to fetch categories from the API endpoint
   const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/category/getCategories"
      );
      setCategories(categories);
      console.log("categories",response.data.categories)
      // return response.data.categories;
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  };

  const updateCategory = async () => {
    try {
      const categories = await fetchCategories(); 
      
      setCategories(categories); // Update state with the new list of categories
    } catch (error) {
      console.error("Error updating categories:", error);
    }
  };

  // Update product
  const updateProduct = async () => {
    try {
      const products = await fetchProducts();
      setListProduct(products);
    } catch (error) {
      console.error("Error updating products:", error);
    }
  };

  // Function to fetch categories from the API endpoint
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/product/getProducts"
      );
      return response.data.products;
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  };

  function getSubCategories(categoryName) {
    axios
      .get("http://localhost:3001/product/getSubCategories", {
        params: { category: categoryName },
      })
      .then((response) => {
        console.log("categories")
        setSubCategories(response.data.subCat);
      })
      .catch((error) => console.error("Error fetching subCategories", error));
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await fetchProducts();
        setListProduct(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchCategories()
    fetchData();
  }, []);

  return (
    <div onSubmit={handleSubmit}>
      <center>
        <Navbars
          style={{ position: "fixed", top: 0, width: "100%", zIndex: 1000 }}
        />
        <SideNav
          style={{
            position: "fixed",
            left: 0,
            top: "50px",
            height: "100%",
            zIndex: 1000,
          }}
        />
        <div
          className={`page-section ${sidebar ? "blur" : ""}`}
          style={{ position: "relative" }}
        >
          <form style={{ marginTop: "10px", width: "100%" }}>
            <table>
              <tbody>
                <div className="gridContainer">
                  <div className="items">
                    <label>
                      Product Name:
                      <input
                        type="text"
                        placeholder="Enter Product Name"
                        name="productName"
                        value={productDetails.productName}
                        maxLength={60}
                        onChange={handleChange}
                        required
                      />
                    </label>
                  </div>
                  <div className="items">
                    <label>
                      Base Price:
                      <input
                        type="number"
                        placeholder="Enter base price"
                        name="basePrice"
                        value={productDetails.basePrice}
                        maxLength={6}
                        onChange={handleChange}
                        required
                      />
                    </label>
                  </div>
                  <div className="items">
                    <label>
                      Discounted Price:
                      <input
                        type="number"
                        placeholder="Enter Discounted Price"
                        name="discountedPrice"
                        value={productDetails.discountedPrice}
                        onChange={handleChange}
                        maxLength={6}
                        required
                      />
                    </label>
                  </div>
                  <div className="items">
                    <label>
                      Discount % for retailer customer:
                      <input
                        type="number"
                        name="discount"
                        value={productDetails.discount}
                        maxLength={3}
                        onChange={handleChange}
                        required
                      />
                    </label>
                  </div>
                </div>

                <h3>Images</h3>
                <div className="image-container">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="image-wrapper image-item"
                      style={{ width: "15rem", height: "auto" }}
                    >
                      {productDetails.productImages[i] ? (
                        <>
                          <div
                            className="image-items"
                            style={{ position: "relative" }}
                          >
                            <img
                              src={productDetails.productImages[i]}
                              alt="product"
                            />
                            {/* Replace button */}
                            <input
                              type="file"
                              id={`replaceImage-${i}`}
                              style={{
                                position: "absolute",
                                bottom: "0",
                                left: "0",
                                display: "block", // Ensure it's visible if needed
                                width: "5px",
                              }}
                              onChange={(event) => handleChangePhoto(event, i)}
                            />
                          </div>
                          <div className="button-container">
                            <div className="image-modify-button">
                              <button
                                type="button"
                                className="replace-image-button"
                                onClick={() =>
                                  document
                                    .getElementById(`replaceImage-${i}`)
                                    .click()
                                }
                              >
                                Replace
                              </button>
                            </div>
                            {/* Delete button */}
                            <div className="image-modify-button">
                              <button
                                type="button"
                                onClick={(event) => handleDeletePhoto(i, event)}
                                style={{ height: "2rem", width: "4rem" }}
                                className="delete-image-button"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="placeholder">Empty</div>
                      )}
                    </div>
                  ))}
                  {/* Upload new image button */}
                  <div className="upload-image image-wrapper">
                    {productDetails.productImages.length < 5 ? (
                      <input
                        type="file"
                        onChange={(event) => handleChangePhoto(event)}
                      />
                    ) : (
                      <span style={{ background: "black", color: "white" }}>
                        You can only upload up to 5 pictures
                      </span>
                    )}
                  </div>
                </div>

                <div className="gridContainer">
                  {/* <div className="items">
                    <label>
                      Category:
                      <select
                        name="category"
                        value={productDetails.category}
                        onChange={(event) => {
                          getSubCategories(event.target.value);
                          handleChange(event);
                        }}
                        required
                      >
                        <option value="">select</option>
                        {categories.map((category, index) => (
                          <option key={index} value={category.categoryName}>
                            {category.categoryName}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div> */}
                  <div className="items">
                    <label>
                      Product Description:
                      <textarea
                        type="string"
                        name="productDescription"
                        className="description-textarea"
                        style={{ resize: "none" }}
                        maxLength={300}
                        value={productDetails.productDescription}
                        onChange={handleChange}
                      ></textarea>
                    </label>
                  </div>
                  <div className="items">
                    <label>
                      Brand:
                      <input
                        type="text"
                        name="brand"
                        value={productDetails.brand}
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                  <div className="items">
                    <label>
                      SKU:
                      <input
                        type="text"
                        name="sku"
                        value={productDetails.sku}
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                </div>

                <div className="gridContainer-2">
                  <div className="items-2">
                    <label>
                      Tags:
                      <div className="tag-container">
                        {allTags.map((tag) => (
                          <div key={tag}>
                            <input
                              type="checkbox"
                              id={tag}
                              name="tags"
                              value={tag}
                              onChange={handleTagsChange}
                            />
                            <label htmlFor={tag}>{tag}</label>
                          </div>
                        ))}
                      </div>
                    </label>
                  </div>
                  <div className="items-2">
                    <label>
                      Dimensions:
                      <input
                        type="text"
                        name="dimensions"
                        value={productDetails.dimensions}
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                  <div className="items-2">
                    <label>
                      Weight:
                      <input
                        type="text"
                        name="weight"
                        value={productDetails.weight}
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                </div>
                <div className="size-container">
                  <h2>Sizes</h2>
                  <div className="size-list">
                    {productSizes &&
                      productSizes.map((item, index) => (
                        <div key={index}>
                          <label>
                            <input
                              type="checkbox"
                              value={item.quantity}
                              checked={item.quantity > 0}
                              onChange={(event) =>
                                handleSizeChange(event, index)
                              }
                            />
                            {item.size}
                          </label>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(event) =>
                              handleSizeQuantityChange(event, index)
                            }
                            min="0"
                            placeholder="Quantity"
                          />
                        </div>
                      ))}
                  </div>
                </div>

                <button type="submit">Add Product</button>
              </tbody>
            </table>
          </form>
        </div>
      </center>
    </div>
  );
}
