//se defirmos metadata no layout, ela sera espelhada pra todos os pages children

import SearchBox from "./components/SearchBox";

export default function HomeLayout({children}: {children: React.ReactNode}) {
  return (
    <article>
      <SearchBox />
      {children}
    </article>
  );
}
