import "./SplashPage.css"
//unauthorized home page with about, welcome, etc.

export default function RootPage() {
  return (
  <div className="splash-container">
    <h1>This is the splash page. Log in to begin study session.</h1>
    <video src="/videos/splash.mp4" autoPlay loop muted></video>
  </div>
  )
}
