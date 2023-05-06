import React, { useState } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

const SignInButtons = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSignIn = () => {
    setLoggedIn(true);
  };

  const handleSignOut = () => {
    setLoggedIn(false);
  };

  return loggedIn ? (
    <ButtonGroup>
      <Button onClick={handleSignOut}>Sign Out</Button>
      <Button>User Profile</Button>
    </ButtonGroup>
  ) : (
    <Button onClick={handleSignIn}>Sign In</Button>
  );
};

export default SignInButtons;