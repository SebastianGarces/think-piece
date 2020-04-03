import React, { createContext, useState, useEffect, Component } from "react";
import { createUserProfileDocument, auth } from "../firebase";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      const userDoc = await createUserProfileDocument(userAuth);
      setUser(userDoc);
    });

    return () => unsubscribeFromAuth();
  }, []);

  console.log(user);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

// class UserProvider extends Component {
//   state = { user: null };

//   unsubscribeFromAuth = null;

//   componentDidMount = async () => {
//     console.log("I WENT TO FETCH USER");
//     this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
//       const user = await createUserProfileDocument(userAuth);
//       console.log(user);
//       this.setState({ user });
//     });
//   };

//   componentWillUnmount = () => {
//     this.unsubscribeFromAuth();
//   };

//   render() {
//     const { user } = this.state;
//     const { children } = this.props;
//     return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
//   }
// }

export default UserProvider;
