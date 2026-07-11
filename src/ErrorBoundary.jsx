import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // In a real production deployment this is where you'd send the error
    // to a monitoring service (Sentry, LogRocket, etc). Logged locally for now.
    console.error("AgriLink AI crashed:", error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: "100vh", display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", background: "#f5f5f4",
          padding: "24px", fontFamily: "system-ui, sans-serif", textAlign: "center",
        }}>
          <div style={{ fontSize: "40px", marginBottom: "12px" }}>🌱</div>
          <h1 style={{ fontSize: "18px", fontWeight: 600, color: "#1c1917", marginBottom: "8px" }}>
            Something went wrong
          </h1>
          <p style={{ fontSize: "14px", color: "#78716c", marginBottom: "20px", maxWidth: "360px" }}>
            AgriLink AI hit an unexpected error. Your data is safe — reloading usually fixes this.
          </p>
          <button
            onClick={this.handleReset}
            style={{
              background: "#166534", color: "#fff", border: "none", borderRadius: "8px",
              padding: "10px 20px", fontSize: "14px", fontWeight: 600, cursor: "pointer",
            }}
          >
            Reload app
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
