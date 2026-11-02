resource "aws_kms_key" "baseline" {
  description             = "Master KMS Key for CloudTrail, S3 Audit Logs, and GuardDuty"
  deletion_window_in_days = 30
  enable_key_rotation     = true
  multi_region            = false

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "EnableIAMUserPermissions"
        Effect = "Allow"
        Principal = {
          AWS = "arn:${data.aws_partition.current.partition}:iam::${data.aws_caller_identity.current.account_id}:root"
        }
        Action   = "kms:*"
        Resource = "*"
      },
      {
        Sid    = "AllowCloudTrailEncryptLogs"
        Effect = "Allow"
        Principal = {
          Service = "cloudtrail.amazonaws.com"
        }
        Action = [
          "kms:GenerateDataKey*",
          "kms:Decrypt"
        ]
        Resource = "*"
        Condition = {
          StringLike = {
            "kms:EncryptionContext:aws:cloudtrail:arn" = "arn:${data.aws_partition.current.partition}:cloudtrail:*:${data.aws_caller_identity.current.account_id}:trail/*"
          }
        }
      },
      {
        Sid    = "AllowCloudWatchLogsEncryption"
        Effect = "Allow"
        Principal = {
          Service = "logs.${var.primary_region}.amazonaws.com"
        }
        Action = [
          "kms:Encrypt*",
          "kms:Decrypt*",
          "kms:ReEncrypt*",
          "kms:GenerateDataKey*",
          "kms:Describe*"
        ]
        Resource = "*"
      }
    ]
  })
}

resource "aws_kms_alias" "baseline" {
  name          = "alias/${var.project_name}-cmk"
  target_key_id = aws_kms_key.baseline.key_id
}
