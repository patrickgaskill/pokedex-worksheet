// @flow
import React from "react";
import { Menu, Container, Responsive, Image, Button } from "semantic-ui-react";

type Props = {
  user: any,
  onLoginClick: () => Promise<void>,
  onLogoutClick: () => Promise<void>
};

export default class TopMenu extends React.Component<Props> {
  renderSignedOut = () => (
    <Menu.Item position={"right"}>
      <Button primary={true} onClick={this.props.onLoginClick}>
        Sign in to save your progress
      </Button>
    </Menu.Item>
  );

  renderSignedIn = () => {
    const { user, onLogoutClick } = this.props;
    return [
      <Menu.Item key={0} position="right">
        <Responsive {...Responsive.onlyMobile}>
          <Image src={user.photoURL} avatar />
        </Responsive>
        <Responsive minWidth={Responsive.onlyTablet.minWidth}>
          <Image src={user.photoURL} avatar /> {user.displayName}
        </Responsive>
      </Menu.Item>,
      <Menu.Item key={1}>
        <Button primary={true} onClick={onLogoutClick}>
          Sign out
        </Button>
      </Menu.Item>
    ];
  };

  render() {
    const { user } = this.props;
    return (
      <Menu borderless>
        <Container>
          <Menu.Item header>Pokédex Worksheet</Menu.Item>
          {user ? this.renderSignedIn() : this.renderSignedOut()}
        </Container>
      </Menu>
    );
  }
}