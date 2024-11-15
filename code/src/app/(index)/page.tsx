import Link from "next/link";

import RestaurantCard from "./components/restaurant-card";

//é uma das maneiras de tornar uma pagina estatica em dinamica
//o next possui outros recursos como esse pra sobreescrever configurações definidadas no fetch, como "export revalidate = 60 (valor ficticio)"
export const dynamic = "force-dynamic";

/*quando se usa inforamções como cookies ou outras informações que só podem ser obtidas em momento de excução, a pagina se torna dinamica automaticamente
msm q vc force que seja estatica com generateStaticParams, só de pegar cookies ou outras informaçoes, a pagina vai ficar dinamica e nao tem como sobreescrever nesses casos
*/

import api from "@/api";

export default async function Home({searchParams}: {searchParams: Promise<{q: string}>}) {
  const {q} = await searchParams;
  const restaurants = await api.search(q);

  //console.log(restaurants);
  /*
  next image é bom quando a imagem vai ser acessada varias vezes, pq vai ser cacheada
  é um recurso que consome recursos do servidor, evite usar sempre
  */

  return (
    <section className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
      {restaurants.map((restaurant) => {
        return (
          <Link key={restaurant.id} href={`/${restaurant.id}`}>
            <RestaurantCard restaurant={restaurant} />
          </Link>
        );
      })}
    </section>
  );
}
