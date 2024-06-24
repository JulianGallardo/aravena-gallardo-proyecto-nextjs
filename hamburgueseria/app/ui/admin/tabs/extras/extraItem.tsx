import { Extra } from "@/prisma/generated/client";
import React, { useState } from "react";
import { updateExtra, deleteExtra } from "@/lib/crud";
import { toast } from "react-toastify";

interface PromoItemProps {
    extra: Extra
    refresh: () => void
}

const ExtraItem = ({ extra, refresh }: PromoItemProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: extra.name,
        maxQuantity: extra.maxQuantity,
        price: extra.price
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleUpdate(formData);
        refresh();
        setIsEditing(false);
    };

    const handleUpdate = (data: { name: string; maxQuantity: number; price: number }) => {
        updateExtra(extra.extraId, {
            name: data.name,
            maxQuantity: Number(data.maxQuantity),
            price: Number(data.price)
        }).then(() => {
            toast.success('Extra actualizado correctamente');
        }).catch((error) => {
            console.error(error);
            toast.error('Error al actualizar el extra');
        });
    };

    const handleDeleteWithToast = () => {
        toast(
            <div className=" h-full w-full">
                <p className="font-semibold">Estas seguro de que deseas eliminar?</p>
                <p className="text-sm">Esta accion no se puede deshacer</p>
                <div className="flex justify-center w-fit items-center gap-4 ">
                    <button
                        className="btn bg-red-500 text-white p-2 px-4 rounded-lg mt-2"
                        onClick={async () => {
                            await deleteExtra(Number(extra.extraId)).then(() => {

                                refresh();

                                toast.dismiss();
                                toast.success('Extra eliminado correctamente');
                            }).catch((error) => {
                                console.error(error);
                                toast.error('Error al eliminar el extra');
                            });
                        }}
                    >
                        Si, quiero eliminar
                    </button>
                    <button
                        className="btn bg-green-500 text-white p-2 px-4 rounded-lg mt-2 ml-2"
                        onClick={() => toast.dismiss()}
                    >
                        Cancelar
                    </button>
                </div>

            </div>,
            {
                autoClose: false,
                closeOnClick: false,
                draggable: false,
                position: "top-center",
                closeButton: true,
            }
        );
    };

    return (
        <li key={extra.extraId} className="flex flex-col gap-5 bg-white shadow-md rounded-lg text-black p-4 hover:bg-lightgrey">
            {!isEditing ? (
                <div>
                    <h3 className="text-xl font-semibold mb-2">{extra.name}</h3>
                    <div className="flex flex-col md:grid grid-cols-3 gap-2">
                        <div>
                            <h4 className="text-lg font-semibold mb-2">Maxima cantidad asignable</h4>
                            <p className="mb-2">{extra.maxQuantity}</p>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-2">Precio</h4>
                            <p className="mb-2">$ {extra.price}</p>
                        </div>
                    </div>
                    <div className="flex flex-row gap-5 w-full">
                        <button className="btn bg-green-400 text-white p-2 px-4 rounded-lg" onClick={() => setIsEditing(true)}>Edit</button>
                        <button className="btn bg-red-400 text-white p-2 rounded-lg" onClick={() => handleDeleteWithToast()}>Delete</button>
                    </div>
                </div>
            ) : (
                <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                    <h3 className="text-xl font-semibold mb-2">{extra.name}</h3>
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col px-3 w-full">
                            <label className="text-sm font-semibold mb-2">Modificar nombre</label>
                            <input type="text" id="name" className="p-2 border border-gray-300 rounded bg-gray-200 placeholder:text-gray-500 w-full" value={formData.name} onChange={handleChange} placeholder={extra.name} />
                        </div>
                        <div className="flex flex-col px-3 w-full">
                            <label className="text-sm font-semibold mb-2">Maxima cantidad asignable</label>
                            <input type="number" id="maxQuantity" className="p-2 border border-gray-300 rounded bg-gray-200 placeholder:text-gray-500" value={formData.maxQuantity} onChange={handleChange} placeholder={String(extra.maxQuantity)} />
                        </div>
                        <div className="flex flex-col px-3 w-full">
                            <label className="text-sm font-semibold mb-2">Precio</label>
                            <input type="number" id="price" className="p-2 border border-gray-300 rounded bg-gray-200 placeholder:text-gray-500" value={formData.price} onChange={handleChange} placeholder={String(extra.price)} />
                        </div>
                    </div>
                    <div className="flex flex-row gap-5 w-full">
                        <button type="submit" className="btn bg-green-400 text-white p-2 px-4 rounded-lg">Save</button>
                        <button type="button" className="btn bg-red-400 text-white p-2 rounded-lg" onClick={() => setIsEditing(false)}>Cancel</button>
                    </div>
                </form>
            )}
        </li>
    );
};

export default ExtraItem;
