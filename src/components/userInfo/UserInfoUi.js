import React, { Component } from "react";
import AvatarUi from "../avatar/AvatarUi";
import UserInfoApi from "../userInfo/UserInfoApi";

class UserInfoUi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: "",
      userInfo: null,
    };
  }

  // 입력 상자의 변경 이벤트 처리
  handleInputChange = (event) => {
    this.setState({
      userID: event.target.value,
    });
  };

  // 사용자 정보 가져오기
  getUserInfo = async () => {
    const { userID } = this.state;
    const userInfo = await UserInfoApi.getUserInfo(userID);
    this.setState({ userInfo });
  };

  render() {
    const { userInfo } = this.state;
    return (
      <>
        {/* 페이지 제목 */}
        <h1>Hello React World!!</h1>
        {/* 아바타 컴포넌트 */}
        <AvatarUi />
        {/* 입력 상자와 버튼 */}
        <div>
          <input
            type="text"
            value={this.state.userID}
            onChange={this.handleInputChange}
          />
          {/* 가져오기 버튼 */}
          <button onClick={this.getUserInfo}>Get User Info</button>
        </div>
        {/* 사용자 정보 표시 */}
        {userInfo && (
          <div>
            {/* 사용자 ID 표시 */}
            <p>User ID: {userInfo.userID}</p>
            {/* 사용자 닉네임 표시 */}
            <p>Nickname: {userInfo.nickname}</p>
            {/* 추가적인 사용자 정보는 여기에 추가 */}
          </div>
        )}
      </>
    );
  }
}

export default UserInfoUi;
