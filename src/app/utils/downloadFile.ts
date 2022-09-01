export function downloadFile(objectURL: string, filename: string): void {
  const link: HTMLAnchorElement = document.createElement('a');
  link.href = objectURL;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  link.remove();
}
