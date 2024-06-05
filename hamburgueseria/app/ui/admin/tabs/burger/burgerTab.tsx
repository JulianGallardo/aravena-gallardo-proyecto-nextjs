

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import BurgerPagination from './burgerPagination';

const BurgerItems = () => {
    const [burgers, setBurgers] = useState([]);

   



    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-5 mb-5">
                <h2 className="text-2xl font-bold mb-4">Burgers</h2>
                <div className="flex items-center gap-4">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="p-2 border border-gray-300 rounded-lg"
                    />
                </div>
                <Link href="/admin/burgers/new">
                    <button className="bg-green text-white p-2 rounded-lg">Add New</button>
                </Link>
            </div>
            <BurgerPagination  />
            
        </div>
    );
};

export default BurgerItems;
