import { HaidNoteList } from "@/components/HaidNoteList";

export const dynamic = "force-dynamic"; // bypass si cache

async function getHaidData() {
  const res = await fetch("https://v1.appbackend.io/v1/rows/TyLhTJDyYOIA");
  const data = await res.json();
  return data;
}

export default async function Home() {
  const { data } = await getHaidData();

  return <HaidNoteList data={data} />;
}
