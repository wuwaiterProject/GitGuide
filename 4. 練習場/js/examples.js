define([], function () {
    'use strict';

    /**
     * 各練習模式設定
     * name 固定為 Playground，對應 #ExplainGitPlayground-Container
     */
    return {
        add: {
            label: 'Add / Status',
            name: 'Playground',
            height: 500,
            staging: true,
            baseLine: 0.5,
            commitData: [
                { id: 'e137e9b', tags: ['master'] }
            ],
            files: [
                { name: 'readme.md', status: 'modified' },
                { name: 'app.js', status: 'modified' },
                { name: 'notes.txt', status: 'untracked' }
            ],
            description:
                '左側面板顯示<strong>工作目錄</strong>與<strong>暫存區</strong>。<br>' +
                '<span class="cmd">git add [檔名]</span> / <span class="cmd">git add .</span> 將變更加入暫存區。<br>' +
                '<span class="cmd">git status</span> 查看 staged 與否。<br>' +
                '<span class="cmd">git commit</span> 只會提交已 staged 的檔案。<br>' +
                '模擬改檔: <span class="cmd">edit readme.md</span> · 新檔案: <span class="cmd">touch new.txt</span>',
            initialMessage: '試試 git status → git add readme.md → git status → git commit'
        },
        commit: {
            label: 'Commit',
            name: 'Playground',
            height: 200,
            baseLine: 0.4,
            commitData: [
                { id: 'e137e9b', tags: ['master'] }
            ],
            description:
                '專注練習 commit 節點。若要練習 staged，請選 <strong>Add / Status</strong> 模式。<br>' +
                '在下方輸入 <span class="cmd">git commit</span>，觀察 commit 節點如何產生。',
            initialMessage: '試著輸入幾次 git commit，觀察圖形變化。'
        },
        branch: {
            label: 'Branch',
            name: 'Playground',
            baseLine: 0.6,
            commitData: [
                { id: 'e137e9b', tags: ['master'] }
            ],
            description:
                '<span class="cmd">git branch [名稱]</span> 會從目前 HEAD 建立新分支。<br>' +
                '<span class="cmd">git branch -d [名稱]</span> 可刪除分支。',
            initialMessage: '試著 git commit、git branch dev 等指令。'
        },
        checkout: {
            label: 'Checkout',
            name: 'Playground',
            height: 500,
            commitData: [
                { id: 'e137e9b' },
                { id: 'bb92e0e', parent: 'e137e9b', tags: ['master'] },
                { id: 'e088135', parent: 'e137e9b', tags: ['dev'] }
            ],
            description:
                '<span class="cmd">git checkout [分支]</span> 切換分支，之後 commit 會接到該分支上。<br>' +
                '也可 <span class="cmd">git checkout [commit-id]</span> 切到特定 commit（detached HEAD）。<br>' +
                '<span class="cmd">git checkout -b [名稱]</span> 建立分支並立刻切換。',
            initialMessage: '試著 git checkout dev，再 git commit 看看節點往哪走。'
        },
        merge: {
            label: 'Merge',
            name: 'Playground',
            height: 500,
            commitData: [
                { id: 'e137e9b' },
                { id: 'bb92e0e', parent: 'e137e9b', tags: ['master'] },
                { id: 'f5b32c8', parent: 'e137e9b', tags: ['ff'] },
                { id: 'e088135', parent: 'f5b32c8', tags: ['dev'] }
            ],
            description:
                '<span class="cmd">git merge [分支]</span> 把另一條分支的變更合併進目前分支。<br>' +
                '若無分歧會 fast-forward；有分歧則產生 merge commit（兩個 parent）。<br>' +
                '可先 <span class="cmd">git checkout ff</span> 再 <span class="cmd">git merge dev</span> 看 fast-forward。',
            initialMessage: '切到 master 後輸入 git merge dev。'
        },
        rebase: {
            label: 'Rebase',
            name: 'Playground',
            height: 500,
            commitData: [
                { id: 'e137e9b' },
                { id: 'bb92e0e', parent: 'e137e9b', tags: ['master'] },
                { id: 'f5b32c8', parent: 'e137e9b' },
                { id: 'e088135', parent: 'f5b32c8', tags: ['dev'] }
            ],
            currentBranch: 'dev',
            description:
                '<span class="cmd">git rebase [分支]</span> 把目前分支的 commit「接到」目標分支最新處。<br>' +
                '注意 commit ID 會改變；已分享給團隊的 commit 不應 rebase。',
            initialMessage: '在 dev 分支上輸入 git rebase master。'
        },
        reset: {
            label: 'Reset',
            name: 'Playground',
            height: 200,
            baseLine: 0.5,
            commitData: [
                { id: 'e137e9b' },
                { id: '0e70093', parent: 'e137e9b' },
                { id: '3e33afd', parent: '0e70093', tags: ['master'] }
            ],
            description:
                '<span class="cmd">git reset --hard [ref]</span> 把 HEAD 與分支移回指定位置，放棄後面的 commit。<br>' +
                '常用 <span class="cmd">HEAD^</span> 表示上一個 commit。已 push 並與他人共用的歷史請勿 reset。',
            initialMessage: '輸入 git reset HEAD^ 或 git reset --hard HEAD^。'
        },
        revert: {
            label: 'Revert',
            name: 'Playground',
            height: 200,
            baseLine: 0.5,
            commitData: [
                { id: 'e137e9b' },
                { id: '0e70093', parent: 'e137e9b' },
                { id: '3e33afd', parent: '0e70093', tags: ['master'] }
            ],
            description:
                '已 push 的 commit 要用 <span class="cmd">git revert [commit-id]</span> 以新 commit 方式還原，<br>' +
                '而不是 reset。適合團隊協作時安全地撤銷變更。',
            initialMessage: '輸入 git revert 0e70093。'
        },
        deletebranches: {
            label: 'Delete Branches',
            name: 'Playground',
            height: 500,
            baseLine: 0.6,
            commitData: [
                { id: 'e137e9b' },
                { id: 'bb92e0e', parent: 'e137e9b' },
                { id: 'd25ee9b', parent: 'bb92e0e', tags: ['master'] },
                { id: '071ff28', parent: 'e137e9b', tags: ['protoss'] },
                { id: 'f5b32c8', parent: 'bb92e0e' },
                { id: 'e088135', parent: 'f5b32c8', tags: ['zerg'] },
                { id: '9e6c322', parent: 'bb92e0e' },
                { id: '593ae02', parent: '9e6c322', tags: ['terran'] }
            ],
            currentBranch: 'terran',
            description:
                '<span class="cmd">git branch -d [名稱]</span> 刪除已合併的分支。<br>' +
                '下方已預先建立多條分支，試著刪除它們。',
            initialMessage: '試著 git branch -d zerg 等指令刪除分支。'
        },
        fetch: {
            label: 'Fetch',
            name: 'Playground',
            height: 500,
            commitData: [
                { id: 'e137e9b', tags: ['origin/master'] },
                { id: '6ce726f', parent: 'e137e9b' },
                { id: 'bb92e0e', parent: '6ce726f', tags: ['master'] },
                { id: '0cff760', parent: 'e137e9b', tags: ['origin/dev'] },
                { id: '4ed301d', parent: '0cff760', tags: ['dev'] }
            ],
            originData: [
                { id: 'e137e9b' },
                { id: '7eb7654', parent: 'e137e9b' },
                { id: '090e2b8', parent: '7eb7654' },
                { id: 'ee5df4b', parent: '090e2b8', tags: ['master'] },
                { id: '0cff760', parent: 'e137e9b' },
                { id: '2f8d946', parent: '0cff760' },
                { id: '29235ca', parent: '2f8d946', tags: ['dev'] }
            ],
            description:
                '右上方為遠端 origin，左下方為本地。<br>' +
                '<span class="cmd">git fetch</span> 只更新遠端追蹤分支（灰色標籤），不會改動你目前的工作分支。',
            initialMessage: '比對兩邊 commit ID 後，輸入 git fetch。'
        },
        pull: {
            label: 'Pull',
            name: 'Playground',
            height: 500,
            commitData: [
                { id: 'e137e9b', tags: ['origin/master'] },
                { id: '46d095b', parent: 'e137e9b', tags: ['master'] }
            ],
            originData: [
                { id: 'e137e9b' },
                { id: '7eb7654', parent: 'e137e9b' },
                { id: '090e2b8', parent: '7eb7654' },
                { id: 'ee5df4b', parent: '090e2b8', tags: ['master'] }
            ],
            description:
                '<span class="cmd">git pull</span> = fetch + merge，把遠端變更合併到目前分支。<br>' +
                '團隊協作時，開工前常先 pull。',
            initialMessage: '比對兩邊 commit ID 後，輸入 git pull。'
        },
        push: {
            label: 'Push',
            name: 'Playground',
            height: 500,
            commitData: [
                { id: 'e137e9b', tags: ['origin/master'] },
                { id: '46d095b', parent: 'e137e9b', tags: ['master'] }
            ],
            originData: [
                { id: 'e137e9b' },
                { id: '7eb7654', parent: 'e137e9b', tags: ['master'] }
            ],
            description:
                '<span class="cmd">git push</span> 把本地有、遠端沒有的 commit 送到 origin。<br>' +
                '若遠端有你不知道的 commit，push 會被拒絕，需先 pull。',
            initialMessage: '比對兩邊 commit ID 後，輸入 git push。'
        },
        freeplay: {
            label: '自由模式',
            name: 'Playground',
            height: 500,
            staging: true,
            commitData: [
                { id: 'e137e9b', tags: ['origin/master', 'master'] }
            ],
            originData: [
                { id: 'e137e9b' },
                { id: '7eb7654', parent: 'e137e9b' },
                { id: '090e2b8', parent: '7eb7654' },
                { id: 'ee5df4b', parent: '090e2b8', tags: ['master'] }
            ],
            files: [
                { name: 'readme.md', status: 'modified' },
                { name: 'main.js', status: 'untracked' }
            ],
            description:
                '自由操作所有支援的指令，含 <span class="cmd">git add</span>、<span class="cmd">git status</span>。<br>' +
                '左側面板可觀察檔案是否 staged。模擬改檔: <span class="cmd">edit [檔名]</span> · <span class="cmd">touch [檔名]</span><br>' +
                '建議搭配 <a href="../index.html">GitGuide 目錄</a> 一起練習。',
            initialMessage: '自由練習。可先 git status 看看檔案狀態。'
        }
    };
});
