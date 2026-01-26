export interface CredentialProps {
  credentialId: string;
  username: string;
  password: string; // Hashed password
}

export interface SafeCredentialProps {
  credentialId: string;
  username: string;
  // Password intentionally omitted for security
}
