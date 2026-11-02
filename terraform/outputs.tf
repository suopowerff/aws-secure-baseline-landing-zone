output "kms_key_id" {
  description = "Customer Managed KMS Key ID"
  value       = aws_kms_key.baseline.key_id
}

output "cloudtrail_name" {
  description = "Name of the baseline CloudTrail"
  value       = aws_cloudtrail.baseline.name
}

output "guardduty_detector_id" {
  description = "GuardDuty Detector ID"
  value       = aws_guardduty_detector.primary.id
}

output "scp_policy_id" {
  description = "AWS Organizations EU Region Lock SCP ID"
  value       = aws_organizations_policy.eu_region_lock.id
}

output "audit_bucket_name" {
  description = "S3 Bucket storing encrypted CloudTrail logs"
  value       = aws_s3_bucket.audit_logs.id
}
