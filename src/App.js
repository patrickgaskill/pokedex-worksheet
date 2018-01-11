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

  unsubscribeFromCollection: () => void;
  unsubscribeFromSettings: () => void;
  unsubscribeFromAuth: () => void;

  componentDidMount() {
    this.initializeUser();
    this.fetchPokedex();
  }

  componentWillUnmount() {
    this.unsubscribeFromCollection();
    this.unsubscribeFromSettings();
    this.unsubscribeFromAuth();
  }

  initializeUser = () => {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
        this.subscribeToCollection(user.uid);
        this.subscribeToSettings(user.uid);
      }
    });
  };

  subscribeToCollection = (uid: string) => {
    this.unsubscribeFromCollection = firestore
      .collection("collections")
      .doc(uid)
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
  };

  subscribeToSettings = (uid: string) => {
    this.unsubscribeFromSettings = firestore
      .collection("settings")
      .doc(uid)
      .onSnapshot(doc => {
        if (doc.exists) {
          this.setState({ settings: doc.data() });
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
        .set({ [data.name]: data.checked }, { merge: true });
    }
  };

  handleLegacyClick = (pokemonId: string, legacyCaught: boolean) => {
    const { user } = this.state;
    if (user && user.uid) {
      firestore
        .collection("collections")
        .doc(user.uid)
        .collection("pokemon")
        .doc(pokemonId)
        .set({ legacyCaught }, { merge: true });
    }
  };

  handleGenderClick = (
    pokemonId: string,
    gender: Gender,
    forShiny: boolean,
    userHasCaught: boolean
  ) => {
    const { user } = this.state;
    const shinyKey = forShiny ? "shiny" : "normal";
    if (user && user.uid) {
      firestore
        .collection("collections")
        .doc(user.uid)
        .collection("pokemon")
        .doc(pokemonId)
        .set(
          { gendersCaught: { [gender]: { [shinyKey]: userHasCaught } } },
          { merge: true }
        );
    }
  };

  handleFormClick = (
    pokemonId: string,
    form: string,
    userHasCaught: boolean
  ) => {
    const { user } = this.state;
    if (user && user.uid) {
      firestore
        .collection("collections")
        .doc(user.uid)
        .collection("pokemon")
        .doc(pokemonId)
        .set({ formsCaught: { [form]: userHasCaught } }, { merge: true });
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
              onFormClick={this.handleFormClick}
            />
          )}
        </Container>
      </div>
    );
  }
}

export default App;
