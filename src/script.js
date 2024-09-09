const checkStatus = (response) => {
  if (response.ok) {
    return response;
  }
  throw new Error('request was either 404 or 500');
}

const json = (response) => response.json()

class Task extends React.Component {
  render () {
    const { task, onDelete, onComplete } = this.props;
    const { id, content, completed } = task;

    return (
      <div className = "row mb-1">
        <p className = "col">{content}</p>
        <button
          onClick = {() => onDelete(id)}
        >Delete</button>
        <input
          className = "d-inline-block mt-2"
          type = "checkbox"
          onChange = {() => onComplete(id, completed)}
          checked = {completed}
        />
      </div>
    )
  }
}

class ToDoList extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      new_task: '',
      tasks: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch("https://fewd-todolist-api.onrender.com/tasks?api_key=1261")
      .then(checkStatus)
      .then(json)
      .then((response) => {
        console.log(response);
        this.setState({tasks: response.tasks});
      })
      .catch(error => {
        console.log(error.message);
      })
  }

  handleChange(event) {
    this.setState({ new_task: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    const { new_task, tasks } = this.state;

    return (
      <div className = "container">
        <div className = "row">
          <div className = "col-12">
            <h2 className = "mb-3">To Do List</h2>
            {tasks.length > 0 ? tasks.map((task) => {
              return <Task key = {task.id} task = {task} />;
            }) : <p>no tasks here</p>}
            <form onSubmit = {this.handleSubmit} className = "form-inline my-4">
              <input
                type = "text"
                className = "form-control mb-2 mr-sm-2"
                placeholder = "new task"
                value = {new_task}
                onChange = {this.handleChange}
              />
              <button className = "btn btn-primary mb-2">Submit</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<ToDoList />)