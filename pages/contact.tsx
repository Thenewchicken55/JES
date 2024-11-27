import "../app/globals.css";
import { header, footer } from "../app/globals.tsx";
import Link from 'next/link';

const pageTitle = (
  <>
    <title>Contact Us</title>
  </>
);

const body = (
  <>
    <article id="main" className="content">
        <h2>
            Contact us
        </h2>
        <Link href="https://www.linkedin.com/company/jes-budget/" legacyBehavior>
            <a target="_blank" rel="noopener noreferrer">
                <img src="/images/linkedin.png" alt="LinkedDin" style={{ width: '70px', height: '70px' }} />
            </a>
        </Link>
        <br></br>
        <br></br>
        <Link href="mailto:info@jesbudget.com" legacyBehavior>
            <a target="_blank" rel="noopener noreferrer">
                <img src="/images/email.png" alt="Email" style={{ width: '70px', height: '70px' }} />
            </a>
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
