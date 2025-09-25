import sgMail from "@sendgrid/mail";

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const FROM_EMAIL = process.env.FROM_EMAIL || ADMIN_EMAIL;

if (SENDGRID_API_KEY) {
	sgMail.setApiKey(SENDGRID_API_KEY);
}

export async function sendAdminContactEmail(params: {
	name: string;
	email: string;
	message: string;
}) {
	if (!SENDGRID_API_KEY) {
		console.warn("SENDGRID_API_KEY not set; skipping email send.");
		return { success: false, skipped: true, reason: "missing_api_key" };
	}
	if (!ADMIN_EMAIL || !FROM_EMAIL) {
		console.warn("ADMIN_EMAIL or FROM_EMAIL not set; skipping email send.");
		return { success: false, skipped: true, reason: "missing_addresses" };
	}

	const { name, email, message } = params;

	const subject = `New contact form submission from ${name}`;
	const text = `You have a new contact form submission.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
	const html = `
		<h2>New contact form submission</h2>
		<p><strong>Name:</strong> ${escapeHtml(name)}</p>
		<p><strong>Email:</strong> ${escapeHtml(email)}</p>
		<p><strong>Message:</strong></p>
		<p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
	`;

	try {
		await sgMail.send({
			to: ADMIN_EMAIL,
			from: FROM_EMAIL,
			subject,
			text,
			html,
		});
		return { success: true };
	} catch (error: any) {
		console.error("Failed to send admin contact email:", error?.response?.body || error?.message || error);
		return { success: false, error: error?.message || "send_failed" };
	}
}

function escapeHtml(input: string) {
	return input
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#039;");
}
