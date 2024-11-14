import "./AddProduct.css";
import { useState } from "react";
const AddProduct = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      console.log(image);
    }
  };

  return (
    <div className="add-product">
      <div className="fields">
        <input
          id="image-picker"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />

        {/* </div> */}
        <input type="text" placeholder="Product Name" />
        <input type="text" placeholder="Product Price" />
        <select className="product-category">
          <option value="">Select Category</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="home">Home</option>
          <option value="toys">Toys</option>
        </select>
        <button>Submit</button>
      </div>
    </div>
  );
};
export default AddProduct;
