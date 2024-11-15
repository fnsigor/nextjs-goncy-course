"use client";

import Form from "next/form";
import {useRouter, useSearchParams} from "next/navigation";

export default function SearchBox() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  //   // Prevenimos que a página se atualize ao enviar o formulário
  //   event.preventDefault();

  //   // Obtemos os dados do formulário
  //   const formData = new FormData(event.currentTarget);

  //   // Obtemos o valor do input
  //   const query = formData.get("query");

  //   // Redirecionamos ao index com uma query
  //   router.push(`/?q=${query}`);
  // }

  return (
    <Form action="/" className="mb-4 inline-flex gap-2">
      {/* Inicializamos o input para que contenha o valor atual da query */}
      <input className="px-2" defaultValue={searchParams.get("q") || ""} name="q" />
      <button className="bg-white/20 p-2" type="submit">
        Buscar
      </button>
    </Form>
  );
}
