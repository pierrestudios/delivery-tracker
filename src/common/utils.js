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

export const formatPhone = numberString => {
  const digits = numberString.replace(/\D/g, "");
  const totalNumber = 10;

  if (digits.length < totalNumber) {
    return digits;
  }

  const formattedNumberString =
    digits.length > totalNumber ? digits.slice(0, totalNumber) : digits;

  // const numberString2 = numberString.replace(/\D/g, "");
  const segmentedNumberString = formattedNumberString.match(
    /^(\d{3})(\d{3})(\d{4})$/
  );

  return !segmentedNumberString
    ? ""
    : "(" +
        segmentedNumberString[1] +
        ") " +
        segmentedNumberString[2] +
        "-" +
        segmentedNumberString[3];
};

export const validEmail = email => {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
};

export const getFirstAndLastName = name => {
  const [firstName, ...savedLastNameAndSuffix] = (name || "").split(" ");

  return {
    firstName,
    lastName: savedLastNameAndSuffix ? savedLastNameAndSuffix.join(" ") : ""
  };
};
