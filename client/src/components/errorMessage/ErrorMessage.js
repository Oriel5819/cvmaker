import React from "react";
import { Alert } from "react-bootstrap";

export default function ErrorMessage({ variant = "info", children }) {
  return (
    <div>
      <Alert variant={variant} style={{ fontSize: 13 }}>
        <strong>{children}</strong>
      </Alert>
    </div>
  );
}
