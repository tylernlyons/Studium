import "./SplashPage.css"
import connectMongoDB from "../../config/mongodb";
import Link from "next/link";
//unauthorized home page with about, welcome, etc.

export default function RootPage() {
  connectMongoDB();
  return (
    
    <><div className="splash-container">

      <div className="intro">
        <div className="intro-content">
          <h1>STUDIUM</h1>
          <p className="p">A distraction-free study platform with a built-in lockdown mode, AI-powered assistance, and customizable flashcards. Stay focused, time your sessions, and power through your studies!</p>
          <Link href={"/home"}><button>Start your session here</button></Link>
        </div>

        <div className="intro-img">
          <img src="/images/lofi.jpg" alt="Focus Studying img"></img>
        </div>

      </div>
    </div>

    <div className="features-container">
        <h2 className="section-heading">Platform Features</h2>
        <div className="three-col">
          <div className="card">
            <img src="/images/organize.jpeg" alt="Organize" />
            <h3>Define Your Study Sets</h3>
            <ul>
              <li>
                Create and name your own study sets! The landing page makes them easy to access whenever you need them.
              </li>
            </ul>
          </div>

          <div className="card">
            <img src="/images/lockdown.png" alt="Lockdown Mode" />
            <h3>Lockdown Mode</h3>
            <ul>
              <li>
                Focus Mode helps you stay on task. When activated, Focus Mode locks your session for a set amount of time.
              </li>
            </ul>
          </div>

          <div className="card">
            <img src="/images/studysmart.png" alt="Study Smarter" />
            <h3>Study Smarter with AI</h3>
            <ul>
              <li>
                AI-powered suggestions provide personalized studying. Double click a word that you don't know the meaning of.
              </li>
            </ul>
          </div>


        </div>

    </div></>
      
    )
}