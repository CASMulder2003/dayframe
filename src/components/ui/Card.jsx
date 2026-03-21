function Card({ children, title }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "12px",
        padding: "20px",
        marginBottom: "20px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      }}
    >
      {title && (
        <h3 style={{ marginBottom: "15px" }}>{title}</h3>
      )}
      {children}
    </div>
  )
}

export default Card