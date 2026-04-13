# email

## Purpose
Transactional email templates: auth emails, payment lifecycle emails.

## Critical Rules
- ALWAYS use sendEmail() from providers/email — never import Resend directly
- ALWAYS use escapeHtml() for user-provided data in templates
- ALWAYS include both HTML and plain text versions (via emailLayout)
