const data = [
  { label: "Jobs", value: "1.45", unit: "MM" },
  { label: "Latency", value: "32", unit: "min" },
  { label: "Workers", value: "16" },
  { label: "Running", value: "42" },
];
export const KPIs = () => (
  <div
    style={{ display: "flex", justifyContent: "space-between", width: "100%" }}
  >
    {data.map((e) => (
      <div>
        <small
          style={{
            textTransform: "uppercase",
            fontWeight: "bold",
            color: "#999",
          }}
        >
          {e.label}
        </small>
        <div
          style={{
            color: "#666",
            fontWeight: "bold",
            fontSize: "150%",
            lineHeight: "100%<",
          }}
        >
          {e.value}
          {e.unit && (
            <span style={{ marginLeft: 4, fontWeight: 100, fontSize: "50%" }}>
              {e.unit}
            </span>
          )}
        </div>
      </div>
    ))}
  </div>
);
