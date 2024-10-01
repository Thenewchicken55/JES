import "../app/style.css"

const header = (
    <>
    <title>Home</title>
    <link rel="stylesheet" href="globals.css" />
    <header id="header" className="site-header">
      <h1 className="site-title">JES - Financial Budgeting Tool</h1>
      <nav className="site-navigation">
        <ul className="nav-menu">
          <li>
            <a href="/">Home</a>
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
    </>
);

export default function Transactions() {
    return (
        <>
            {header}
        </>
    );
}