document.addEventListener('DOMContentLoaded', function() {
    const userList = document.getElementById('userList');
    const usernameInput = document.getElementById('username');
    const addUserButton = document.getElementById('addUser');

    // ストレージからユーザーリストを取得
    chrome.storage.sync.get('blockedUsers', function(data) {
        const users = data.blockedUsers || [];
        users.forEach(function(user) {
            addUserToList(user);
        });
    });

    // ユーザー追加
    addUserButton.addEventListener('click', function() {
        const username = usernameInput.value.trim();
        if (username) {
            chrome.storage.sync.get('blockedUsers', function(data) {
                const users = data.blockedUsers || [];
                if (!users.includes(username)) {
                    users.push(username);
                    chrome.storage.sync.set({blockedUsers: users}, function() {
                        addUserToList(username);
                        usernameInput.value = '';
                    });
                }
            });
        }
    });

    // ユーザーをリストに追加
    function addUserToList(username) {
        const li = document.createElement('li');
        li.textContent = username;
        const removeButton = document.createElement('button');
        removeButton.textContent = '削除';
        removeButton.addEventListener('click', function() {
            removeUser(username);
            li.remove();
        });
        li.appendChild(removeButton);
        userList.appendChild(li);
    }

    // ユーザー削除
    function removeUser(username) {
        chrome.storage.sync.get('blockedUsers', function(data) {
            const users = data.blockedUsers || [];
            const newUsers = users.filter(user => user !== username);
            chrome.storage.sync.set({blockedUsers: newUsers});
        });
    }
});
