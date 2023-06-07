import { PrismaClient } from "@prisma/client";
import AddProducts from "./addProducts";
import DeleteProduct from "./deleteProduct";
import UpdateProduct from "./updateProduct";
const prisma = new PrismaClient();

const getProducts = async () => {
  const res = await prisma.product.findMany({
    select: {
      id: true,
      title: true,
      price: true,
      brandId: true,
      brand: true,
    },
  });
  return res;
};

const getBrands = async () => {
  const res = await prisma.brand.findMany();
  return res;
};

export default async function Products() {
  const [products, brands] = await Promise.all([getProducts(), getBrands()]);
  console.log(products);
  return (
    <div>
      <h1 className="py-3 text-3xl lg:text-6xl font-extralight text-slate-600">
        Admin Panel
      </h1>
      <div className="border border-slate-200 p-2 m-2 rounded-md  flex items-end justify-end w-full">
        <AddProducts brands={brands} />
      </div>
      <table className="table w-full">
        <thead>
          <tr>
            <th className="text-xl font-bold text-gray-500">#</th>
            <th className="text-xl font-bold text-gray-500">Product Name</th>
            <th className="text-xl font-bold text-gray-500">Price</th>
            <th className="text-xl font-bold text-gray-500">Brand</th>
            <th className="text-center text-xl font-bold text-gray-500">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td>{product.brand.name}</td>
              <td className="flex flex-row gap-3 items-center justify-center">
                <UpdateProduct product={product} brands={brands} />
                <DeleteProduct product={product} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
