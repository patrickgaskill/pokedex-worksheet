// @flow
import React from "react";
import { Container, Loader } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import firebase, { auth, provider } from "./firebase";
import TopMenu from "./TopMenu";
import PokedexTable from "./PokedexTable";
import type { Pokemon } from "./types";

type State = {
  user: any,
  loading: boolean,
  pokedex: Array<Pokemon>
};

class App extends React.Component<{}, State> {
  state = {
    user: null,
    loading: true,
    pokedex: []
  };

  async componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) this.setState({ user });
    });

    const pokedexQuery = firebase
      .firestore()
      .collection("pokedex")
      .where("active", "==", true)
      .orderBy("number");

    const pokedex = [];
    const snapshot = await pokedexQuery.get();
    snapshot.forEach(doc => {
      pokedex.push({ id: doc.id, ...doc.data() });
    });
    this.setState({ pokedex, loading: false });
  }

  login = async () => {
    const result = await auth.signInWithPopup(provider);
    this.setState({ user: result.user });
  };

  logout = async () => {
    await auth.signOut();
    this.setState({ user: null });
  };

  render() {
    const { user, loading, pokedex } = this.state;
    return (
      <div>
        <TopMenu
          user={user}
          onLoginClick={this.login}
          onLogoutClick={this.logout}
        />
        <Container>
          <Loader active={loading}>Loading</Loader>
          {!loading && <PokedexTable pokedex={pokedex} />}
        </Container>
      </div>
    );
  }
}

export default App;
