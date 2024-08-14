// 初期設定：空のユーザーリストを設定
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ blockedUsers: [] });
});
