import "./SplashPage.css"
import connectMongoDB from "../../config/mongodb";
//unauthorized home page with about, welcome, etc.

export default function RootPage() {
  connectMongoDB();
  return (
    <div className="splash-container">
      <div className="intro">
        <h1>STUDIUM</h1>
        <p className="p">A distraction-free study platform with a built-in lockdown mode, AI-powered assistance, and customizable flashcards. Stay focused, track your sessions, and power through your studies!</p>
      </div>
      <div>

      </div>
    </div>
  )
}
