// @flow
import React from "react";
import { Menu, Container, Image, Button } from "semantic-ui-react";

type Props = {
  user: any,
  onLoginClick: () => Promise<void>,
  onLogoutClick: () => Promise<void>
};

export default class TopMenu extends React.Component<Props> {
  render() {
    const { user, onLoginClick, onLogoutClick } = this.props;
    return (
      <Menu borderless>
        <Container>
          <Menu.Item header>Pokédex Worksheet</Menu.Item>
          {user && (
            <Menu.Item position="right">
              <Image src={user.photoURL} avatar /> {user.displayName}
            </Menu.Item>
          )}
          <Menu.Item position={user ? "" : "right"}>
            <Button
              primary={true}
              onClick={user ? onLogoutClick : onLoginClick}
            >
              {user ? "Sign out" : "Sign in to save your progress"}
            </Button>
          </Menu.Item>
        </Container>
      </Menu>
    );
  }
}
