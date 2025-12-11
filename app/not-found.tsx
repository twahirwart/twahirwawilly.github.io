import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container" style={{ paddingTop: 120, paddingBottom: 90 }}>
      <h1 style={{ fontSize: 42, letterSpacing: "-0.03em" }}>Not found</h1>
      <p style={{ marginTop: 12, color: "var(--color-muted)", lineHeight: 1.8 }}>
        The requested page does not exist.
      </p>
      <div style={{ marginTop: 20 }}>
        <Link href="/" className="button">
          Go home
        </Link>
      </div>
    </main>
  );
}
