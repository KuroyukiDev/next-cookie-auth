import {Component} from "react";
import Layout from "../components/Layout";
import {getUserProfile, authInitialProps} from "../lib/auth";

export default class Profile extends Component {
  state = {
    user: null
  };
  componentDidMount() {
    getUserProfile().then(user => this.setState({user}));
  }
  
  render() {
    return (
      <Layout { ...this.props}>
        <h1>Profile</h1>
        <pre>
          {
            JSON.stringify(this.state.user, null, 2)
          }
        </pre>
      </Layout>
    );
  }
}

Profile.getInitialProps = authInitialProps(true);