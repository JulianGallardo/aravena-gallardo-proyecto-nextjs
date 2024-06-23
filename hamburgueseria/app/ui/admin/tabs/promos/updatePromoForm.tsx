import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Category, Burger } from "@/prisma/generated/client";
import { updatePromo, fetchAllBurgers } from "@/lib/crud";
import { useRouter } from "next/navigation";
import { PromoExtendida } from "@/lib/definitions";
import { toast } from "react-toastify";

type FormValues = {
  name: string;
  imageUrl: string;
  description: string;
  category: Category;
  price: number;
  burgers: { burger: Burger; quantity: number; newPrice: number }[];
};

interface PromoForm {
  promo: PromoExtendida;
  handleUpdate: () => void;
}

const UpdatePromoForm = ({ promo, handleUpdate }: PromoForm) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormValues>({
    defaultValues: {
      name: promo?.name || "",
      imageUrl: promo?.imageUrl || "",
      description: promo?.description || "",
      category: promo?.category || "",
      burgers: promo?.burgers || [],
    },
  });
  const router = useRouter();
  const [burgers, setBurgers] = useState<Burger[]>([]);
  const [burgersInPromo, setBurgersInPromo] = useState<
    { burger: Burger; quantity: number; newPrice: number }[]
  >(promo?.burgers || []);

  useEffect(() => {
    const fetchBurgers = async () => {
      const fetchedBurgers = await fetchAllBurgers();
      setBurgers(fetchedBurgers);
    };
    fetchBurgers();
  }, []);

  useEffect(() => {
    burgersInPromo.forEach((burger, index) => {
      const burgerInPromo = burgers.find(
        (b) => b.productId === burger.burger.productId
      );
      if (!burgerInPromo) return;
      setValue(`burgers.${index}.burger`, burgerInPromo);
      setValue(`burgers.${index}.quantity`, burger.quantity);
      setValue(`burgers.${index}.newPrice`, burger.newPrice);
    });
  }, [burgers, burgersInPromo, setValue]);

  const onSubmit = async (data: FormValues) => {
    const prices = data.burgers.map(
      (burger) => burger.newPrice * burger.quantity
    );
    const price = prices.reduce((acc, curr) => acc + curr, 0);
    data.price = Number(price.toFixed(2));

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === "burgers") {
        formData.append(key, JSON.stringify(burgersInPromo));
      } else {
        formData.append(key, String(value));
      }
    });

    const updatedPromo = await updatePromo(promo.promoId, formData);

    if (updatedPromo) {
      handleUpdate();
      toast.success("Promoción actualizada con éxito");
    }
  };

  const addBurger = () => {
    setBurgersInPromo([
      ...burgersInPromo,
      { burger: burgers[0], quantity: 1, newPrice: 0 },
    ]);
  };

  const removeBurger = (index: number) => {
    setBurgersInPromo(burgersInPromo.filter((_, i) => i !== index));
  };

  function calculatePromoPrice(): React.ReactNode {
    const prices = burgersInPromo.map((burger) =>
      burger.newPrice > 0 ? burger.newPrice * burger.quantity : 0
    );
    const price = prices.reduce((acc, curr) => acc + curr, 0);
    return price.toFixed(2);
  }

  return (
    <form
      className="flex flex-col h-full gap-2 mx-20 bg-white p-4 py-6 rounded-md text-black"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-2xl font-bold">Nueva Promoción</h1>

      <label htmlFor="name">Nombre</label>
      <input
        className="p-2 border border-gray-300 rounded bg-gray-200 placeholder:text-gray-500"
        id="name"
        type="text"
        {...register("name", { required: true })}
      />
      {errors.name && (
        <span className="text-red-500">Falta completar este campo</span>
      )}

      <label htmlFor="description">Descripción</label>
      <textarea
        className="p-2 border border-gray-300 rounded bg-gray-200 placeholder:text-gray-500"
        id="description"
        {...register("description", { required: true })}
      />
      {errors.description && (
        <span className="text-red-500">Falta completar este campo</span>
      )}

      <div className="flex flex-col gap-2">
        <label htmlFor="category">Burgers incluidas</label>
        {burgersInPromo.map((burger, index) => (
          <div key={index}>
            <div className="flex flex-col md:flex-row gap-5 items-center">
              <select
                className="p-2 border border-gray-300 rounded bg-gray-200 w-full"
                {...register(`burgers.${index}.burger`, { required: true })}
                value={burger.burger.productId}
                onChange={(e) => {
                  const productId = e.target.value;
                  if (productId === "0") return;
                  const newBurgersInPromo = burgersInPromo.map((burger, i) => {
                    if (i === index) {
                      const newBurger = burgers.find(
                        (burger) => burger.productId === Number(productId)
                      );
                      if (newBurger) return { ...burger, burger: newBurger };
                    }
                    return burger;
                  });
                  setBurgersInPromo(newBurgersInPromo);
                }}
              >
                <option value={""}>Selecciona una burger</option>
                {burgers.map((burger) => (
                  <option key={burger.productId} value={burger.productId}>
                    {burger.name}
                  </option>
                ))}
              </select>
              <input
                className="p-2 border border-gray-300 rounded bg-gray-200 placeholder:text-gray-500"
                type="number"
                placeholder="Cantidad"
                {...register(`burgers.${index}.quantity`, {
                  valueAsNumber: true,
                  required: true,
                  validate: (value) => value > 0,
                })}
                value={burger.quantity}
                onChange={(e) => {
                  const quantity = e.target.value;
                  const newBurgersInPromo = burgersInPromo.map((burger, i) => {
                    if (i === index) {
                      return { ...burger, quantity: Number(quantity) };
                    }
                    return burger;
                  });
                  setBurgersInPromo(newBurgersInPromo);
                }}
              />
              <input
                className="p-2 border border-gray-300 rounded bg-gray-200 placeholder:text-gray-500"
                type="float"
                placeholder="Nuevo precio individual"
                {...register(`burgers.${index}.newPrice`, {
                  valueAsNumber: true,
                  required: true,
                  validate: (value) => value > 0,
                })}
                value={burger.newPrice}
                onChange={(e) => {
                  const newPrice = e.target.value;
                  const newBurgersInPromo = burgersInPromo.map((burger, i) => {
                    if (i === index) {
                      return { ...burger, newPrice: Number(newPrice) };
                    }
                    return burger;
                  });
                  setBurgersInPromo(newBurgersInPromo);
                }}
              />
              <button
                type="button"
                className="btn bg-red-500 hover:bg-red-800 text-white"
                onClick={() => removeBurger(index)}
              >
                Eliminar
              </button>
            </div>
            <div>
              {errors.burgers && errors.burgers[index] && (
                <span className="text-red-500">Falta completar este campo</span>
              )}
            </div>
            <div className="divider"></div>
          </div>
        ))}
        <button
          type="button"
          className="btn bg-gray-600 text-white"
          onClick={addBurger}
        >
          Añadir burger
        </button>
      </div>
      <div className="flex flex-col gap-5 col-span-2">
        <label htmlFor="price">Precio: ${calculatePromoPrice()}</label>
      </div>

      <div className="flex flex-col gap-5 items-center justify-center col-span-2">
        <button
          className="btn bg-green-400 text-white px-4 py-2 rounded hover:bg-green-600"
          type="submit"
        >
          Actualizar Promo
        </button>
      </div>
    </form>
  );
};

export default UpdatePromoForm;
