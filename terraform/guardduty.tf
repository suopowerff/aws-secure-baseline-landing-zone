resource "aws_guardduty_detector" "primary" {
  enable                       = true
  finding_publishing_frequency = "FIFTEEN_MINUTES"
}

resource "aws_guardduty_detector_feature" "s3_protection" {
  detector_id = aws_guardduty_detector.primary.id
  name        = "S3_DATA_EVENTS"
  status      = "ENABLED"
}

resource "aws_guardduty_detector_feature" "ebs_malware" {
  detector_id = aws_guardduty_detector.primary.id
  name        = "EBS_MALWARE_PROTECTION"
  status      = "ENABLED"
}

resource "aws_guardduty_detector_feature" "eks_audit_logs" {
  detector_id = aws_guardduty_detector.primary.id
  name        = "EKS_AUDIT_LOGS"
  status      = "ENABLED"
}
