App = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      tasks: Tasks.find({}, {sort: {createdAt: -1}}).fetch()
    }
  },

  handleSubmit(event) {
      event.preventDefault();

      var text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

      Tasks.insert({
        text: text,
        createdAt: new Date() // current time
      });

      ReactDOM.findDOMNode(this.refs.textInput).value = "";
    },

  renderTasks() {
    return this.data.tasks.map((task) => {
      return <Task key={task._id} task={task} />;
    });
  },

  render() {
    return (
      <div className="container">
        <header>
          <h1>Todo List</h1>
          <form className="new-task" onSubmit={this.handleSubmit} >
            <input type="text" ref="textInput" placeholder="Type to add new tasks" />
          </form>
        </header>

        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    );
  }
});
