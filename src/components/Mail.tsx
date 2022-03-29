import React from 'react';
import { Link } from 'react-router-dom';

export interface IMail {
  id: number;
  from: string;
  sent_date: string;
  is_unread: boolean;
  subject: string;
  snippet: string;
}

interface IMailProps {
  initialMail: IMail;
  onChangeUnread: (shouldIncrement: boolean) => void;
}

interface IMailState {
  is_unread: IMail['is_unread'];
}

export default class Mail extends React.PureComponent<IMailProps, IMailState> {
  state = { is_unread: this.props.initialMail.is_unread };

  onChangeUnread = () => {
    this.props.onChangeUnread(!this.state.is_unread);
    this.setState((state) => ({
      is_unread: !state.is_unread,
    }));
  };

  render() {
    return (
      <div className={`mail ${this.state.is_unread ? 'mail--unread' : ''}`}>
        <Link className="mail__link" to={`/${this.props.initialMail.id}`}>
          <div className="mail__from">{this.props.initialMail.from}</div>
          <div className="mail__content">
            <div className="mail__subject">{this.props.initialMail.subject}</div>
            <div className="mail__snippet">{this.props.initialMail.snippet}</div>
          </div>
        </Link>
        <input type="checkbox" checked={this.state.is_unread} onChange={this.onChangeUnread} />
      </div>
    );
  }
}
