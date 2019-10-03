import {
  getPickupDate,
  formatDate,
  formatTime,
  formatPhone,
  isValidEmail,
  getFirstAndLastName
} from "./utils";

describe("Test Utils functions", () => {
  it("getPickupDate() returns correct Pickup Date", () => {
    const duration6days = 6;
    const deliveryDateStr = "2019-10-03";
    const pickupDate6days = getPickupDate(deliveryDateStr, duration6days);

    expect(pickupDate6days).toEqual("2019-10-09");

    const duration43days = 43;
    const pickupDate43days = getPickupDate(deliveryDateStr, duration43days);

    expect(pickupDate43days).toEqual("2019-11-15");
  });

  it("formatDate() returns correctly formatted date", () => {
    expect(formatDate(new Date(2019, 9, 3))).toEqual("2019-10-03");
    expect(formatDate(new Date(2019, 10, 12))).toEqual("2019-11-12");
  });

  it("formatTime() returns correct time", () => {
    const time1230 = new Date("2019-10-03 12:30 pm");
    const formattedTime1230 = formatTime(time1230);

    expect(formattedTime1230).toEqual("12:30 PM");

    const time237 = new Date("2019-10-03 2:37 am");
    const formattedTime237 = formatTime(time237);

    expect(formattedTime237).toEqual("2:37 AM");
  });

  it("formatPhone() return correctly formatted phone", () => {
    expect(formatPhone("2309409845")).toEqual("(230) 940-9845");

    expect(formatPhone("230940984ff5d")).toEqual("(230) 940-9845");

    expect(formatPhone("230940984")).toEqual("230940984");
  });

  it("isValidEmail() checks email properly", () => {
    expect(isValidEmail("name@domain.com")).toEqual(true);

    expect(isValidEmail("name@domaincom")).toEqual(false);

    expect(isValidEmail("namedomain.com")).toEqual(false);
  });

  it("getFirstAndLastName() outputs names properly", () => {
    expect(getFirstAndLastName("John Doe")).toEqual({
      firstName: "John",
      lastName: "Doe"
    });

    expect(getFirstAndLastName("John Doe Jr II")).toEqual({
      firstName: "John",
      lastName: "Doe Jr II"
    });
  });
});
