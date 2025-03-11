import { React, useState, useEffect, useContext } from "react";
import style from "./category.module.css";
import axios from "axios";
import ListCategory from "../List_Category/ListCategory.jsx";
import AdminNavbar from "../Navbar/AdminNavbar.jsx";
import SideNav from "../SideNav.jsx";
import SidebarContext from "../../Context/SidebarContext.js";

function Category() {
  const navElements = ["Products", "orders", "Account", "Logout"];
  const [category, setCategory] = useState({
    categoryName: "",
    // subCategory:'',
    cat_image: "",
  });
  const [categories, setCategories] = useState(["Clothe","Footwear","Accessories"]);
  const SideBarContext = useContext(SidebarContext);
  const { sidebar, setSidebar } = SideBarContext;

  // Function to fetch categories from the API endpoint
  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/category/getCategories"
      );
      return response.data.categories;
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  };

  function toggleSideBar() {
    console.log("toggleSideBar");
    if (sidebar == true) {
      console.log("sidebar==", sidebar);
      setSidebar(false);
    } else {
      console.log("sidebar==", sidebar);
      setSidebar(true);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categories = await fetchCategories(); // Call fetchCategories function
        setCategories(categories); // Update state with fetched categories
        console.log("categories",categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    
    
    fetchData(); // Call fetchData function when component mounts
  }, []); // Run once when the component mounts

  const updateCategory = async () => {
    try {
      const categories = await fetchCategories(); 
      console.log("categories",categories);
      setCategories(categories); // Update state with the new list of categories
    } catch (error) {
      console.error("Error updating categories:", error);
    }
  };

  function handleChange(event) {
    event.preventDefault();
    const { name, value } = event.target;
    setCategory((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Validation check
    if (!category.categoryName || !category.cat_image) {
      alert("All fields are required.");
      return;
    }
    // Construct the data object to be sent in the POST request
    const data = {
      categoryName: category.categoryName,
      // subCategory: category.subCategory,
      cat_image: null,
    };

    const reader = new FileReader();
    reader.onload = function (event) {
      data.cat_image = event.target.result; // Set the imageUrl property to the data URL
      // Perform the POST request using Axios
      console.log("handleSubmit is being called", data);
      axios
        .post("http://localhost:3001/category/categoryAdd", data)
        .then((res) => {
          updateCategory();
          // Reset the form fields after successful submission
          setCategory({
            category: "",
            subCategory: "",
            image: "",
          });
        })
        .catch((err) => {
          if (
            err.message ===
            "Duplicate key error: The provided category name already exists."
          ) {
            alert("please insert unique category");
            console.log("======", err);
          }
        });
    };
    // Convert the image string to a Blob object
    const blob = new Blob([category.image], { type: "image/jpeg" });

    // Read the Blob object as a data URL
    reader.readAsDataURL(blob);
  }

  const handlePhoto = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    console.log("file", file);
    console.log("prev value of image", category.image);
    setCategory({ ...category, image: file });
    console.log("value after update ", category.image);
  };

  return (<><AdminNavbar
    style={{ position: "fixed", marginTop: "-20%" }}
    className={style.navbar_category}
    displayToggle={true}
  />
    <div className={style.category_admin} >
      <main className={style.category_container}>
        <SideNav />
        <section
          className={`page-section ${sidebar ? "blur" : ""}`}
          style={{display:'inline'}}
          onClick={() => toggleSideBar}
        >
          <article
            style={{ margin: "5px", padding: "5px", alignItems: "start",width:'100%' }}
            className="input-div"
          >
            <center>
              <h2>Add new Category</h2>
              <form encType="multipart/form-data" style={{ width: "100%" }}>
                <table style={{ width: "100%" }}>
                  <tr>
                    <td>
                      <label htmlFor="categorySelect">Category</label>
                    </td>
                    <td>
                      <select name={style.category} id="categorySelect">
                        <option value="Main">Main</option>
                        {categories.length > 0 &&
                          categories.map((category) => (
                            <option
                              key={category._id}
                              value={category.categoryName}
                            >
                              {category.categoryName}
                            </option>
                          ))}
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <th>Category:</th>
                    <td>
                      <input
                        type="text"
                        className={style.input}
                        name="categoryName"
                        placeholder="Enter Category Name"
                        value={category.categoryName}
                        onChange={handleChange}
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>Pic:</th>
                    <td>
                      <input
                        className={style.input}
                        type="file"
                        name="pic"
                        onChange={handlePhoto}
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <input
                        type="submit"
                        name="submit"
                        onClick={handleSubmit}
                        value="Submit"
                        className={style.add}
                        style={{
                          padding: "10px 20px",
                          backgroundColor: "#007bff",
                          color: "#fff",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                          transition: "background-color 0.3s ease",
                          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                          textTransform: "uppercase",
                          fontWeight: "bold",
                          letterSpacing: "1px",
                        }}
                      />
                    </td>
                  </tr>
                </table>
              </form>
            </center>
          </article>
          <article className="list-div">
            <center>
              <h2>List Of Categories</h2>
              <table style={{ width: "100%" }}>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Pic</th>
                    <th colSpan={2}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.length > 0 &&
                    categories.map((category, key) => (
                      <ListCategory
                        key={key}
                        id={key}
                        name={category.categoryName}
                        Cat_details={category}
                        pic={category.cat_image}
                        _id={category._id}
                        updateCategory={updateCategory}
                      />
                    ))}
                </tbody>
              </table>
            </center>
          </article>
        </section>
      </main>
    </div>
    </>
  );
}
export default Category;
