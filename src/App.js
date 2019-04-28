import React, { Component } from "react";

class App extends Component {
  state = {
    Note: "",
    notes: []
  };

  handleChangeNote = event => this.setState({ Note: event.target.value });
  handleAddNote = async event => {
    event.preventDefault();
    const { Note, notes } = this.state;
    const input = { Note };
  };

  render() {
    const { notes, Note } = this.state;
    return (
      <div className="flex flex-column items-center justify-center pa3 bg-washed-red">
        <h1 className="code f2-l">AWS Amplify App</h1>

        {/* notes form */}
        <form onSubmit={this.handleAddNote} className="mb3">
          <input
            type="text"
            className="pa2 f4"
            placeholder="enter note"
            onChange={this.handleChangeNote}
            value={Note}
          />
          <button type="submit" className="pa2 f4">
            Add Note
          </button>
        </form>
        {/* Notes List */}
        <div>
          {notes.map(item => (
            <div key={item.id} className="flex items-center">
              <li className="list pa1 f3">{item.Note}</li>
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

export default App;
