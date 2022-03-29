import React from 'react';

interface IMailHeaderProps {
  unreadEmailsCounter: number;
}

const MailHeader: React.FC<IMailHeaderProps> = (props) => {
  return <div className="mail-header">Nieprzeczytane: {props.unreadEmailsCounter}</div>;
};

export default MailHeader;
