// Auth is removed in the simplified backend. Stub a success response.
export default async function Verify() {
  return { message: "Admin verified successfully", name: "Admin" };
}