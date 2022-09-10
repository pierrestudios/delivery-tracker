import React from "react";
import { Button, Form } from "tabler-react";

function LoginForm({ loginData, sendLogin, setLoginData }) {
  const { email = "", password = "", error } = loginData;

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
            setLoginData({
              ...loginData,
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
          value={password}
          onChange={(e) => {
            setLoginData({
              ...loginData,
              password: e.target.value,
              error: "",
            });
          }}
        />
      </div>
      <div className="mt-4 mb-4">
        <Form.Switch
          onChange={() => false}
          value="1"
          checked={true}
          label="Save Login"
        />
      </div>

      <Button
        color="info"
        type="button"
        disabled={!email || !password}
        className="mt-5 w-100"
        onClick={sendLogin}
      >
        <span>Sign In</span>
      </Button>
    </Form>
  );
}

export default LoginForm;
