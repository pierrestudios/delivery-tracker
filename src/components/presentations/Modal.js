import React from "react";
import { Button } from "tabler-react";

export default ({ show, title, bodyContent, actions = [], handleClose }) => {
  return (
    <>
      <div
        className={`modal fade ${show ? "show" : ""}`}
        style={{ display: show ? "block" : "none" }}
        tabIndex="-1"
        role="dialog"
      >
        <div
          className="modal-dialog modal-lg modal-dialog-centered"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">{title}</h4>
              <Button
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={handleClose}
              ></Button>
            </div>
            <div className="modal-body">{bodyContent}</div>
            <div className="modal-footer">
              {actions.length
                ? actions.map(a => (
                    <Button color={a.color} onClick={a.onClick}>
                      {a.label}
                    </Button>
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>
      <div
        className={`modal-backdrop fade ${show ? "show" : ""}`}
        style={{ display: show ? "block" : "none" }}
      ></div>
    </>
  );
};
