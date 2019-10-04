export const getPickupDate = (dateStr, duration) => {
  const pickupDate = new Date(dateStr.split("-"));
  pickupDate.setDate(pickupDate.getDate() + duration);

  return formatDate(pickupDate);
};
export const formatTime = dateTime => {
  let hours = dateTime.getHours();
  if (hours > 12) {
    hours = hours - 12;
  }
  if (hours === 0) {
    hours = 12;
  }
  const minutes = makeTwoDigits(dateTime.getMinutes());
  const amPm = dateTime.getHours() > 11 ? "PM" : "AM";

  return hours + ":" + minutes + " " + amPm;
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
  new: { color: "info", label: "Waiting for Confirmation" },
  confirmed: { color: "danger", label: "Reservation Confirmed" },
  enRoute: { color: "success", label: "Out for Delivery" },
  delivered: { color: "primary", label: "Delivered" },
  canceled: { color: "secondary", label: "Canceled" }
};
export const reservationTrackingSteps = [
  { status: "confirmed", label: "Confirmed" },
  { status: "enRoute", label: "Out for Delivery" },
  { status: "delivered", label: "Delivered" }
];
export const getStatusBadgeColor = (status = "new") => {
  return reservationBadgeConfig[status].color;
};
export const getStatusBadgeLabel = (status = "new") => {
  return reservationBadgeConfig[status].label;
};
export const generateTimeOptions = (step = 30, startTitme = "8:00") => {
  function addStepToTime(step, time) {
    const [hour, min] = time.split(":").map(t => parseInt(t));
    if (min + step >= minutesInHour) {
      return [hour + 1, "00"].join(":");
    }
    return [hour, min + step].join(":");
  }
  const timeOptions = [];
  const minutesInHour = 60;
  const hoursInADay = 12;
  const length = (minutesInHour / step) * hoursInADay;
  let entry = startTitme;
  for (let t = 0; t < length; t++) {
    entry = t === 0 ? entry : addStepToTime(step, entry);
    const entryDateTime = new Date();
    const [entryHours, entryMinutes] = entry.split(":");
    entryDateTime.setHours(entryHours);
    entryDateTime.setMinutes(entryMinutes);
    timeOptions.push(formatTime(entryDateTime));
  }

  return timeOptions.map(t => ({
    label: t,
    value: t
  }));
};
export const formatPhone = entry => {
  const digits = entry.replace(/\D/g, "");
  const totalDigitsForUSA = 10;

  if (digits.length < totalDigitsForUSA) {
    return digits;
  }

  const phoneNumber =
    digits.length > totalDigitsForUSA
      ? digits.slice(0, totalDigitsForUSA)
      : digits;

  const formattedPhoneNumber = phoneNumber.match(/^(\d{3})(\d{3})(\d{4})$/);

  return !formattedPhoneNumber
    ? ""
    : "(" +
        formattedPhoneNumber[1] +
        ") " +
        formattedPhoneNumber[2] +
        "-" +
        formattedPhoneNumber[3];
};
export const isValidEmail = email => {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
};
export const getFirstAndLastName = name => {
  const [firstName, ...lastNameAndSuffix] = (name || "").split(" ");

  return {
    firstName,
    lastName: lastNameAndSuffix ? lastNameAndSuffix.join(" ") : ""
  };
};
