import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useProduct } from "../context/ProductContext";

const ProductDetails = () => {
  const { productId } = useParams();
  const { fetchProductById } = useProduct();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      setError("");

      const result = await fetchProductById(productId);

      if (result) {
        setProduct(result);
      } else {
        setError("Product not found.");
      }

      setLoading(false);
    };

    loadProduct();
    // fetchProductById comes from context and should only run again when the route id changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-700">
        {error}
      </div>
    );
  }

  return (
    <section className="rounded-lg bg-white p-6 shadow">
      <Link to="/product" className="text-sm font-medium text-blue-700 hover:text-blue-900">
        Back to products
      </Link>

      <div className="mt-6 grid gap-8 md:grid-cols-2">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-96 w-full rounded-lg bg-gray-100 object-contain"
        />

        <div>
          <p className="text-sm font-medium uppercase text-gray-500">
            Product ID: {product.id}
          </p>
          <h1 className="mt-2 text-4xl font-bold text-gray-900">{product.title}</h1>
          <p className="mt-4 text-gray-600">{product.description}</p>

          <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold text-gray-900">Price</p>
              <p className="text-blue-700">${product.price}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Category</p>
              <p>{product.category}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Rating</p>
              <p>{product.rating}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Stock</p>
              <p>{product.stock}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Brand</p>
              <p>{product.brand || "N/A"}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900">SKU</p>
              <p>{product.sku}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
