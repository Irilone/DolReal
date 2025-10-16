# Security Policy

## Supported Versions

We actively support and provide security updates for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 2.x.x   | :white_check_mark: |
| < 2.0   | :x:                |

## Reporting a Vulnerability

We take the security of DolReal seriously. If you discover a security vulnerability, please follow these steps:

### 1. Do Not Open a Public Issue

Please **do not** open a public GitHub issue for security vulnerabilities. Public disclosure could put all users at risk.

### 2. Report Privately

Report security vulnerabilities through one of these methods:

**Email**: Send details to the DoL 2025 Team at security@dol2025.example (if available)

**GitHub Security Advisory**: Use GitHub's private security reporting feature:
1. Go to the repository's Security tab
2. Click "Report a vulnerability"
3. Fill in the details

### 3. Provide Details

When reporting a vulnerability, please include:

- **Description**: A clear description of the vulnerability
- **Impact**: What could an attacker do with this vulnerability?
- **Steps to Reproduce**: Detailed steps to reproduce the issue
- **Affected Versions**: Which versions are affected?
- **Suggested Fix**: If you have ideas on how to fix it
- **Your Contact Info**: So we can follow up with questions

### Example Report

```
Subject: [SECURITY] XSS Vulnerability in Stream Title Display

Description:
User-supplied stream titles are not properly sanitized before being
rendered in the UI, allowing for potential XSS attacks.

Impact:
An attacker could inject malicious JavaScript that executes when
other users view the stream list.

Steps to Reproduce:
1. Create a stream with title: <script>alert('XSS')</script>
2. View the stream list
3. Alert is triggered

Affected Versions: 2.0.0 - 2.1.5
Suggested Fix: Use DOMPurify or similar sanitization library
```

## Response Timeline

- **Initial Response**: Within 48 hours
- **Assessment**: Within 1 week
- **Fix Development**: Depends on severity
  - Critical: Within 1 week
  - High: Within 2 weeks
  - Medium: Within 1 month
  - Low: Next regular release
- **Public Disclosure**: After fix is available

## Vulnerability Severity

We use the following severity levels:

### Critical
- Remote code execution
- SQL injection
- Authentication bypass
- Data breach

### High
- Cross-site scripting (XSS)
- Cross-site request forgery (CSRF)
- Privilege escalation
- Information disclosure (sensitive data)

### Medium
- Denial of service
- Information disclosure (non-sensitive)
- Weak cryptography

### Low
- Security misconfigurations
- Best practice violations

## Security Best Practices

When contributing to DolReal, please follow these security practices:

### API Keys and Secrets

- **Never commit API keys** or secrets to the repository
- Use environment variables for all sensitive data
- Add all `.env*` files to `.gitignore`
- Use the `.env.example` template for documentation

### Dependencies

- Keep dependencies up to date
- Review security advisories for dependencies
- Use `npm audit` or `bun audit` regularly
- Pin dependency versions in production

### Input Validation

- Validate all user input
- Sanitize data before rendering
- Use parameterized queries for database operations
- Implement rate limiting for APIs

### Authentication & Authorization

- Use secure session management
- Implement proper access controls
- Hash and salt passwords appropriately
- Use HTTPS in production

### Code Review

- Review all code for security issues
- Use automated security scanning tools
- Follow secure coding guidelines
- Test security controls

## Security Tools

We use the following tools to maintain security:

- **Dependabot**: Automatic dependency updates
- **npm audit**: Vulnerability scanning
- **ESLint**: Static code analysis
- **TypeScript**: Type safety

## Acknowledgments

We appreciate security researchers who help keep DolReal secure. Responsible disclosure helps protect all users.

If you report a valid security vulnerability, we will:

1. Acknowledge your contribution
2. Credit you in release notes (if desired)
3. Keep you informed of progress
4. Thank you publicly (if desired)

## Questions?

If you have questions about this security policy, please:

- Open a general discussion (not for vulnerabilities)
- Contact the maintainers
- Review the documentation

---

**Thank you for helping keep DolReal secure! 🔒**
