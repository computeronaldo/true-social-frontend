const calculateTimestamp = (timestamp) => {
  const now = new Date();
  const diffInMilliseconds = now - new Date(timestamp);
  const createdAt = new Date(timestamp);

  const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
  const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
  const diffInWeeks = Math.floor(
    diffInMilliseconds / (1000 * 60 * 60 * 24 * 7)
  );

  let timeSinceCreated;

  if (diffInWeeks > 4) {
    // Format the date as DD-MM-YYYY
    const day = String(createdAt.getDate()).padStart(2, "0");
    const month = String(createdAt.getMonth() + 1).padStart(2, "0"); // getMonth() is zero-based
    const year = createdAt.getFullYear();
    timeSinceCreated = `${day}-${month}-${year}`;
  } else if (diffInWeeks > 0) {
    timeSinceCreated = `${diffInWeeks} week${diffInWeeks > 1 ? "s" : ""} ago`;
  } else if (diffInDays > 0) {
    timeSinceCreated = `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  } else if (diffInHours > 0) {
    timeSinceCreated = `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
  } else {
    timeSinceCreated = `${diffInMinutes} minute${
      diffInMinutes > 1 ? "s" : ""
    } ago`;
  }

  return timeSinceCreated;
};

export default calculateTimestamp;
