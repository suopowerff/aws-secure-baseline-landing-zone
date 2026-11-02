variable "project_name" {
  description = "Prefix for baseline security resources"
  type        = string
  default     = "sec-baseline"
}

variable "primary_region" {
  description = "Primary EU AWS Region for landing zone deployment"
  type        = string
  default     = "eu-west-1" # Ireland
}

variable "allowed_eu_regions" {
  description = "List of approved EU regions allowed by the AWS Organizations SCP"
  type        = list(string)
  default = [
    "eu-central-1", # Frankfurt
    "eu-central-2", # Zurich
    "eu-west-1",    # Ireland
    "eu-west-2",    # London
    "eu-west-3",    # Paris
    "eu-north-1",   # Stockholm
    "eu-south-1",   # Milan
    "eu-south-2"    # Spain
  ]
}

variable "target_ou_id" {
  description = "Optional: AWS Organizations Root ID or OU ID to attach the EU Region Lock SCP. Leave empty to create the Organization automatically."
  type        = string
  default     = ""
}
