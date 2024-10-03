import "../app/globals.css"

const element = (
    <>
  <title>JES - Financial Budgeting Tool</title>
  <link rel="stylesheet" href="globals.css" />
  <header id="header" className="site-header">
    <h1 className="site-title">AI Chatbot</h1>
    <nav className="site-navigation">
      <ul className="nav-menu">
        <li>
          <a href="home.html">Home</a>
        </li>
        <li>
          <a href="AI.html">AI</a>
        </li>
        <li>
          <a href="Budgets.html">Budgets</a>
        </li>
      </ul>
    </nav>
  </header>
  <article id="main" className="content">
    <h2>Whisper!</h2>
  </article>
  <footer>
    <p>
      © 2024 University of Akron. All Rights Reserved -- The Kernels (Javan
      Miller, Elia Albaba, and Spencer Simms)
    </p>
  </footer>
</>

)

export default function Transactions() {
  return (
      <>
          {element}
      </>
  );
}