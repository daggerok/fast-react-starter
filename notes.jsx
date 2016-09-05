/**
 * Created by mak on 9/6/16.
 */
const Note = ({ note, onDelete }) => (
  <div className="grid-item"
       style={{color: note.color}}>
      <span>
        <span onClick={() => onDelete(note)}
              className="delete-note"> x <br/>
          {note.text}</span>
      </span>
  </div>
);

class NoteEditor extends React.Component {
  constructor() {
    super();
    this.state = { text: '' };
    this.TEXT_LABLE = 'here is your text';
    this.updateState = this.updateState.bind(this);
    this.handleNoteAdd = this.handleNoteAdd.bind(this);
  }
  updateState(event) {
    this.setState({ text: event.target.value });
  }
  handleNoteAdd() {
    this.props.onNoteAdd({
      id: Date.now(),
      color: 'darkgrey',
      text: this.state.text
    });
    this.setState({ text: this.TEXT_LABLE });
  }
  render() {
    return (
      <div>
          <textarea rows="3"
                    value={this.state.text}
                    className="form-control"
                    onChange={this.updateState}
                    onClick={() => this.setState({ text: '' })}
                    placeholder={this.TEXT_LABLE}></textarea>
        <button onClick={this.handleNoteAdd}
                className="btn btn-danger">save</button>
      </div>
    );
  }
}

class NotesGrid extends React.Component {
  componentDidMount() {
    this.msnry = new Masonry( this.refs.gridContainer, {
      // options
      itemSelector: '.grid-item',
      columnWidth: 225,
      isFitWidth: true,
      gutter: 10
    });
  }
  componentDidUpdate(prevProps) {
    if (this.props.notes.length === prevProps.notes.length) {
      return;
    }
    this.msnry.reloadItems();
    this.msnry.layout();
  }
  render() {
    return (
      <div ref="gridContainer">
        {this.props.notes.map((note, index) =>
          <Note onDelete={this.props.onDeleteNote} key={index} note={note}/>
        )}
      </div>
    );
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      notes: []
    };
    this.NOTES_KEY = 'daggerok.notes';
    this.handleNoteAdd = this.handleNoteAdd.bind(this);
    this.handleDeleteNote = this.handleDeleteNote.bind(this);
    this.storeNotesInLocalStorage = this.storeNotesInLocalStorage.bind(this);
  }
  handleNoteAdd(noteToBeSave) {
    this.setState({ notes: [noteToBeSave, ...this.state.notes] });
  }
  handleDeleteNote(noteToBeRemoved) {
    this.setState({ notes: this.state.notes.filter(note => note.id !== noteToBeRemoved.id) });
  }
  componentDidMount() {
    const prevState = JSON.parse(window.localStorage.getItem(this.NOTES_KEY));
    if (prevState && prevState.notes) {
      this.setState({ notes: prevState.notes });
    }
  }
  componentDidUpdate() {
    this.storeNotesInLocalStorage();
  }
  storeNotesInLocalStorage() {
    window.localStorage.setItem(this.NOTES_KEY, JSON.stringify(this.state));
  }
  render() {
    return (
      <div>
        <NoteEditor onNoteAdd={this.handleNoteAdd} />
        <NotesGrid notes={this.state.notes}
                   onDeleteNote={this.handleDeleteNote} />
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
