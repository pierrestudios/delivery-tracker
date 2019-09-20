import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
import { Icon, Form, Button, Alert, Header } from "tabler-react";
import PlacesAutocomplete from "react-places-autocomplete";

import "react-datepicker/dist/react-datepicker.css";

import {
  formatTime,
  formatDate,
  getDurationOptions,
  generateTimeOptions,
  makeSingularOrPlural
} from "../../common/utils";

function updateOptionDuration(
  { heading: newOption, price },
  duration,
  updateDuration
) {
  const { durationLabel: currentDurationOptionsLabel } = getDurationOptions(
    duration,
    "duration"
  );
  const { durationLabel: selectedDurationOptionsLabel } = getDurationOptions(
    newOption,
    "newOption"
  );
  const optionIsChanged =
    currentDurationOptionsLabel !== selectedDurationOptionsLabel;
  console.log("updateOptionDuration", {
    newOption,
    optionIsChanged,
    duration
  });

  if (optionIsChanged) {
    // console.log("updateDuration()", { newOption, updateDuration });
    updateDuration(newOption);
  }
}

function setDurationValue(label, value) {
  const durationLabel = makeSingularOrPlural(label, value);
  return value + " " + durationLabel;
}

export default ({
  isLoggedIn,
  currentReservation,
  updateCurrentReservation,
  submitReservation
}) => {
  const {
    productId,
    deliverySource,
    deliveryAddress,
    selectedDuration,
    selectedPriceOption
  } = currentReservation;

  // console.log({ currentReservation });

  if (!selectedPriceOption) {
    return <div />;
  }

  const { heading, price: reservationPrice } = selectedPriceOption;
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [errorFields, setErrorFields] = useState({});
  const renderField = ({ label, disabled, error, icon, ...props }) => {
    if (
      props.type === "date" ||
      props.type === "time" ||
      props.type === "duration" ||
      props.type === "addressAutoComplete"
    ) {
      return (
        <>
          <label>{label}</label>
          {getFieldByType({ ...props, label, disabled, error, icon })}
        </>
      );
    }

    return (
      <div {...{ error, disabled }}>
        <label>{label}</label>
        {getFieldByType(props)}
        {icon ? (
          <Icon
            name={icon}
            style={[
              {
                color: "#007bff"
              },
              { ...(error ? { color: "red" } : null) }
            ]}
          />
        ) : null}
      </div>
    );
  };
  const getFieldByType = (
    { type, name, value, label, error, update },
    ...addlProps
  ) => {
    // console.log({ type, name, value, error, update });

    const d = new Date();
    const today = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);
    const hour = 0;
    const minute = 0;
    const sixMoFromToday = new Date(
      d.getFullYear(),
      d.getMonth() + 3,
      d.getDate(),
      hour,
      minute
    );
    switch (type) {
      case "addressAutoComplete":
        return (
          <PlacesAutocomplete
            value={value || ""}
            onChange={entry => {
              update({ target: { value: entry } });
            }}
          >
            {({ getInputProps, getSuggestionItemProps, suggestions }) => (
              <div className="autocomplete-root">
                <input
                  className={`form-control min-w-200px ${
                    error ? "error-input" : ""
                  }`}
                  placeholder={label}
                  {...getInputProps()}
                />
                <div className="autocomplete-dropdown-container">
                  <ul className="list-group">
                    {suggestions.map(suggestion => (
                      <li
                        className="list-group-item pointer"
                        {...getSuggestionItemProps(suggestion)}
                      >
                        <span>{suggestion.description}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </PlacesAutocomplete>
        );

      case "date":
        return getDateTimeField({
          today,
          value,
          error,
          handleChange: date => {
            update({ target: { value: date } });
          },
          sixMoFromToday,
          placeHolderText: "Select date",
          formatChosenDate: formatDate
        });

      case "time":
        return getDateTimeField({
          today,
          value,
          error,
          handleChange: time => {
            update({ target: { value: time } });
          },
          sixMoFromToday,
          mode: "time",
          placeHolderText: "Select time",
          formatChosenDate: formatTime
        });

      case "duration":
        return getDurationField({
          type,
          name,
          value,
          label,
          error,
          update,
          addlProps
        });

      default:
        return (
          <Form.Input
            name={name}
            value={value}
            type={type}
            onChange={update}
            className={`${error ? "error-input" : ""}`}
            {...addlProps}
          />
        );
    }
  };
  const getDateTimeField = ({
    today,
    value,
    error,
    mode = "date",
    handleChange,
    sixMoFromToday,
    placeHolderText
    // formatChosenDate
  }) => {
    return mode === "date" ? (
      <DatePicker
        className={`form-control min-w-200px ${error ? "error-input" : ""}`}
        wrapperClassName="react-datepicker-wrapper d-table mb-3"
        minDate={today}
        maxDate={sixMoFromToday}
        placeholderText={placeHolderText}
        selected={value || ""}
        onChange={handleChange}
      />
    ) : (
      <div className="d-table mb-3">
        <Form.Select
          className={`min-w-200px ${error ? "error-input" : ""}`}
          defaultValue={value}
          onChange={e => {
            handleChange(e.target.value);
          }}
        >
          <option value="">{placeHolderText}</option>
          {generateTimeOptions().map(({ label, value }) => (
            <option label={label} value={value} key={value} />
          ))}
        </Form.Select>
      </div>
    );
  };
  const getDurationField = ({
    name,
    value,
    type,
    label,
    update,
    disabled,
    error,
    addlProps
  }) => {
    const [durationCount, durationLabel] = value && value.split(" ");
    const durationLimit = 30;
    let durationValue = parseInt(durationCount);

    return (
      <div className="d-flex mb-3">
        <div
          {...{
            error,
            label,
            disabled
          }}
          className="mr-2"
        >
          <Form.Input
            className="min-w-200px"
            readOnly
            name={name}
            value={value}
            type={type}
            {...addlProps}
          />
        </div>

        <Button
          color="secondary"
          onClick={() => {
            durationValue = durationValue - 1 || 1;

            update({
              target: {
                value: setDurationValue(durationLabel, durationValue)
              }
            });
          }}
        >
          <Icon name="minus" />
        </Button>
        <Button
          color="secondary"
          onClick={() => {
            durationValue =
              durationValue + 1 >= durationLimit
                ? durationLimit
                : durationValue + 1;

            update({
              target: {
                value: setDurationValue(durationLabel, durationValue)
              }
            });
          }}
        >
          <Icon name="plus" />
        </Button>
      </div>
    );
  };
  const validate = values => {
    const errors = {};
    errors.duration = !values.duration
      ? "Duration option is required"
      : undefined;

    errors.deliveryDate = !values.deliveryDate
      ? "Delivery Date is required"
      : undefined;

    errors.deliveryTime = !values.deliveryTime
      ? "Delivery Time is required"
      : undefined;

    errors.deliveryAddress = !values.deliveryAddress
      ? "Delivery Address is required"
      : undefined;

    return errors;
  };
  const hasErrors = errors => {
    const errorsArr = Object.keys(errors).filter(e => !!errors[e]);
    return errorsArr && !!errorsArr.length;
  };
  const saveReservation = () => {
    const errors = validate({
      duration: selectedDuration,
      deliveryDate,
      deliveryTime,
      deliveryAddress
    });

    if (hasErrors(errors)) {
      setErrorFields(errors);

      return;
    }

    submitReservation({
      date: formatDate(new Date()),
      deliveryDate: formatDate(deliveryDate),
      deliveryTime,
      duration: selectedDuration,
      deliveryAddress,
      deliverySource,
      reservationPrice,
      productId: productId
    });
  };

  useEffect(() => {
    updateOptionDuration(selectedPriceOption, selectedDuration, value =>
      updateCurrentReservation({ selectedDuration: value })
    );
  }, [selectedPriceOption]);

  return (
    <div id="reserve-form" className="w-100 border-top mt-5 pt-5">
      {renderField({
        label: "Duration",
        value: selectedDuration,
        type: "duration",
        disabled: true,
        update: e => {
          updateCurrentReservation({ selectedDuration: e.target.value });
          e.target.value &&
            setErrorFields({ ...errorFields, selectedDuration: "" });
        }
      })}

      {renderField({
        label: "Delivery Date",
        value: deliveryDate,
        type: "date",
        error: errorFields.deliveryDate,
        update: e => {
          setDeliveryDate(e.target.value);
          e.target.value &&
            setErrorFields({ ...errorFields, deliveryDate: "" });
        }
      })}

      {renderField({
        label: "Delivery Time",
        value: deliveryTime,
        type: "time",
        error: errorFields.deliveryTime,
        update: e => {
          setDeliveryTime(e.target.value);
          e.target.value &&
            setErrorFields({ ...errorFields, deliveryTime: "" });
        }
      })}

      {renderField({
        label: "Delivery Address",
        value: deliveryAddress,
        type: "addressAutoComplete",
        error: errorFields.deliveryAddress,
        update: e => {
          updateCurrentReservation({ deliveryAddress: e.target.value });
          e.target.value &&
            setErrorFields({ ...errorFields, deliveryAddress: "" });
        }
      })}

      {isLoggedIn ? (
        <Button
          color="success"
          onClick={saveReservation}
          className="mt-4 d-block"
        >
          <span className="font-weight-bold" style={{ fontSize: 14 }}>
            Submit Reservation
          </span>
        </Button>
      ) : (
        <Alert type="primary" className="mt-4 d-block">
          <Header.H4>Please Sign In</Header.H4>
          <p>Please sign in to complete reservation</p>
          <Button.List>
            <Link to="/login" className="btn btn-info">
              Sign in
            </Link>
            <span className="p-3 text-wrap">Or</span>
            <Link to="/signup" className="btn btn-info">
              Create an Account
            </Link>
          </Button.List>
        </Alert>
      )}
    </div>
  );
};
