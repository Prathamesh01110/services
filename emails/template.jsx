import { Html, Text, Heading, Section, Container } from "@react-email/components";
import * as React from "react";

export default function EmailTemplate() {
  // You can pass these as props or populate from your backend
  const username = "prathamesh Jakula";
  const phone = "+91-9892644864";
  const age = 28;

  return (
    <Html>
      <Container
        style={{
          padding: "20px",
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#f4f4f4",
          color: "#333",
          maxWidth: "600px",
          margin: "0 auto",
          borderRadius: "8px",
        }}
      >
        <Section style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "6px" }}>
          <Heading style={{ fontSize: "48px", marginBottom: "16px" }}>
            User Information
          </Heading>
          <Text>
            <strong>Username:</strong> {username}
            <Text>I am Learing</Text>
          </Text>
          <Text>
            <strong>Phone:</strong> {phone}
          </Text>
          <Text>
            <strong>Age:</strong> {age}
          </Text>
        </Section>
      </Container>
    </Html>
  );
}
