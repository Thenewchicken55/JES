import "../app/globals.css"
import { header, footer } from "../app/globals.tsx"

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
            {header}
            {body}
            {footer}
        </>
    );
}