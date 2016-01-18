var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

App = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      items: Items.find({}, {sort: {createdAt: -1}}).fetch(),
    }
  },
  getInitialState() {
    return {
      popItem: {
        text: '',
      },
    };
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

  popItemRandom() {
    let items = Items.find().fetch();
    let popId = Math.floor(Math.random() * (items.length));
    Items.remove(items[popId]._id);
    this.state.item = items[popId];
  },

  renderItems() {
    let items = this.data.items.map((item) => {
      return <Item key={item._id} item={item} />;
    });
    return (
      <ReactCSSTransitionGroup transitionName="item-list" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
        {items}
      </ReactCSSTransitionGroup>
    );
  },

  renderPopItem() {
    return <PopItem item={this.state.item} />;
  },

  render() {
    return (
      <div className="container">
        <header>
          <h1>Yaminabe</h1>
          <form className="new-item" onSubmit={this.handleSubmit} >
            <input type="text" ref="textInput" placeholder="Type to add new items" />
          </form>
        </header>

        <ul>
          {this.renderItems()}
        </ul>

        <button className="pop" onClick={this.popItemRandom}>pop</button>

        <div className="popItemDialog">
          {this.renderPopItem()}
        </div>
      </div>
    );
  }
});
