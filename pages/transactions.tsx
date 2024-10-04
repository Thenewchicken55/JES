import "../app/globals.css"
import { header, footer } from "../app/globals.tsx"

const pageTitle =(
    <>
        <title>Transactions</title>
    </>
)

const body = (
    <>
        <article id="main" className="content">
            <h2>Stop spending so much!</h2>
            <h2>Get a job!</h2>
        </article>
    </>
)

export default function Transactions() {
    return (
        <>
            {pageTitle}
            {header}
            {body}
            {footer}
        </>
    );
}