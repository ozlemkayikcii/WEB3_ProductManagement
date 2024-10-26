import React, { useState, useEffect } from 'react';
import { motoko_project_backend } from 'declarations/motoko_project_backend';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Package } from 'lucide-react';

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form states
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const allProducts = await motoko_project_backend.getAllProducts();
      setProducts(allProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await motoko_project_backend.addProduct(
        name,
        Number(price),
        description
      );
      // Clear form
      setName('');
      setPrice('');
      setDescription('');
      // Refresh products list
      fetchProducts();
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const toggleStock = async (id, currentStatus) => {
    try {
      await motoko_project_backend.updateStockStatus(id, !currentStatus);
      fetchProducts();
    } catch (error) {
      console.error('Error updating stock status:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
          <Package className="h-8 w-8" />
          Product Management System
        </h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Add New Product</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Product Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Price</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 border rounded"
                  rows="3"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-600"
              >
                <Plus className="h-4 w-4" />
                Add Product
              </button>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <p>Loading products...</p>
        ) : (
          products.map((product) => (
            <Card key={product.id}>
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-2">{product.description}</p>
                <p className="font-bold">Price: ${product.price}</p>
                <div className="mt-4">
                  <button
                    onClick={() => toggleStock(product.id, product.inStock)}
                    className={`px-3 py-1 rounded ${
                      product.inStock 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}