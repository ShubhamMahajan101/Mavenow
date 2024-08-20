
//   Generate new message id 
const newMessageRef = firebase.database().ref('chats/chatID/messages').push();
const newMessageId = newMessageRef.key;


//  function update message new id 
function updateMessageWithNewId(newMessageId, oldMessageData) {
  const newMessageRef = firebase.database().ref('chats/chatID/messages').child(newMessageId);
  newMessageRef.set(oldMessageData)
    .then(() => {
      console.log('Message updated successfully with new ID:', newMessageId);
      // Remove the old message
      removeOldMessage(oldMessageId);
    })
    .catch(error => {
      console.error('Error updating message with new ID:', error);
    });
}

//  function remove message
function removeOldMessage(oldMessageId) {
  const oldMessageRef = firebase.database().ref('chats/chatID/messages').child(oldMessageId);
  oldMessageRef.remove()
    .then(() => {
      console.log('Old message removed successfully:', oldMessageId);
    })
    .catch(error => {
      console.error('Error removing old message:', error);
    });
}
