import { useState, useEffect } from "react";
import { z } from "zod";
import { API_URL } from "@/constants";
import { authorSchema } from "@/schemas/author";
import { AuthorTable } from "@/components/authors/table";

export default function AuthorsPage() {
  const [authors, setAuthors] = useState<z.infer<typeof authorSchema>[]>([]);
  useEffect(() => {
    fetch(`${API_URL}/authors`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setAuthors(data);
      });
  }, []);

  if (!authors.length) return <h1>Loading...</h1>;
  return (
    <>
      <AuthorTable data={authors} />
    </>
  );
}
