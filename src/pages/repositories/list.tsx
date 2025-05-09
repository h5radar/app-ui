import { useState, useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { z } from "zod";
import { API_URL } from "@/constants";
import { repositorySchema } from "@/schemas/repository";
import { RepositoryTable } from "@/components/repositories/table";

export default function RepositoriesPage() {
  const auth = useAuth();
  const [repositories, setRepositories] = useState<z.infer<typeof repositorySchema>[]>([]);
  useEffect(() => {
    fetch(`${API_URL}/repositories`, {
      headers: {
        Authorization: `Bearer ${auth.user?.access_token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setRepositories(data);
      });
  }, [auth]);

  if (!repositories.length) return <h1>Loading...</h1>;
  return (
    <>
      <RepositoryTable data={repositories} />
    </>
  );
}
