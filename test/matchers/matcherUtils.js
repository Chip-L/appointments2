export const stripTerminalColor = (text) => text.replace(/\x1B\[\d+m/g, "");
