import React from "react";
import { Button, Form } from "tabler-react";

function SignupForm({ signupData, sendSignup, setSignupData }) {
  const { email = "", password = "", passwordConfirm = "", error } = signupData;

  return (
    <Form>
      {error ? <span className="text-danger">{error}</span> : null}
      <div className="mt-4 mb-4">
        <Form.Label>Enter your Email</Form.Label>
        <Form.Input
          name="email"
          icon="mail"
          position="append"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setSignupData({
              ...signupData,
              email: e.target.value,
              error: "",
            });
          }}
        />
      </div>
      <div className="mt-4 mb-4">
        <Form.Label>Enter your Password</Form.Label>
        <Form.Input
          name="password"
          type="password"
          icon="lock"
          position="append"
          placeholder="Password"
          defaultValue={password}
          onChange={(e) => {
            setSignupData({
              ...signupData,
              password: e.target.value,
              error: "",
            });
          }}
        />
      </div>
      <div className="mt-4 mb-4">
        <Form.Label>Confirm your Password</Form.Label>
        <Form.Input
          name="passwordConfirm"
          type="password"
          icon="lock"
          position="append"
          placeholder="Password"
          defaultValue={password}
          onChange={(e) => {
            setSignupData({
              ...signupData,
              passwordConfirm: e.target.value,
              error: "",
            });
          }}
        />
      </div>
      <Button
        color="info"
        type="button"
        disabled={!email || !password || !passwordConfirm}
        className="mt-5 w-100"
        onClick={sendSignup}
      >
        <span>Create Account</span>
      </Button>
    </Form>
  );
}

export default SignupForm;
