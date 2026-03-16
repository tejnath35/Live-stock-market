function DashboardCard({ title, value }) {
  return (
    <div
     style={{
  padding: "20px",
  borderRadius: "12px",
  width: "220px",
  textAlign: "center",
  background: "linear-gradient(135deg,#3b82f6,#06b6d4)",
  color: "white",
  boxShadow: "0 6px 15px rgba(0,0,0,0.2)"
}}
    >
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
}

export default DashboardCard;