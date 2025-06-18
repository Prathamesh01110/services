import { Html, Text, Heading, Section, Container, Hr } from "@react-email/components";
import * as React from "react";

export default function EmailTemplate() {
  const username = "jay";
  const phone = "+91-779456";
  const age = 28;

  return (
    <Html>
      <Container
        style={{
          fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
          backgroundColor: "#f8f9fa",
          padding: "40px 20px",
        }}
      >
        <Section
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            backgroundColor: "#ffffff",
            border: "1px solid #e0e0e0",
            borderRadius: "12px",
            padding: "30px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          }}
        >
          <Heading
            style={{
              fontSize: "32px",
              marginBottom: "12px",
              color: "#212529",
              textAlign: "center",
            }}
          >
            User Profile Summary
          </Heading>
          <Text
            style={{
              fontSize: "16px",
              color: "#6c757d",
              textAlign: "center",
              marginBottom: "24px",
            }}
          >
            Here’s a quick snapshot of the user’s basic details.
          </Text>

          <Hr style={{ border: "none", borderTop: "1px solid #dee2e6", margin: "20px 0" }} />

          <Text style={{ fontSize: "16px", color: "#343a40", marginBottom: "12px" }}>
            <strong>Username:</strong> {username}
          </Text>
          <Text style={{ fontSize: "16px", color: "#343a40", marginBottom: "12px" }}>
            <strong>Phone:</strong> {phone}
          </Text>
          <Text style={{ fontSize: "16px", color: "#343a40", marginBottom: "12px" }}>
            <strong>Age:</strong> {age}
          </Text>

          <Hr style={{ border: "none", borderTop: "1px solid #dee2e6", margin: "30px 0" }} />

          <Text style={{ fontSize: "14px", color: "#adb5bd", textAlign: "center" }}>
            This is an automated message. Please do not reply.
          </Text>
        </Section>
      </Container>
    </Html>
  );
}
