import React from 'react';
import MailListItem, { IMail } from './MailListItem';

interface IMailListProps {
  displayedMailList: IMail[];
  onChangeUnread: (shouldIncrement: boolean) => void;
}

export default class MailList extends React.PureComponent<IMailListProps> {
  render() {
    return (
      <div className="mail-list">
        {this.props.displayedMailList.map((mail) => (
          <MailListItem
            key={mail.id}
            initialMail={mail}
            onChangeUnread={this.props.onChangeUnread}
          />
        ))}
      </div>
    );
  }
}
