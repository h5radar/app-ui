import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "react-oidc-context";

import { useGetProduct, useUpdateProduct } from "@/queries/product";

import ProductForm from "@/pages/products/form";

export default function EditProductPage() {
  const auth = useAuth();
  const queryClient = useQueryClient();
  const url = new URL(window.location.href);
  const id = url.pathname.split("/")[3];

  const { data: product, isLoading: isLoading, isError: isError, error: error } = useGetProduct(auth, id);
  const { mutate: updateProduct, isPending: isPending } = useUpdateProduct(auth, queryClient, id);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return (
      <>
        <h1>Error getting product</h1>
        <p>{error.message}</p>
      </>
    );
  }

  return (
    <>
      <ProductForm defaultDataForm={product} onSubmit={updateProduct} disabled={isPending} />
    </>
  );
}
