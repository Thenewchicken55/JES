import "../app/globals.css";
import { header, footer } from "../app/globals.tsx";
import Link from 'next/link';

const pageTitle = (
  <>
    <title>Home</title>
  </>
);

const body = (
  <>
    <article id="main" className="content">
      <p>
        This tool is used to keep track of personal finances and placing budgets
        on certain ameneties so that the user can keep track of their
        transactions. JES also offers some tips with learning to control
        budgets.
      </p>
      <p>
        Reach out to our support team if you have any questions or need help.
      </p>
      <Link href="/contact" className="cta-button">
        Contact us
      </Link>
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
