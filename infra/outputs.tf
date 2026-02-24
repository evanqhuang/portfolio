output "github_pages_url" {
  description = "The GitHub Pages URL"
  value       = "https://${var.github_username}.github.io"
}

output "custom_domain" {
  description = "The custom domain URL"
  value       = "https://${var.domain}"
}

output "www_domain" {
  description = "The WWW subdomain URL"
  value       = "https://www.${var.domain}"
}

output "zone_id" {
  description = "The Cloudflare zone ID"
  value       = local.zone_id
}
