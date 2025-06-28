'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase.from('products').select('*');
      if (error) console.error('Error fetching products:', error);
      else setProducts(data);
    }
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-4">Supabase Test Page</h1>
      {products.length > 0 ? (
        <ul className="space-y-2">
          {products.map((product) => (
            <li key={product.id} className="p-4 border rounded">
              <strong className="text-xl">{product.name}</strong> – {product.description}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No products found.</p>
      )}
    </div>
  );
}
