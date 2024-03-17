export function formatTimestampToIST(timestamp: number) {
  const date = new Date(timestamp); // Convert timestamp to Date object

  // Adjust date and time to Indian Standard Time (IST)
  const options = {
    timeZone: 'Asia/Kolkata', // Set time zone to Indian Standard Time
    hour12: false, // Use 24-hour format
  };

  // Extract time components
  const hours = date
    .toLocaleString('en-US', { ...options, hour: 'numeric' })
    .padStart(2, '0');
  const minutes = date
    .toLocaleString('en-US', { ...options, minute: 'numeric' })
    .padStart(2, '0');
  const seconds = date
    .toLocaleString('en-US', { ...options, second: 'numeric' })
    .padStart(2, '0');

  // Extract date components
  const day = date
    .toLocaleString('en-US', { ...options, day: 'numeric' })
    .padStart(2, '0');
  const month = date
    .toLocaleString('en-US', { ...options, month: 'numeric' })
    .padStart(2, '0');
  const year = date.toLocaleString('en-US', { ...options, year: 'numeric' });

  // Construct and return formatted string
  return `Time: ${hours}:${minutes}:${seconds}  // Date: ${day}/${month}/${year}`;
}
