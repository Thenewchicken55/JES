import "../app/globals.css";
import { header, footer } from "../app/globals.tsx";
import Link from 'next/link';

const pageTitle = (
  <>
    <title>Team</title>
  </>
);

const body = (
  <>
    <article id="main" className="content">
      <h1>Javan Miller</h1>
      <Link href="https://www.linkedin.com/in/javanm/" legacyBehavior>
        <a target="_blank" rel="noopener noreferrer">
          <img src="/images/javanmiller.jpeg" alt="Javan Miller" style={{ width: '200px', height: '200px' }} />
        </a>
      </Link>
        
      <h1>Elia Albaba</h1>
      <Link href="https://www.linkedin.com/in/elia-albaba-419585235/" legacyBehavior>
        <a target="_blank" rel="noopener noreferrer">
          <img src="/images/eliaalbaba.jpeg" alt="Elia Albaba" style={{ width: '200px', height: '200px' }} />
        </a>
      </Link>

      <h1>Spencer Simms</h1>
      <Link href="https://www.linkedin.com/in/spencer-simms/" legacyBehavior>
        <a target="_blank" rel="noopener noreferrer">
          <img src="/images/spencersimms.jpeg" alt="Spencer Simms" style={{ width: '200px', height: '200px' }} />
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
