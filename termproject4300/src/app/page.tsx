import { redirect } from "next/navigation";

//unauthorized home page with about, welcome, etc.

export default function RootPage() {
  return (
  <div>
    <h1>"This is the splash page. Log in to begin study session.</h1>
  </div>
  )
}
