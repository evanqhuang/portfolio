# Auto-discover the Cloudflare account ID from the API token
data "cloudflare_accounts" "main" {}

locals {
  account_id = data.cloudflare_accounts.main.result[0].id
  zone_id    = data.cloudflare_zones.site.result[0].id
}

# Look up the existing Cloudflare zone for the domain
data "cloudflare_zones" "site" {
  account = {
    id = local.account_id
  }
  name = var.domain
}

# Create CNAME record for apex domain pointing to GitHub Pages
resource "cloudflare_dns_record" "apex" {
  zone_id = local.zone_id
  name    = "@"
  type    = "CNAME"
  content = "${var.github_username}.github.io"
  ttl     = 1
  proxied = true
  comment = "Apex domain for GitHub Pages"
}

# Create CNAME record for www subdomain pointing to GitHub Pages
resource "cloudflare_dns_record" "www" {
  zone_id = local.zone_id
  name    = "www"
  type    = "CNAME"
  content = "${var.github_username}.github.io"
  ttl     = 1
  proxied = true
  comment = "WWW subdomain for GitHub Pages"
}
