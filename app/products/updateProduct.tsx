"use client";

import { SyntheticEvent, useState } from "react";
import type { Brand } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";

type Product = {
  id: number;
  title: string;
  price: number;
  brandId: number;
};

const UpdateProduct = ({
  brands,
  product,
}: {
  brands: Brand[];
  product: Product;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price);
  const [brand, setBrand] = useState(product.brandId);
  const router = useRouter();

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    await axios.patch(`/api/products/${product.id}`, {
      title: title,
      price: Number(price),
      brandId: Number(brand),
    });
    router.refresh();
    setIsOpen(false);
  };
  return (
    <div>
      <button className="btn btn-info btn-sm" onClick={handleModal}>
        Edit
      </button>
      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="py-3 text-3xl text-slate-700 font-semibold border-b-2 border-gray-400 mb-3">
            Update Product Details
          </h3>
          <form onSubmit={handleUpdate}>
            <div className="form-control w-full">
              <label htmlFor="" className="label font-bold">
                Product Name
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input input-bordered"
                placeholder="Product Name"
              />
            </div>
            <div className="form-control w-full">
              <label htmlFor="" className="label font-bold">
                Price
              </label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="input input-bordered"
                placeholder="Price"
              />
            </div>
            <div className="form-control w-full">
              <label htmlFor="" className="label font-bold">
                Brand Name
              </label>
              <select
                value={brand}
                onChange={(e) => setBrand(Number(e.target.value))}
                className="select select-bordered"
              >
                {brands.map((brand) => (
                  <option value={brand.id} key={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="modal-action">
              <button
                type="button"
                className="btn btn-warning"
                onClick={handleModal}
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
