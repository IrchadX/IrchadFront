export const hexToRgb = (hex: string): string => {
  // Remove the '#' if it exists
  hex = hex.replace(/^#/, "");
  // Parse the hex color
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `${r}, ${g}, ${b}`;
};
