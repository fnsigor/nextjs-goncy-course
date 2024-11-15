//se em outras paginas nao tiverem seu proprio loading, vao pegar o loading mais proximo, devido ao suspende boundary
//o mesmo ocorre com os error.tsx
export default function Loading() {
  return <div>Carregando...</div>;
}
