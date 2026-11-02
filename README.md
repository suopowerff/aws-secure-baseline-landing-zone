# aws-secure-baseline-landing-zone
# Secure AWS Baseline Landing Zone & Posture Dashboard

An enterprise-grade, Infrastructure-as-Code (Terraform) AWS Landing Zone designed for European data residency (GDPR) and CIS AWS Foundations compliance, paired with a real-time Next.js Security Posture Status Page.

---
## Architecture & Security Controls

* **Preventative Guardrails (AWS Organizations SCP):** 
  * Enforces an EU-only data residency boundary (`eu-west-*`, `eu-central-*`, `eu-north-1`, `eu-south-*`) using `aws:RequestedRegion` conditions.
  * Safely exempts global control-plane services (`IAM`, `Route 53`, `CloudFront`, `Support`) via `NotAction` to prevent account-level lockouts.
  * Explicitly blocks member accounts from deleting or tampering with `CloudTrail` and `GuardDuty`.
* **Detective Controls (CloudTrail & GuardDuty):**
  * Multi-region CloudTrail with SHA-256 log file integrity validation stored in a hardened S3 bucket featuring public access blocking, TLS-only enforcement, and KMS server-side encryption.
  * Continuous threat detection via Amazon GuardDuty (including S3 Data Events, EKS Audit Logs, and EBS Malware Protection).
* **Cryptographic Baseline (AWS KMS):**
  * Customer-Managed Key (CMK) configured with mandatory 365-day automated key rotation and least-privilege key policies.
* **Security Posture Dashboard (Next.js 14):**
  * Built with Next.js 14 (App Router) and Tailwind CSS.
  * Features a flexible dual-mode backend that supports both a **Live AWS SDK Mode** (for production environments with IAM credentials) and a **Zero-Credential Simulation Mode** (`NEXT_PUBLIC_DEMO_MODE=true`) for local previews reviews without incurring cloud costs.

### 1. Run the Next.js Posture Dashboard (Simulation Mode)
```bash
cd status-dashboard
npm install
npm run dev
