option1Button.addEventListener('click', () => {
    if (!hasVoted) {
        const voteRef = database.ref('votes/option1');
        voteRef.transaction((currentValue) => {
            return (currentValue || 0) + 1;
        }).then(() => {
            console.log('Vote for option 1 recorded successfully');
            hasVoted = true;
            votedOption = 'option1';
        }).catch((error) => {
            console.error('Error recording vote for option 1:', error);
        });
    } else if (votedOption === 'option2') {
        const option2Ref = database.ref('votes/option2');
        option2Ref.transaction((currentValue) => {
            return (currentValue || 0) - 1;
        }).then(() => {
            const option1Ref = database.ref('votes/option1');
            return option1Ref.transaction((currentValue) => {
                return (currentValue || 0) + 1;
            });
        }).then(() => {
            console.log('Vote changed from option 2 to option 1');
            votedOption = 'option1';
        }).catch((error) => {
            console.error('Error changing vote from option 2 to option 1:', error);
        });
    }
});
