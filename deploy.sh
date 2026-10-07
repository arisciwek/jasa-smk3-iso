#!/bin/bash
# Deploy script for jasa-smk3-iso
# Builds the Astro site and syncs to production

set -e

echo "Building Astro site..."
npm run build

echo "Syncing to production..."
rsync -av --delete dist/ /www/wwwroot/situs-smk3-iso.lan/

echo "Deployment complete!"
