import React, { Component } from "react";
//import { withAuthenticator } from "aws-amplify-react";
class App extends Component {
  state = {
    notes: [{}]
  };
  render() {
    const { notes } = this.state;
    return (
      <div className="flex flex-column items-center justify-center pa3 bg-washed-red">
        <h1 className="code f2-l">AWS Amplify App</h1>

        {/* notes form */}
        <form className="mb3">
          <input type="text" className="pa2 f4" placeholder="enter note" />
          <button type="submit" className="pa2 f4">
            Add Note
          </button>
        </form>
        {/* Notes List */}
        <div>
          {notes.map(item => (
            <div key={item.id} className="flex items-center">
              <li className="list pa1 f3">{item.note}</li>
              {/* <button className="bg-tranparent bn f4">
                 <span>&times;</span> 
              </button>*/}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

//export default withAuthenticator(App, { includeGreetings: true });
export default App;
