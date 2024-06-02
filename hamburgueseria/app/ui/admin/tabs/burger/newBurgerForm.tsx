import { Burger } from '@/prisma/generated/client';
import react from 'react';
import { Category } from '@/prisma/generated/client';

interface BurgerFormProps {
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    handleCreateBurger: () => void;
}

const burgerForm = ({ handleInputChange, handleCreateBurger }: BurgerFormProps) => {
    return (
        <div>
            <div className="grid gap-4 mb-4">
                <input
                    className="p-2 border border-gray-300 rounded"
                    type="text"
                    name="name"
                    onChange={handleInputChange}
                    placeholder="Name"
                />
                <input
                    className="p-2 border border-gray-300 rounded"
                    type="text"
                    name="imageUrl"
                    onChange={handleInputChange}
                    placeholder="Image URL"
                />
                <textarea
                    className="p-2 border border-gray-300 rounded"
                    name="description"
                    onChange={handleInputChange}
                    placeholder="Description"
                />
                <select
                    className="p-2 border border-gray-300 rounded"
                    name="category"
                    onChange={handleInputChange}
                >
                    {
                        Object.values(Category).map((category) => (
                            <option key={category} value={category}>{category}</option>
                        ))

                    }
                </select>
                <input
                    className="p-2 border border-gray-300 rounded"
                    type="number"
                    name="stock"
                    onChange={handleInputChange}
                    placeholder="Stock"
                />
                <input
                    className="p-2 border border-gray-300 rounded"
                    type="number"
                    name="price"
                    onChange={handleInputChange}
                    placeholder="Price"
                />
            </div>
            <button
                onClick={handleCreateBurger}
                className="btn bg-green text-white px-4 py-2 rounded hover:bg-green-600"
            >
                Add Burger
            </button>
        </div>
    );
}

export default burgerForm;