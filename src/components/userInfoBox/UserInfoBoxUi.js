import React, { Component } from "react";
import AvatarUi from "../avatar/AvatarUi";
import UserInfoApi from "../api/UserInfoApi";

class UserInfoBoxUi extends Component {
  render() {
    return (
      <>
        <h1>Hello React World!!</h1>
        <AvatarUi />
      </>
    );
  }
}

export default UserInfoBoxUi;
