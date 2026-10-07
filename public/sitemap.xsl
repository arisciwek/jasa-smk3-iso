<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
	xmlns:html="http://www.w3.org/TR/REC-html40"
	xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
	xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
	<xsl:template match="/">
		<html xmlns="http://www.w3.org/1999/xhtml">
		<head>
			<title>XML Sitemap — SMK3 &amp; ISO 45001 Indonesia</title>
			<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
			<style type="text/css">
				body {
					font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
					font-size: 14px;
					color: #d0d6e0;
					background: #0d0e10;
					margin: 0;
					padding: 2rem 1rem;
				}
				#content {
					margin: 0 auto;
					max-width: 960px;
					background: #141519;
					border-radius: 8px;
					border: 1px solid rgba(255,255,255,0.08);
					padding: 1.5rem 2rem;
				}
				h1 {
					font-size: 1.25rem;
					color: #10b981;
					border-bottom: 2px solid rgba(255,255,255,0.08);
					padding-bottom: .4rem;
					margin: 0 0 .5rem;
					font-family: monospace;
				}
				.expl {
					margin: .5rem 0 1.25rem;
					line-height: 1.4;
					color: #8a8f98;
					font-size: .85rem;
				}
				table {
					width: 100%;
					border: none;
					border-collapse: collapse;
				}
				th {
					text-align: left;
					font-size: .8rem;
					text-transform: uppercase;
					letter-spacing: .05em;
					color: #8a8f98;
					border-bottom: 2px solid rgba(255,255,255,0.08);
					padding: .5rem .6rem;
				}
				td {
					padding: .55rem .6rem;
					border-bottom: 1px solid rgba(255,255,255,0.05);
				}
				#sitemap tbody tr:hover td {
					background-color: rgba(255,255,255,0.02);
				}
				a {
					color: #10b981;
					text-decoration: none;
					font-weight: 500;
				}
				a:hover { text-decoration: underline; }
				.lastmod {
					color: #62666d;
					font-size: .8rem;
					white-space: nowrap;
					font-family: monospace;
				}
				.footer {
					margin-top: 1.25rem;
					font-size: .75rem;
					color: #62666d;
					text-align: center;
					font-family: monospace;
				}
			</style>
		</head>
		<body>
			<div id="content">
				<h1>XML SITEMAP</h1>
				<p class="expl">
					Ini adalah XML sitemap untuk <a href="/">SMK3 &amp; ISO 45001 Indonesia</a>.
					Dibuat otomatis untuk optimasi mesin pencari (SEO). Jumlah URL:
					<xsl:value-of select="count(sitemap:urlset/sitemap:url)" />.
				</p>
				<table id="sitemap" cellpadding="3">
					<thead>
						<tr>
							<th width="75%">URL</th>
							<th>TERAKHIR DIPERBARUI</th>
						</tr>
					</thead>
					<tbody>
						<xsl:for-each select="sitemap:urlset/sitemap:url">
							<xsl:sort select="sitemap:lastmod" order="descending" data-type="text"/>
							<tr>
								<td>
									<xsl:variable name="loc"><xsl:value-of select="sitemap:loc"/></xsl:variable>
									<a href="{$loc}"><xsl:value-of select="sitemap:loc"/></a>
								</td>
								<td class="lastmod"><xsl:value-of select="sitemap:lastmod"/></td>
							</tr>
						</xsl:for-each>
					</tbody>
				</table>
				<p class="footer">PT KONSULTAN K3 UTAMA // CONFIG: TEXTMODE_DARK</p>
			</div>
		</body>
		</html>
	</xsl:template>
</xsl:stylesheet>