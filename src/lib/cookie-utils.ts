export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') {
    return null;
  }
  const match = document.cookie.match(
    new RegExp('(?:^|; )' + encodeURIComponent(name) + '=([^;]*)')
  );
  return match ? decodeURIComponent(match[1]) : null;
}

export function getUniversityId(): string | null {
  return getCookie('universityId');
}
