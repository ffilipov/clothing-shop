import { Outlet, Link } from "react-router-dom";
import { Fragment, useState, useEffect } from "react";
import { ReactComponent as Logo } from '../../assets/crown.svg';
import "./navigation.styles.scss";

import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../utils/firebase/firebase.utils';

const Navigation = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  const logoutUser = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      console.log('User logged out.');
    } catch (error) {
      console.log('Error logging out:', error);
    }
  };

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <Logo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {currentUser ? (
            <Link className="nav-link" to="/" onClick={logoutUser}>
              SIGN OUT
            </Link>
          ) : (
            <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
          )}
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
