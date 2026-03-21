function Navbar() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "15px 25px",
        borderBottom: "1px solid #eee",
        background: "#fff",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <div style={{ fontWeight: "bold" }}>Dayframe</div>

      <div style={{ display: "flex", gap: "20px" }}>
        <span style={{ cursor: "pointer" }}>Home</span>
        <span style={{ cursor: "pointer" }}>Stats</span>
        <span style={{ cursor: "pointer" }}>Journal</span>
      </div>
    </div>
  )
}

export default Navbar