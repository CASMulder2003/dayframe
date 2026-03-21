export default function JournalPage() {
  return (
    <div className="page">
      <section className="hero">
        <p className="eyebrow">History & reflection</p>
        <h1 className="page-title">Journal</h1>
        <p className="page-subtitle">
          This page will later show notes linked to your hard-goal entries.
        </p>
      </section>

      <div className="card">
        <h2 className="section-title">Coming next</h2>
        <p className="placeholder-copy">
          The next step here is to render saved notes for gym, deep work,
          admin, cardio, and morning routine by date.
        </p>
      </div>
    </div>
  );
}