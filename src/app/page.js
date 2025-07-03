import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import HomePage from "@/components/HomePage";



export default async function Home () {
  const cookieStore = await cookies();
  const username = await cookieStore.get("username")?.value;
  if(username){
    redirect(`/user/${username}`);
  }
  return (<HomePage />);
}