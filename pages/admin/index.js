import React, { Component } from "react";

export class adminPage extends Component {
  click = () => {
    console.log("click");
  };

  render() {
    return (
      <>
        <div>some text</div>
        <button type="button" onClick={this.click}>
          Click
        </button>
      </>
    );
  }
}

export default adminPage;
