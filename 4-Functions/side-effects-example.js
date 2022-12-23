function connectDatabase() {
    const didConnect = database.connect(); // Side Effect -> Expected
    if (didConnect) {
      return true;
    } else {
      console.log('Could not connect to database!'); // Side Effect -> Not Expected
      return false;
    }
  }
  
function determineSupportAgent(ticket) {
    if (ticket.requestType === 'unknown') {
      return findStandardAgent();
    }
    return findAgentByRequestType(ticket.requestType);
}
  
function isValid(email, password) {
    if (!email.includes('@') || password.length < 7) {
      console.log('Invalid input!'); // Side Effect -> Not Expected
      return false;
    }
    return true;
}

  