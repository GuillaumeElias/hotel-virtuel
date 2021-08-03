import React from "react";
import ReactDOM from "react-dom";

class DomNode extends React.Component {
  componentDidMount() {
    this.updateNode(this.props.node);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.node !== this.props.node) {
      this.updateNode(nextProps.node);
    }
  }

  componentWillUnmount() {
    this.updateNode(null);
  }

  updateNode(node) {
    var myNode = ReactDOM.findDOMNode(this);
    for (var i = 0; i < myNode.children.length; i++) {
      myNode.removeChild(myNode.children[i]);
    }

    if (node) {
      myNode.appendChild(node);
    }
  }

  render() {
    return <div />;
  }
}

export default DomNode;
