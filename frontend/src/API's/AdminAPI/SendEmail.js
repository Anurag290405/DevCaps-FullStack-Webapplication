// Backend no longer supports bulk email; return stubbed success
export default async function SendEmail() {
  return { success: true, message: "Email sending disabled" };
}