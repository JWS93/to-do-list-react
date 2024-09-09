const checkStatus = (response) => {
  if (response.ok) {
    return response;
  }
  throw new Error('response was either 404 or 500');
}

const json = (response) => response.json()

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

  handleChange(event) {
    this.setState({ new_task: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    const { new_tasks, tasks } = this.state;

    return (
      <div className = "container">
        <div className = "row">
          <div className = "col-12">
            <h2 className = "mb-3">To Do List</h2>
            {tasks.length > 0 ? tasks.map((task) => {
              return null;
            }) : <p>no tasks here</p>}
            <form onSubmit = {handleSubmit} className = "form-inline my-4">
              <input
                type = "text"
                className = "form-control mb-2 mr-sm-2"
                placeholder = "new task"
                value = {new_task}
                onChange = {handleChange}
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
const root = ReactDOM.createRoot('container');
root.render(<ToDoList />)