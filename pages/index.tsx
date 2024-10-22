import "../app/globals.css"
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { header, footer } from "../app/globals.tsx"

const pageTitle =(
  <>
      <title>Home</title>
  </>
)

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
      <ButtonGroup aria-label="Main Page">
        <Button href="/budgets" variant="primary" className = "cta-button">
          Get Started
        </Button>
        <Button href="/AI" variant="primary" className = "cta-button">
          Need Help?
        </Button>
        <Button href="/AI" variant="primary" className = "cta-button">
          Meet the team
        </Button>
        <Button href="/AI" variant="primary" className = "cta-button">
          Contact us
        </Button>
      </ButtonGroup>
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