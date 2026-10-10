/**
 * Date utilities - Store UTC, Display WIB
 * All dates stored as UTC ISO 8601 (YYYY-MM-DDTHH:mm:ssZ)
 * Display converts to Asia/Jakarta (WIB = UTC+7)
 */

export function toSitemapDate(utc: string): string {
  // YYYY-MM-DD for sitemap.xml
  return new Date(utc).toISOString().split('T')[0];
}

export function toJsonLdDate(utc: string): string {
  // Full ISO 8601 UTC for JSON-LD (datePublished, dateModified)
  return new Date(utc).toISOString();
}

export function toDisplayDate(utc: string, locale = 'id-ID'): string {
  // Human readable in WIB
  return new Date(utc).toLocaleString(locale, {
    timeZone: 'Asia/Jakarta',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  });
  // Output: "10 Oktober 2026, 14:30 WIB"
}

export function toDisplayDateShort(utc: string, locale = 'id-ID'): string {
  // Short format: "10 Okt 2026"
  return new Date(utc).toLocaleDateString(locale, {
    timeZone: 'Asia/Jakarta',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function toTimeAgo(utc: string, locale = 'id-ID'): string {
  // Relative time: "2 hari yang lalu"
  const diffMs = Date.now() - new Date(utc).getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diffMs / (1000 * 60));

  if (diffDays > 0) return `${diffDays} hari yang lalu`;
  if (diffHours > 0) return `${diffHours} jam yang lalu`;
  if (diffMinutes > 0) return `${diffMinutes} menit yang lalu`;
  return 'Baru saja';
}
