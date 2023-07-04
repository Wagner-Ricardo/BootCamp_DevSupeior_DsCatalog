

import { ReactComponent as AuthImage } from 'assets/images/auth-img.svg';
import {Switch, Route } from 'react-router-dom';
import Login from './Login';

import './styles.css';

const Auth = () => {
  return (
    <div className="auth-container">
      <div className="auth-banner-container">
        <h1>Divulgue seus produtos</h1>
        <p>Faça parte do nosso catalogo de divulgação e aumente a venda de 
            seus produtos.
        </p>
        <AuthImage />
      </div>

      <div className="auth-form-container">
        <Switch>
          <Route path="/admin/auth/login">
          <Login/>
          </Route>

          <Route path="/admin/auth/sigup">
            <h1>Card de Sigup</h1>
          </Route>

          <Route path="/admin/auth/recover">
            <h1>Card de Recover</h1>
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default Auth;
