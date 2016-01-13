App = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      items: Items.find({}, {sort: {createdAt: -1}}).fetch()
    }
  },

  handleSubmit(event) {
    event.preventDefault();

    var text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Items.insert({
      text: text,
      createdAt: new Date()
    });

    ReactDOM.findDOMNode(this.refs.textInput).value = "";
  },

  renderItems() {
    return this.data.items.map((item) => {
      return <Item key={item._id} item={item} />;
    });
  },

  render() {
    return (
      <div className="container">
        <header>
          <h1>Yaminabe Items</h1>
          <form className="new-item" onSubmit={this.handleSubmit} >
            <input type="text" ref="textInput" placeholder="Type to add new items" />
          </form>
        </header>

        <ul>
          {this.renderItems()}
        </ul>
      </div>
    );
  }
});
