import { redirect } from "next/navigation";

//unauthorized home page with about, welcome, etc.

export default function RootPage() {
  redirect("/pages/home");
}
