/* React Equivalent: 
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);
*/
let server = import "serve"();

let Toggle = (attr: [], children: []) {
	public state = [isToggleOn: true];

	public handleClick = {
		state.isToggleOn = !state.isToggleOn;
	};

	public render = {
		return <button onClick=handleClick>
			if (state.isToggleOn, {return "ON";}, {return "OFF";});
		</button>;
	};
};
let doc = 
<html>
	<head>
		<title>"Toggle test..";</title>;
	</head>;
	<body>
		<Toggle />;
	</body>;
</html>;

server.get("/", (client: []) {
	client.response.render(doc);
});

server.listen([port: 8080, clientScope: true]);