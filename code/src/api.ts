import {Restaurant} from "./types";

// Listado de restaurantes
const restaurants: Restaurant[] = [
  {
    id: "1",
    name: "The Golden Spoon",
    description:
      "A fine dining experience with a menu that changes daily based on the freshest ingredients available.",
    address: "123 Main St. Anytown USA",
    score: 4.5,
    ratings: 100,
    image: "https://picsum.photos/id/30/480/300",
  },
  {
    id: "2",
    name: "La Piazza",
    description: "Authentic Italian cuisine in a cozy atmosphere with outdoor seating available.",
    address: "456 Oak Ave. Anytown USA",
    score: 4.2,
    ratings: 80,
    image: "https://picsum.photos/id/42/480/300",
  },
  {
    id: "3",
    name: "The Sizzling Skillet",
    description:
      "A family-friendly restaurant with a wide variety of dishes. including vegetarian and gluten-free options.",
    address: "789 Elm St. Anytown USA",
    score: 4.8,
    ratings: 120,
    image: "https://picsum.photos/id/163/480/300",
  },
  {
    id: "4",
    name: "The Hungry Bear",
    description: "A rustic cabin-style restaurant serving hearty portions of comfort food.",
    address: "101 Forest Rd. Anytown USA",
    score: 4.0,
    ratings: 60,
    image: "https://picsum.photos/id/192/480/300",
  },
  {
    id: "5",
    name: "The Spice Route",
    description: "A fusion restaurant that combines the flavors of India. Thailand. and China.",
    address: "246 Main St. Anytown USA",
    score: 4.6,
    ratings: 90,
    image: "https://picsum.photos/id/195/480/300",
  },
  {
    id: "6",
    name: "The Catch of the Day",
    description: "A seafood restaurant with a focus on locally-sourced. sustainable ingredients.",
    address: "369 Beach Blvd. Anytown USA",
    score: 4.3,
    ratings: 70,
    image: "https://picsum.photos/id/225/480/300",
  },
  {
    id: "7",
    name: "The Garden Cafe",
    description: "A vegetarian restaurant with a beautiful outdoor garden seating area.",
    address: "753 Maple St. Anytown USA",
    score: 4.9,
    ratings: 150,
    image: "https://picsum.photos/id/292/480/300",
  },
  {
    id: "8",
    name: "The Burger Joint",
    description: "A classic American diner with a wide variety of burgers. fries. and milkshakes.",
    address: "852 Oak Ave. Anytown USA",
    score: 3.9,
    ratings: 50,
    image: "https://picsum.photos/id/326/480/300",
  },
  {
    id: "9",
    name: "The Cozy Corner",
    description:
      "A small cafe with a warm and inviting atmosphere. serving breakfast and lunch dishes.",
    address: "963 Main St. Anytown USA",
    score: 4.7,
    ratings: 110,
    image: "https://picsum.photos/id/365/480/300",
  },
  {
    id: "10",
    name: "The Steakhouse",
    description: "A high-end restaurant specializing in premium cuts of beef and fine wines.",
    address: "1479 Elm St. Anytown USA",
    score: 4.1,
    ratings: 75,
    image: "https://picsum.photos/id/395/480/300",
  },
  {
    id: "11",
    name: "The Taco Truck",
    description: "A casual Mexican restaurant serving authentic street tacos.",
    address: "753 Main St. Anytown USA",
    score: 4.4,
    ratings: 65,
    image: "https://picsum.photos/id/429/480/300",
  },
  {
    id: "12",
    name: "The Ice Cream Parlor",
    description: "A family-friendly restaurant with a wide variety of ice cream flavors.",
    address: "852 Oak Ave. Anytown USA",
    score: 4.9,
    ratings: 150,
    image: "https://picsum.photos/id/431/480/300",
  },
  {
    id: "13",
    name: "Baratie",
    description: "A family-friendly restaurant with a wide variety of ice cream flavors.",
    address: "852 Oak Ave. Anytown USA",
    score: 5.0,
    ratings: 350,
    image:
      "https://imgs.search.brave.com/wElXwJlX_f67oHA6wxE4xEEsYgQaDBtE79GzZBw5DXw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMxLmNicmltYWdl/cy5jb20vd29yZHBy/ZXNzL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDIyLzEwL0JhcmF0/aWUtcmVzdGF1cmFu/dC1pbi1PbmUtUGll/Y2UuanBn",
  },
];

// Simular un delay en la respuesta de la API
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, Math.random() * ms));

const api = {
  // Obtener todos los restaurantes
  list: async (): Promise<Restaurant[]> => {
    // Obtemos a informação do Google Sheets em formato texto e a dividimos por linhas, pulamos a primeira linha porque é o cabeçalho
    //omitindo o primeiro dado pq sao os titulos das colunas

    //com revaçidate, podemos ter paginas estaticas com dados atualizados
    const [, ...data] = await fetch(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vRJ_LEn3u-MIX44qRLJMX3JJYDrsAFf-yJYGJlgexjO4KzGcvDv1Ybn7LXfZ-M-iPFTwEGmpdrz6Npn/pub?output=csv",
      {
        cache: "force-cache",
        next: {
          // revalidate: 60,
          tags: ["restaurants"],
        },
      },
    )
      .then((res) => res.text())
      .then((text) => text.split("\n"));

    // Convertemos cada linha em um objeto Restaurant, certifique-se de que os campos não possuam `,`

    const restaurants: Restaurant[] = data.map((row) => {
      const [id, name, description, address, score, ratings, image] = row.split(",");

      return {
        id,
        name,
        description,
        address,
        score: Number(score),
        ratings: Number(ratings),
        image,
      };
    });

    // O retornamos
    return restaurants;
  },
  // Obtener un restaurante específico por su ID
  fetch: async (id: Restaurant["id"]): Promise<Restaurant> => {
    // Simular un delay en la respuesta de la API
    await sleep(7500);

    // Buscar el restaurante con el ID correspondiente
    const restaurant = restaurants.find((restaurant) => restaurant.id === id);

    // Lanzar un error si el restaurante no es encontrado
    if (!restaurant) {
      throw new Error(`Restaurant with id ${id} not found`);
    }

    return restaurant;
  },

  search: async (query: string = ""): Promise<Restaurant[]> => {
    // Obtemos os restaurantes
    const results = await api.list();

    // Filtramos por nome
    return results.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(query.toLowerCase()),
    );
  },
};

export default api;
