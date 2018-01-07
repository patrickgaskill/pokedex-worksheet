// @flow
import React from "react";
import { Container, Loader } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { auth, provider, firestore } from "./firebase";
import TopMenu from "./TopMenu";
import PokedexTable from "./PokedexTable";
import type { Pokemon, Collection, Gender } from "./types";

type State = {
  user: any,
  loading: boolean,
  pokedex: Array<Pokemon>,
  collection: Collection
};

class App extends React.Component<{}, State> {
  state = {
    user: null,
    loading: true,
    pokedex: [],
    collection: {}
  };

  async componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
        firestore
          .collection("collections")
          .doc(user.uid)
          .collection("pokemon")
          .onSnapshot(snapshot => {
            const collection = {};
            snapshot.docChanges.forEach(change => {
              collection[change.doc.id] = change.doc.data();
            });

            this.setState(prevState => ({
              collection: {
                ...prevState.collection,
                ...collection
              }
            }));
          });
      }
    });

    const pokedex = [];
    const snapshot = await firestore
      .collection("pokedex")
      .where("active", "==", true)
      .orderBy("number")
      .get();
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

  handleGenderClick = (id: string) => (gender: Gender, forShiny?: boolean) => (
    e: SyntheticEvent<any>
  ) => {
    const { user, collection } = this.state;
    if (user && user.uid) {
      const shinyKey = forShiny ? "shiny" : "normal";
      const prevValue =
        collection &&
        id in collection &&
        "gendersCaught" in collection[id] &&
        gender in collection[id].gendersCaught &&
        shinyKey in collection[id].gendersCaught[gender] &&
        collection[id].gendersCaught[gender][shinyKey];
      firestore
        .collection("collections")
        .doc(user.uid)
        .collection("pokemon")
        .doc(id)
        .set(
          {
            gendersCaught: {
              [gender]: {
                [shinyKey]: !prevValue
              }
            }
          },
          { merge: true }
        );
    }
  };

  render() {
    const { user, loading, pokedex, collection } = this.state;
    return (
      <div>
        <TopMenu
          user={user}
          onLoginClick={this.login}
          onLogoutClick={this.logout}
        />
        <Container>
          <Loader active={loading}>Loading</Loader>
          {!loading && (
            <PokedexTable
              pokedex={pokedex}
              collection={collection}
              onGenderClick={this.handleGenderClick}
            />
          )}
        </Container>
      </div>
    );
  }
}

export default App;
