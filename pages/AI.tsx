import "../app/globals.css"
import { header, footer } from "../app/globals.tsx"

const pageTitle =(
    <>
        <title>AI</title>
    </>
)

const body = (
    <>
        <article id="main" className="content">
            <h2>Whisper!</h2>
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