import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { IMail } from './MailListItem';

interface IMailDetailsProps {
  mails: IMail[];
}

const MailDetails: React.FC<IMailDetailsProps> = (props) => {
  let { id } = useParams<'id'>();
  const mail = props.mails.find((mail) => mail.id === Number(id));

  if (!mail) {
    return <div>Nie znaleziono</div>;
  }

  return (
    <div className={`container detail`}>
      <Link to="/">&lt;-- Cofnij</Link>
      <br />
      <br />
      <div className="detail__header">OD: {mail.from}</div>
      <div className="detail__header">TEMAT: {mail.subject}</div>
      <div className="detail__snippet">{mail.snippet}</div>
    </div>
  );
};

export default MailDetails;
