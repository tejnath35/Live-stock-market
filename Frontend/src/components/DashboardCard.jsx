function DashboardCard({ title, value }) {
  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        width: "200px",
        textAlign: "center"
      }}
    >
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
}

export default DashboardCard;