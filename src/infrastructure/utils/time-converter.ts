export function timeToMs(timeStr: string | undefined): number | null {
  if (!timeStr || typeof timeStr !== "string") {
    return null;
  }

  const parts = timeStr.split(".");
  const timePart = parts[0];
  const msPartStr = (parts[1] || "0").padEnd(3, "0");

  if (!timePart) {
    console.error(`Invalid time format (missing time part): '${timeStr}'`);
    return null;
  }

  const timeComponents = timePart.split(":").map(Number);

  if (timeComponents.length !== 3 || timeComponents.some(isNaN)) {
    console.error(
      `Invalid time format (HH:MM:SS part): '${timePart}' in '${timeStr}'`
    );
    return null;
  }

  const [hours, minutes, seconds] = timeComponents;
  const milliseconds = parseInt(msPartStr, 10);

  if (isNaN(milliseconds)) {
    console.error(`Invalid milliseconds part: '${msPartStr}' in '${timeStr}'`);
    return null;
  }

  if (
    hours < 0 ||
    hours > 23 ||
    minutes < 0 ||
    minutes > 59 ||
    seconds < 0 ||
    seconds > 59 ||
    milliseconds < 0 ||
    milliseconds > 999
  ) {
    console.error(`Time component out of range in '${timeStr}'`);
    return null;
  }

  return (hours * 3600 + minutes * 60 + seconds) * 1000 + milliseconds;
}
