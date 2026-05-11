export default function Home() {
  return (
    <main
      style={{
        background: "#050816",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontFamily: "Arial",
        textAlign: "center",
        padding: "40px",
      }}
    >
      <img
        src="/flowbiz-logo.png"
        alt="FlowBiz"
        style={{
          width: "140px",
          marginBottom: "20px",
        }}
      />

      <h1
        style={{
          fontSize: "60px",
          fontWeight: "bold",
          marginBottom: "20px",
          background: "linear-gradient(90deg,#00ffcc,#00aaff)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        FLOWBIZ
      </h1>

      <p
        style={{
          fontSize: "22px",
          color: "#cbd5e1",
          maxWidth: "700px",
          lineHeight: "1.7",
        }}
      >
        Plateforme intelligente de gestion d’entreprise,
        automatisation, CRM, facturation et IA business.
      </p>

      <button
        style={{
          marginTop: "35px",
          padding: "16px 35px",
          borderRadius: "14px",
          border: "none",
          background: "linear-gradient(90deg,#00ffcc,#00aaff)",
          color: "#000",
          fontWeight: "bold",
          fontSize: "18px",
          cursor: "pointer",
        }}
      >
        Découvrir FlowBiz
      </button>
    </main>
  );
}