import React from "react";
import { List, Form } from "tabler-react";

export default ({
  selectedValue,
  selectLabel,
  handleChange,
  display = true,
  data
}) => {
  return (
    <div
      style={{
        flex: 1,
        display: display ? "block" : "none"
      }}
    >
      <List.Group>
        <List.GroupItem>
          <strong
            style={
              selectedValue
                ? {
                    textAlign: "left",
                    fontWeight: "400",
                    color: "#999"
                  }
                : { marginBottom: 10 }
            }
          >
            {selectedValue
              ? `Selected ${selectLabel}`
              : `Select ${selectLabel}`}
          </strong>
        </List.GroupItem>
        <List.GroupItem
          style={{
            marginBottom: 10,
            width: "90%"
            // borderColor: "red", borderWidth: 1
          }}
        >
          <Form.Select
            defaultValue={selectedValue}
            onChange={e => {
              handleChange(e.target.value);
            }}
          >
            <option value="">{`Select ${selectLabel}`}</option>
            {data.map(({ name, key }) => (
              <option label={name} value={key} key={key} />
            ))}
          </Form.Select>
        </List.GroupItem>
      </List.Group>
    </div>
  );
};
