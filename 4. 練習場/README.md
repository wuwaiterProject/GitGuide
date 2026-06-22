# Git 練習場

視覺化 Git 指令練習工具，靜態網頁、無需後端。

## 使用方式

直接用瀏覽器開啟 `index.html`：

```
4. 練習場/index.html
```

或在本目錄啟動簡易伺服器（部分瀏覽器對 `file://` 載入模組較嚴格，建議用本機伺服器）：

```bash
# Python
cd "4. 練習場"
python -m http.server 8080

# 然後開啟 http://localhost:8080/
```

## 練習項目

與 [高見龍 Git 練習場](https://gitbook.tw/playground#freeplay) 類似：

- Commit、Branch、Checkout、Merge、Rebase
- Reset、Revert、Delete Branches
- Fetch、Pull、Push
- 自由模式

## 技術說明

- 核心引擎：[explain-git-with-d3](https://github.com/onlywei/explain-git-with-d3)（MIT）
- 視覺化：D3.js v3
- 本練習場**不模擬** `git add` / 暫存區，預設檔案皆已 staged

## 授權

見 [LICENSE.md](./LICENSE.md)（上游 MIT 授權）
