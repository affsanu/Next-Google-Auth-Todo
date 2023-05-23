"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import AddProduct from "./components/AddProduct";

async function allProduct() {
  const res = await fetch("http://localhost:3000/api/product/all");
  const products = res.json();
  return products;
}

export default async function Home() {
  const { data: session, status } = useSession();
  const [show, setShow] = useState(false);
  const products = await allProduct();

  const handleShow = () => {
    setShow(!show);
  };

  if (status === "authenticated") {
    return (
      <div>
        <div className="flex container mx-auto justify-between items-center mt-2">
          <div className="flex gap-1">
            <Image
              className="rounded-full ring-2 ring-yellow-500"
              src={session?.user?.image}
              width={24}
              height={24}
              alt=""
            />{" "}
            {session?.user?.name}
          </div>
          <div>
            <button
              onClick={() => signOut()}
              className="p-1 px-4 bg-yellow-500 rounded-md"
            >
              Logout
            </button>
          </div>
        </div>

        <header className="flex flex-col mx-auto container my-4 p-10 bg-gray-700 rounded-md">
          <button
            onClick={handleShow}
            className="p-1 px-4 bg-yellow-500 rounded-md"
          >
            Add product
          </button>
          <div className="overflow-x-auto">
            <table className="table-auto min-w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">Product Name</th>
                  <th className="px-4 py-2">Price</th>
                  <th className="px-4 py-2">Quantity</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => {
                  if (product.email === session.user.email) {
                    return (
                      <tr key={product._id}>
                        <td className="border border-gray-600 px-4 py-2">
                          {product.name}
                        </td>
                        <td className="border border-gray-600 px-4 py-2">
                          {product.price}
                        </td>
                        <td className="border border-gray-600 px-4 py-2">
                          {product.quantity}
                        </td>
                        <td className="border border-gray-600 px-4 py-2">
                          23/05/2023
                        </td>
                        <td className="border border-gray-600 px-4 py-2">
                          {product.quantity > 0 ? "Available" : "Empty"}
                        </td>
                      </tr>
                    );
                  }
                  return null;
                })}
              </tbody>
            </table>
          </div>
          <AddProduct show={show} handleShow={handleShow} />
        </header>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="px-6 sm:px-0 max-w-sm">
        <button
          onClick={() => signIn()}
          type="button"
          className="text-white w-full  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
        >
          <svg
            className="mr-2 -ml-1 w-4 h-4"
            aria-hidden="true"
            focusable="false"
            data-prefix="fab"
            data-icon="google"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 488 512"
          >
            <path
              fill="currentColor"
              d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
            ></path>
          </svg>
          Sign in with Google
          <div></div>
        </button>
      </div>
    </main>
  );
}
