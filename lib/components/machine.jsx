var littlest = require('littlest-isomorph');
var moment = require('moment');
var React = require('react');

var Machine = React.createClass({
  mixins: [littlest.Mixin],
  mappings: {
    machine: function () {
      return 'machine:' + this.props.machine.id;
    }
  },
  componentDidMount: function () {
    this.context.performAction('machine:poll', {
      userId: this.props.user,
      machineId: this.props.machine.id,
      dataCenter: this.props.machine.dataCenter
    });
  },
  componentWillUnmount: function () {
    this.context.performAction('machine:poll:stop', {
      machineId: this.props.machine.id
    });
  },
  handleReboot: function () {
    this.context.performAction('machine:reboot', {
      userId: this.props.user,
      machineId: this.props.machine.id,
      dataCenter: this.props.machine.dataCenter
    });
  },
  handleStart: function () {
    this.context.performAction('machine:start', {
      userId: this.props.user,
      machineId: this.props.machine.id,
      dataCenter: this.props.machine.dataCenter
    });
  },
  handleStop: function () {
    this.context.performAction('machine:stop', {
      userId: this.props.user,
      machineId: this.props.machine.id,
      dataCenter: this.props.machine.dataCenter
    });
  },
  renderStateIcon: function (state) {
    if (state === 'running' || state === 'ready') {
      return <i className="icon-ok"></i>;
    }

    return <i className="icon-attention-alt"></i>;
  },
  renderOS: function (os) {
    if (os === 'smartos') {
      return 'SmartOS';
    }

    if (os === 'windows') {
      return 'Windows';
    }

    return os;
  },
  renderUptime: function (date) {
    if (!date) {
      return 'N/A';
    }

    return moment.duration(Date.now() - Date.parse(date)).humanize();
  },
  render: function () {
    return (
      <div className={'machine' + (this.props.className ? ' ' + this.props.className : '')}>
        <div className="machine__name">{this.state.machine.name}</div>
        <div className={'machine__state machine__state--' + this.state.machine.state} title={this.state.machine.state}>{this.renderStateIcon(this.state.machine.state)} {this.state.machine.state}</div>
        <table className="machine__meta">
          <tbody>
            <tr>
              <th>OS</th><td>{this.renderOS(this.state.machine.os)}</td>
            </tr>
            <tr>
              <th>IPs</th><td>{this.state.machine.ips.join(', ')}</td>
            </tr>
            <tr>
              <th>Uptime</th><td>{this.renderUptime(this.state.machine.up)}</td>
            </tr>
          </tbody>
        </table>
        <div className="machine__actions">
          <button className="machine__action" tabIndex="-1" onClick={this.handleReboot}><i className="icon-ccw"></i> Reboot</button>
          <button className="machine__action" tabIndex="-1" onClick={this.handleStart}><i className="icon-off"></i> Start</button>
          <button className="machine__action" tabIndex="-1" onClick={this.handleStop}><i className="icon-off"></i> Stop</button>
        </div>
      </div>
    );
  }
});

module.exports = Machine;
