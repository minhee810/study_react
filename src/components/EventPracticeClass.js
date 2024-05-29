import { Component } from "react";

class EnventPractice extends Component {
  state = {
    username: "",
    message: "",
  };

  // input이 여러 개라면 input 마다 이벤트를 설정하지 않고 e.target.name 으로
  // 추출하여 상태 값 변경 가능
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    console.log(e.target.value);
  };

  handleClick = (e) => {
    alert(this.state.username + " : " + this.state.message);
    this.setState({
      username: "",
      message: "",
    });
  };

  // input 창에서 Enter 버튼 누르면 클릭 이벤트 발생
  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      this.handleClick();
    }
  };

  render() {
    return (
      <div>
        <h1>이벤트 연습</h1>
        <input
          type="text"
          name="username"
          placeholder="사용자명"
          value={this.state.username}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="message"
          placeholder="아무거나 입력하세요"
          value={this.state.message}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
        />
        <button onClick={this.handleClick}>확인</button>
      </div>
    );
  }
}

export default EnventPractice;
