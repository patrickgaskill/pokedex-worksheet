// @flow
import React from "react";
import { Container, Segment } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import { auth, provider, firestore } from "./firebase";
import TopMenu from "./TopMenu";
import SettingsMenu from "./SettingsMenu";
import ProgressBars from "./ProgressBars";
import PokedexTable from "./PokedexTable";
import { filters } from "./constants";
import type {
  Settings,
  Pokedex,
  Collection,
  HandleFilterChange,
  HandleSettingsClick,
  HandleCollectionClick
} from "./types";

type State = {
  user: any,
  settings: Settings,
  fetchedPokedex: boolean,
  fetchedCollection: boolean,
  fetchedSettings: boolean,
  pokedex: Pokedex,
  collection: Collection
};

class App extends React.Component<{}, State> {
  state = {
    user: null,
    settings: { filter: filters.ALL, enableLegacyCatches: false },
    fetchedPokedex: false,
    fetchedCollection: false,
    fetchedSettings: false,
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
      } else {
        auth.signInAnonymously();
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
          },
          fetchedCollection: true
        }));
      });
  };

  subscribeToSettings = (uid: string) => {
    this.unsubscribeFromSettings = firestore
      .collection("settings")
      .doc(uid)
      .onSnapshot(doc => {
        if (doc.exists) {
          this.setState(prevState => ({
            settings: { ...prevState.settings, ...doc.data() },
            fetchedSettings: true
          }));
        }
      });
  };

  fetchPokedex = () => {
    firestore
      .collection("pokedex")
      .doc("pokedex")
      .get()
      .then(doc => {
        if (doc.exists) {
          const data = doc.data();
          const pokedex = Object.keys(data)
            .map(id => ({ id, ...data[id] }))
            .filter(p => p.active)
            .sort((a, b) => a.number - b.number);
          this.setState({ pokedex, fetchedPokedex: true });
        }
      });
  };

  isLoaded = () => {
    const { fetchedPokedex, fetchedCollection, fetchedSettings } = this.state;
    return fetchedPokedex && fetchedCollection && fetchedSettings;
  };

  login = () => {
    const { user } = this.state;
    if (user) {
      user.linkWithPopup(provider).then(
        result => {
          this.setState({ user: result.user });
        },
        error => {
          if (error.code === "auth/credential-already-in-use") {
            auth.signInWithCredential(error.credential);
          }
        }
      );
    }
  };

  logout = () => {
    auth.signOut();
    this.setState({ user: null });
  };

  handleFilterChange: HandleFilterChange = (e, data) => {
    const { user } = this.state;
    if (user && user.uid) {
      firestore
        .collection("settings")
        .doc(user.uid)
        .set({ filter: data.value }, { merge: true });
    }
  };

  handleSettingsClick: HandleSettingsClick = (e, data) => {
    const { user } = this.state;
    if (user && user.uid) {
      firestore
        .collection("settings")
        .doc(user.uid)
        .set({ [data.name]: data.checked }, { merge: true });
    }
  };

  handleCollectionClick: HandleCollectionClick = (pokemonId, data) => {
    const { user } = this.state;
    if (user && user.uid) {
      firestore
        .collection("collections")
        .doc(user.uid)
        .collection("pokemon")
        .doc(pokemonId)
        .set(data, { merge: true });
    }
  };

  render() {
    const { user, settings, pokedex, collection } = this.state;
    return (
      <div>
        <TopMenu
          user={user}
          settings={settings}
          onLoginClick={this.login}
          onLogoutClick={this.logout}
        />
        <Container>
          {this.isLoaded() ? (
            <div>
              <SettingsMenu
                settings={settings}
                onSettingsClick={this.handleSettingsClick}
                onFilterChange={this.handleFilterChange}
              />
              <ProgressBars
                settings={settings}
                pokedex={pokedex}
                collection={collection}
              />
              <PokedexTable
                settings={settings}
                pokedex={pokedex}
                collection={collection}
                onClick={this.handleCollectionClick}
              />
            </div>
          ) : (
            <Segment style={{ paddingTop: "10em" }} attached loading />
          )}
        </Container>
      </div>
    );
  }
}

export default App;
