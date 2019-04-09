class App extends React.Component {

  constructor(props) {
    super(props)
    this.urlParams = new URLSearchParams(window.location.search);
    this.state     = {
      date:  this.urlParams.get('date'),
      title: this.urlParams.get('title')
    };
  }

  render() {
    return (
      <div>
        <Countdown title={this.state.title} date={this.state.date} />
      </div>
    );
  }
}

class Countdown extends React.Component {
  constructor(props) {
    super(props);
    this.refreshInterval = 1000; // 1 second in milliseconds.
    this.state = {
      date:    Date.parse(this.props.date),
      total:   0,
      days:    0,
      hours:   0,
      minutes: 0,
      seconds: 0
    };
  }

  componentDidMount() {
    if (this.state.date > Date.now()) {
      this.timerId = setInterval(
        () => this.refresh(),
        this.refreshInterval
      );
    }
  }

  refresh() {
    this.setState({
      ...this.remainingTime
    });
    
    if (this.state.total <= 0) {
      clearInterval(this.timerId);
    }
  }

  // Kind of gross...
  get remainingTime() {
    const remaining = this.state.date - Date.now();
    return {
      total:    remaining,
      days:     Math.floor(remaining  / (1000 * 60 * 60 * 24)),
      hours:    Math.floor((remaining / (1000 * 60 * 60)) % 24),
      minutes:  Math.floor((remaining / 1000 / 60) % 60),
      seconds:  Math.floor((remaining / 1000) % 60)
    }
  }

  render() {
    return (
      <section className="countdown">
        <h2 className="countdown-title">{this.props.title}</h2>
        <p className="countdown-date">{this.props.date}</p>
        {this.renderDateParts()}
      </section>
    );
  }

  renderDateParts() {
    return (
      <div className="countdown-date-parts">
        {this.renderDatePart('Days',    this.state.days)}
        {this.renderDatePart('Hours',   this.state.hours)}
        {this.renderDatePart('Minutes', this.state.minutes)}
        {this.renderDatePart('Seconds', this.state.seconds)}
      </div>
    );
  }

  renderDatePart(title, value, padding=2) {
    return (
      <div className="date-part">
        <p className="date-part-value">{value.toString().padStart(padding, '0')}</p>
        <p className="date-part-title">{title}</p>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);