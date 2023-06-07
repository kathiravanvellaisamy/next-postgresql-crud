"use client";

import { SyntheticEvent, useState } from "react";
import type { Brand } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";

const AddProducts = ({ brands }: { brands: Brand[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const router = useRouter();

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await axios.post("/api/products", {
      title: title,
      price: Number(price),
      brandId: Number(brand),
    });
    setTitle("");
    setPrice("");
    setBrand("");
    router.refresh();
    setIsOpen(false);
  };
  return (
    <div>
      <button className="btn btn-neutral" onClick={handleModal}>
        Add Product
      </button>
      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="py-3 text-3xl text-slate-700 font-semibold border-b-2 border-gray-400 mb-3">
            Add Product Details
          </h3>
          <form onSubmit={handleSubmit}>
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
                onChange={(e) => setPrice(e.target.value)}
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
                onChange={(e) => setBrand(e.target.value)}
                className="select select-bordered"
              >
                <option value="" disabled>
                  Select a Brand
                </option>
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
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;
