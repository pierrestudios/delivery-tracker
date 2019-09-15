export const getPickupDate = (dateStr, duration) => {
  const pickupDate = new Date(dateStr.split("-"));
  pickupDate.setDate(pickupDate.getDate() + duration);

  return formatDate(pickupDate);
};
export const formatTime = dateTime => {
  let h = dateTime.getHours();
  if (h > 12) {
    h = h - 12;
  }
  if (h === 0) {
    h = 12;
  }
  const m = makeTwoDigits(dateTime.getMinutes());
  const amPm = dateTime.getHours() > 11 ? "PM" : "AM";
  return h + ":" + m + " " + amPm;
};
export const formatDate = dateTime => {
  const y = dateTime.getFullYear();
  const m = dateTime.getMonth() + 1;
  const d = dateTime.getDate();
  return y + "-" + makeTwoDigits(m) + "-" + makeTwoDigits(d);
};
export const makeTwoDigits = n => {
  return n < 10 ? "0" + n : n;
};
export const getDurationOptionValue = durationLabel => {
  return durationLabel === "Week" ? 7 : durationLabel === "Weeks" ? 30 : 1;
};
export const getDurationOptions = duration => {
  const [count, label] = duration.split(" ");
  return {
    durationCount: count && parseInt(count),
    durationLabel: label.trim()
  };
};
export const makeSingularOrPlural = (label, count) => {
  return label.substring(label.length - 1, label.length) === "s" && count > 1
    ? label
    : count > 1
    ? label + "s"
    : label.substring(label.length - 1, label.length) === "s" && count === 1
    ? label.substring(0, label.length - 1)
    : label;
};
export const reservationBadgeConfig = {
  new: { color: "#529ef3", label: "Waiting for confirmation" },
  confirmed: { color: "#eb9e3e", label: "Reserved" },
  enRoute: { color: "#4dac4a", label: "Out for Delivery" },
  delivered: { color: "#0960ff", label: "Delivered" },
  canceled: { color: "#ccc", label: "Canceled" }
};
