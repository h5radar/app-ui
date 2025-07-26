import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router";

import { useCreateProduct } from "@/queries/product";

import ProductForm from "@/pages/products/form";

export default function NewProductPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: createProduct, isPending: isPending } = useCreateProduct(auth, queryClient, navigate);

  return (
    <>
      <ProductForm onSubmit={createProduct} disabled={isPending} />
    </>
  );
}
