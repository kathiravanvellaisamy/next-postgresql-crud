"use client";

import { SyntheticEvent, useState } from "react";

import axios from "axios";
import { useRouter } from "next/navigation";

type Product = {
  id: number;
  title: string;
  price: number;
  brandId: number;
};

const DeleteProduct = ({ product }: { product: Product }) => {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleDelete = async (productId: number) => {
    await axios.delete(`/api/products/${productId}`);
    router.refresh();
    setIsOpen(false);
  };
  return (
    <div>
      <button
        className="btn btn-error btn-sm text-white capitalize"
        onClick={handleModal}
      >
        Delete
      </button>
      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="py-3 text-xl text-slate-700 font-medium border-b-2 border-gray-400 mb-3">
            Are you sure to delete {product.title}?
          </h3>
          <form>
            <div className="modal-action">
              <button
                type="button"
                className="btn btn-warning"
                onClick={handleModal}
              >
                No
              </button>
              <button
                type="button"
                onClick={() => handleDelete(product.id)}
                className="btn btn-primary"
              >
                Yes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeleteProduct;
