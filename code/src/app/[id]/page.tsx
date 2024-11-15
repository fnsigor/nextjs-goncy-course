import RestaurantCard from "../(index)/components/restaurant-card";

import api from "@/api";

//nesse arquivo occore duas chamadas iguais pra api
//como são server components, vão usar a deduplicação após o build

//essa função torna paginas dinamicas  em estaticas

//se é necessario usar cookies ou outras coisas, nao podem ser estaticas
export async function generateStaticParams() {
  const restaurants = await api.list();

  return restaurants.map((restaurant) => ({
    id: restaurant.id,
  }));
}

export async function generateMetadata({params}: {params: Promise<{id: string}>}) {
  const {id} = await params;
  const restaurant = await api.fetch(id);

  return {
    title: `${restaurant.name} - Restaurancy`,
    description: restaurant.description,
  };
}

export default async function RestaurantPage({params}: {params: Promise<{id: string}>}) {
  const {id} = await params;
  const restaurant = await api.fetch(id);

  return <RestaurantCard restaurant={restaurant} />;
}
