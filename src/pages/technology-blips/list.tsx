import { useState, useEffect } from "react";
import { z } from "zod";
import { useAuth } from "react-oidc-context";
import { API_URL } from "@/constants";
import { technologyBlipSchema } from "@/schemas/technology-blip";
import { TechnologyBlipTable } from "@/components/technology-blips/table";

export default function ProductsPage() {
  const auth = useAuth();
  const [technologyBlips, setProducts] = useState<z.infer<typeof technologyBlipSchema>[]>([]);
  useEffect(() => {
    fetch(`${API_URL}/technology-blips`, {
      headers: {
        Authorization: `Bearer ${auth.user?.access_token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProducts(data);
      });
  }, [auth]);

  if (!technologyBlips.length) return <h1>Loading...</h1>;
  return (
    <>
      <TechnologyBlipTable data={technologyBlips} />
    </>
  );
}
