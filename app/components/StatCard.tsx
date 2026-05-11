"use client";

export default function StatCard({ title, value, text, icon, color }: any) {
  return (
    <div className="statCard">
      <div className="statTop">
        <span>{title}</span>
        <div className={`statIcon ${color}`}>{icon}</div>
      </div>

      <h2>{value}</h2>
      <p>{text}</p>
      <div className={`miniLine ${color}`} />
    </div>
  );
}
