Item = React.createClass({
  propTypes: {
    item: React.PropTypes.object.isRequired
  },
  toggleChecked() {
    Items.update(this.props.item._id, {
      $set: {checked: ! this.props.item.checked}
    });
  },

  deleteThisItem() {
    Items.remove(this.props.item._id);
  },

  render() {
    const itemClassName = this.props.item.checked ? "checked" : "";
    return (
      <li className={itemClassName}>
        <button className="delete" onClick={this.deleteThisItem}>
          &times;
        </button>
        <input type="checkbox" readOnly={true} checked={this.props.item.checked} onClick={this.toggleChecked} />
        <span className="text">{this.props.item.text}</span>
      </li>
    );
  }
});
