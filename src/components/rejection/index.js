import React from 'react';
import { connect } from 'react-redux';

class Rejection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rejectionID: null,
      rejections: [{
        id: 0,
        name: "First Rejection"
      },
      {
        id: 1,
        name: "Second Rejection"
      }]
    };

    this.setRejectionID = this.setRejectionID.bind(this);
  }

  setRejectionID(e) {
    let rejectionID = this.state.rejectionID;
    if (e.currentTarget.dataset.id == 0 || e.currentTarget.dataset.id) {
      rejectionID = e.currentTarget.dataset.id;
    }
    this.setState({ rejectionID });
  }

  render() {
    let rejections = this.state.rejections;
    let rejectionID = this.state.rejectionID;
    let content;

    // Display rejection if a rejection ID has been selected
    if (!isNaN(rejectionID) || rejectionID == 0) { // If value is == 0 or is a number

      // Get our rejection object
      let rejection = rejections[rejectionID];

      // Display the page to show the selected data
      content = (<div><p>You have selected Rejection {rejection.name} which has ID {rejection.id}</p></div>);

    } else {  // If rejectionID is not set
      if (rejections.length) {

        let rejections = rejections
          .map((rejection, i) => {
            return (<li style={{ border: "1px solid #000000", width: "600px" }} key={i} data-id={rejection.id} onClick={this.setRejectionID}>
              <span style={{ border: "1px solid #ff0000", width: "300px", margin: "20px" }}>Rejection for {rejection.name}</span>
            </li>);
          });

        content = (<div>
          <div>Please choose one:</div>
          <div>
            <ul>
              {rejections}
            </ul>
          </div>
        </div>);

      } else {
        content = (<div>There are no Rejections to choose from.</div>);
      }
    }
    return (<div>
      {content}
    </div>);

  }
}

export default Rejection;