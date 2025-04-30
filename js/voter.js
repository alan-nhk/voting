// 你的 web 应用的 Firebase 配置
const firebaseConfig = {
    apiKey: "AIzaSyAL8OpTUk--EknGrTGwrJ_9LokbO0xf-u4",
    authDomain: "doubao-voting.firebaseapp.com",
    projectId: "doubao-voting",
    storageBucket: "doubao-voting.firebasestorage.app",
    messagingSenderId: "435797691765",
    appId: "1:435797691765:web:ad74d0be64f4b23843173c"
    // 这里没有提供 measurementId，若有需要你可以补充后自行添加
};

// 初始化 Firebase
firebase.initializeApp(firebaseConfig);

// 获取数据库引用
const database = firebase.database();

let hasVoted = false;
let votedOption = null;

const option1Button = document.getElementById('option-1');
const option2Button = document.getElementById('option-2');

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

option2Button.addEventListener('click', () => {
    if (!hasVoted) {
        const voteRef = database.ref('votes/option2');
        voteRef.transaction((currentValue) => {
            return (currentValue || 0) + 1;
        }).then(() => {
            console.log('Vote for option 2 recorded successfully');
            hasVoted = true;
            votedOption = 'option2';
        }).catch((error) => {
            console.error('Error recording vote for option 2:', error);
        });
    } else if (votedOption === 'option1') {
        const option1Ref = database.ref('votes/option1');
        option1Ref.transaction((currentValue) => {
            return (currentValue || 0) - 1;
        }).then(() => {
            const option2Ref = database.ref('votes/option2');
            return option2Ref.transaction((currentValue) => {
                return (currentValue || 0) + 1;
            });
        }).then(() => {
            console.log('Vote changed from option 1 to option 2');
            votedOption = 'option2';
        }).catch((error) => {
            console.error('Error changing vote from option 1 to option 2:', error);
        });
    }
});
