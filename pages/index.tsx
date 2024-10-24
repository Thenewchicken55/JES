import "../app/globals.css";
import { header, footer } from "../app/globals.tsx";

const pageTitle = (
  <>
    <title>Home</title>
  </>
);

const body = (
  <>
    <article id="main" className="content">
      <h2>What is JES!?</h2>
      <p>
        JES is the acronym for our group members, namely, Javan Miller, Elia
        Albaba, and Spencer Simms. The J in JES is pronounced like a y and so
        the whole thing sounds like you're yelling "Yes!"{" "}
      </p>
      <p>
        This tool is used to keep track of personal finances and placing budgets
        on certain ameneties so that the user can keep track of their
        transactions. JES also offers some tips with learning to control
        budgets.
      </p>
      <a href="/budgets" className="cta-button">
        Get Started
      </a>
      <a href="/AI" className="cta-button">
        Need Help?
      </a>
      <a href="/AI" className="cta-button">
        Meet the team
      </a>
      <a href="/AI" className="cta-button">
        Contact us
      </a>
    </article>
  </>
);

export default function Index() {
  return (
    <>
      {pageTitle}
      {header}
      {body}
      {footer}
    </>
  );
}
