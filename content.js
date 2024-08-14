// 指定されたユーザーの画像付きツイートを非表示にする
function hideMediaTweets() {
    chrome.storage.sync.get('blockedUsers', function(data) {
        const blockedUsers = data.blockedUsers || [];
        
        const tweets = document.querySelectorAll('article');
        
        tweets.forEach(tweet => {
            // ユーザー名を取得
            const usernameElement = tweet.querySelector('a[href*="/status/"]');
            if (usernameElement) {
                const username = usernameElement.getAttribute('href').split('/')[1];
                
                // ユーザーがブロックリストに含まれているか確認
                if (blockedUsers.includes(username)) {
                    const mediaElements = tweet.querySelectorAll('[data-testid="tweetPhoto"], video');
                    
                    // メディア要素が含まれている場合のみ非表示にする
                    if (mediaElements.length > 0) {
                        tweet.style.display = 'none';
                    }
                }
            }
        });
    });
}

// 定期的にツイートをチェックして非表示にする（ページ内動的変更に対応）
setInterval(hideMediaTweets, 1000);
