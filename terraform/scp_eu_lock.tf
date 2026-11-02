resource "aws_organizations_organization" "org" {
  count = var.target_ou_id == "" ? 1 : 0

  feature_set          = "ALL"
  enabled_policy_types = ["SERVICE_CONTROL_POLICY"]

  aws_service_access_principals = [
    "cloudtrail.amazonaws.com",
    "guardduty.amazonaws.com"
  ]
}

locals {
  scp_target_id = var.target_ou_id != "" ? var.target_ou_id : aws_organizations_organization.org[0].roots[0].id
}

resource "aws_organizations_policy" "eu_region_lock" {
  name        = "${var.project_name}-eu-only-region-lock"
  description = "Enforces EU data residency by denying regional API actions outside approved European AWS regions."
  type        = "SERVICE_CONTROL_POLICY"

  content = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "DenyAllOutsideEURegions"
        Effect = "Deny"
        NotAction = [
          "a4b:*",
          "acm:*",
          "aws-marketplace-management:*",
          "aws-marketplace:*",
          "aws-portal:*",
          "budgets:*",
          "ce:*",
          "chime:*",
          "cloudfront:*",
          "config:*",
          "cur:*",
          "directconnect:*",
          "ec2:DescribeRegions",
          "ec2:DescribeTransitGateways",
          "ec2:DescribeVpnGateways",
          "fms:*",
          "globalaccelerator:*",
          "health:*",
          "iam:*",
          "importexport:*",
          "kms:*",
          "mobileanalytics:*",
          "networkmanager:*",
          "organizations:*",
          "pricing:*",
          "route53:*",
          "route53domains:*",
          "route53-recovery-cluster:*",
          "route53-recovery-control-config:*",
          "route53-recovery-readiness:*",
          "s3:GetAccountPublicAccessBlock",
          "s3:ListAllMyBuckets",
          "s3:PutAccountPublicAccessBlock",
          "shield:*",
          "sts:*",
          "support:*",
          "trustedadvisor:*",
          "waf-regional:*",
          "waf:*",
          "wafv2:*",
          "wellarchitected:*"
        ]
        Resource = "*"
        Condition = {
          StringNotEquals = {
            "aws:RequestedRegion" = var.allowed_eu_regions
          }
        }
      },
      {
        Sid    = "ProtectSecurityBaselineControls"
        Effect = "Deny"
        Action = [
          "cloudtrail:DeleteTrail",
          "cloudtrail:StopLogging",
          "guardduty:DeleteDetector",
          "guardduty:DisassociateFromMasterAccount"
        ]
        Resource = "*"
      }
    ]
  })
}

resource "aws_organizations_policy_attachment" "eu_lock_attach" {
  policy_id = aws_organizations_policy.eu_region_lock.id
  target_id = local.scp_target_id
}