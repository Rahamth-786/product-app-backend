import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Add new product
  const addProduct = async (e) => {
    e.preventDefault();

    try {
      await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          price: Number(price)
        })
      });

      setName("");
      setPrice("");
      fetchProducts();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  // Format price
  const formatPrice = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    }).format(value);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Product App 🚀</h1>

      <form onSubmit={addProduct} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ marginRight: "10px" }}
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          style={{ marginRight: "10px" }}
        />

        <button type="submit">Add Product</button>
      </form>

      <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - {formatPrice(product.price)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
