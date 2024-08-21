// src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
    const [products, setProducts] = useState([]);
    const API_URL = 'http://127.0.0.1:8000/api/courses';
    useEffect(() => {
        // استدعاء API باستخدام axios
        axios.get('http://127.0.0.1:8000/api/courses')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the products!", error);
            });
    }, []);

    return (
        <div className="App">
            <h1>Products</h1>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        {product.name} - ${product.descrption}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
