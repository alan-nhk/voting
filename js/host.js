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

let votes = {
    option1: 0,
    option2: 0
};

const progress1 = document.getElementById('progress-1');
const progress2 = document.getElementById('progress-2');
const resetButton = document.getElementById('reset-button');

function updateProgressBars() {
    const totalVotes = votes.option1 + votes.option2;
    const percentage1 = totalVotes > 0? (votes.option1 / totalVotes) * 100 : 0;
    const percentage2 = totalVotes > 0? (votes.option2 / totalVotes) * 100 : 0;
    progress1.style.width = `${percentage1}%`;
    progress2.style.width = `${percentage2}%`;
}

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

resetButton.addEventListener('click', () => {
    const option1Ref = database.ref('votes/option1');
    option1Ref.set(0);
    const option2Ref = database.ref('votes/option2');
    option2Ref.set(0);
});
