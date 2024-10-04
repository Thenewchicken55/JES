import "../app/globals.css"

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
            <a href="/budgets">Budgets</a>
          </li>
          <li>
            <a href="/transactions">Transactions</a>
          </li>
        </ul>
      </nav>
    </header>
    </>
);

const body = (
  <>
    <article id="main" className="content">
      <h2>What is JES!?</h2>
      <p>
        JES is the acronym for our group members, namely, Javan Miller, Elia
        Albaba, and Spencer Simms. The J in JES is pronounced like a y and so the
        whole thing sounds like you're yelling "Yes!"{" "}
      </p>
      <p>
        This tool is used to keep track of personal finances and placing budgets
        on certain ameneties so that the user can keep track of their
        transactions. JES also offers some tips with learning to control budgets.
      </p>
      <p>
        <a href="/budgets" className="cta-button">
          Get Started
        </a>
        <a href="/AI" className="cta-button">
          Need Help?
        </a>
      </p>
    </article>
  </>
);

const footer = (
  <>
    <footer>
      <p>
        © 2024 University of Akron. All Rights Reserved -- The Kernels (Javan
        Miller, Elia Albaba, and Spencer Simms)
      </p>
    </footer>
  </>
);

export default function Index() {
  return (
    <>
      {header}
      {body}
      {footer}
    </>
  );
}