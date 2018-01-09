// @flow
import React from "react";
import { Container, Segment } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { auth, provider, firestore } from "./firebase";
import TopMenu from "./TopMenu";
import SettingsMenu from "./SettingsMenu";
import PokedexTable from "./PokedexTable";
import type { Settings, Pokemon, Collection, Gender } from "./types";

type State = {
  user: any,
  settings: Settings,
  loading: boolean,
  pokedex: Array<Pokemon>,
  collection: Collection
};

class App extends React.Component<{}, State> {
  state = {
    user: null,
    settings: {},
    loading: true,
    pokedex: [],
    collection: {}
  };

  componentDidMount() {
    this.initializeUser();
    this.fetchPokedex();
  }

  initializeUser = () => {
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

        firestore
          .collection("settings")
          .doc(user.uid)
          .onSnapshot(doc => {
            if (doc.exists) {
              this.setState({ settings: doc.data() });
            }
          });
      }
    });
  };

  fetchPokedex = async () => {
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
  };

  login = async () => {
    const result = await auth.signInWithPopup(provider);
    this.setState({ user: result.user });
  };

  logout = async () => {
    await auth.signOut();
    this.setState({ user: null });
  };

  handleSettingsClick = (e: SyntheticEvent<any>, data: any) => {
    const { user } = this.state;
    if (user && user.uid) {
      firestore
        .collection("settings")
        .doc(user.uid)
        .set(
          {
            [data.name]: data.checked
          },
          { merge: true }
        );
    }
  };

  handleLegacyClick = (id: string) => {
    const { user, collection } = this.state;
    if (user && user.uid) {
      const prevValue =
        collection &&
        id in collection &&
        "legacyCaught" in collection[id] &&
        collection[id].legacyCaught;
      firestore
        .collection("collections")
        .doc(user.uid)
        .collection("pokemon")
        .doc(id)
        .set({ legacyCaught: !prevValue }, { merge: true });
    }
  };

  handleGenderClick = (id: string, gender: Gender, forShiny?: boolean) => {
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
          { gendersCaught: { [gender]: { [shinyKey]: !prevValue } } },
          { merge: true }
        );
    }
  };

  render() {
    const { user, settings, loading, pokedex, collection } = this.state;
    return (
      <div>
        <TopMenu
          user={user}
          settings={settings}
          onLoginClick={this.login}
          onLogoutClick={this.logout}
        />
        <Container>
          <SettingsMenu
            settings={settings}
            onClick={this.handleSettingsClick}
          />
          {loading ? (
            <Segment style={{ paddingTop: "10em" }} attached loading />
          ) : (
            <PokedexTable
              settings={settings}
              pokedex={pokedex}
              collection={collection}
              onLegacyClick={this.handleLegacyClick}
              onGenderClick={this.handleGenderClick}
            />
          )}
        </Container>
      </div>
    );
  }
}

export default App;
