import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { IMail } from './MailListItem';
import MailDetails from './MailDetails';
import MailHeader from './MailHeader';
import MailList from './MailList';

interface IDashboardState {
  allMailList: IMail[];
  displayedMailList: IMail[];
  unreadEmailsCounter: number;
}

export default class Dashboard extends React.PureComponent<{}, IDashboardState> {
  constructor(props = {}) {
    super(props);
    this.state = {
      allMailList: [],
      displayedMailList: [],
      unreadEmailsCounter: 0,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      import('./mails.json').then((mailsModule) => {
        const mails = mailsModule.default;
        const unreadEmails = mails.filter((mail) => mail.is_unread).length;
        this.setState({
          allMailList: mails,
          displayedMailList: mails.slice(0, 50),
          unreadEmailsCounter: unreadEmails,
        });
      });
    }, 500);

    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = (e: Event) => {
    if (document.body.scrollHeight - window.innerHeight - window.scrollY < 200) {
      this.onDisplayMoreEmails();
    }
  };

  onDisplayMoreEmails = () => {
    const allMails = this.state.allMailList.length;
    const displayedMails = this.state.displayedMailList.length;
    if (allMails > displayedMails) {
      this.setState((state) => ({
        displayedMailList: state.allMailList.slice(0, displayedMails + 50),
      }));
    }
  };

  onChangeUnread = (shouldIncrement: boolean) => {
    this.setState((state) => ({
      unreadEmailsCounter: shouldIncrement
        ? state.unreadEmailsCounter + 1
        : state.unreadEmailsCounter - 1,
    }));
  };

  render() {
    return (
      <>
        <header>
          <h1>Twoja Poczta</h1>
          <MailHeader unreadEmailsCounter={this.state.unreadEmailsCounter} />
        </header>
        <main className="main">
          {this.state.displayedMailList.length > 0 ? (
            <MailList
              displayedMailList={this.state.displayedMailList}
              onChangeUnread={this.onChangeUnread}
            />
          ) : (
            <div>Ładowanie...</div>
          )}
          <Routes>
            <Route path="/:id" element={<MailDetails mails={this.state.allMailList} />}></Route>
            <Route path="/" element={<></>}></Route>
          </Routes>
        </main>
      </>
    );
  }
}
