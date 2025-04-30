const votesRef = database.ref('votes');
votesRef.on('value', (snapshot) => {
    const data = snapshot.val();
    console.log('Received vote data update:', data);
    votes.option1 = data.option1 || 0;
    votes.option2 = data.option2 || 0;
    updateProgressBars();
}, (error) => {
    console.error('Error listening for vote data updates:', error);
});
