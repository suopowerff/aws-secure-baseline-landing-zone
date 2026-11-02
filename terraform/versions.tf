terraform {
  required_version = ">= 1.5.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.primary_region

  default_tags {
    tags = {
      Project     = var.project_name
      ManagedBy   = "Terraform"
      Compliance  = "GDPR-EU-Data-Residency"
      Environment = "Security-Baseline"
    }
  }
}

data "aws_caller_identity" "current" {}
data "aws_partition" "current" {}