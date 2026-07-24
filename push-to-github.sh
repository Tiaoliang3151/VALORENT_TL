#!/bin/bash
# 推送更新到 GitHub
# 运行前请确保你已配置好 GitHub 凭据（SSH key 或 Personal Access Token）

cd "$(dirname "$0")"

echo "=== 检查更新 ==="
git status

echo ""
echo "=== 推送更改 ==="
git push origin main

echo ""
echo "=== 完成 ==="
echo "网站将在几分钟后自动更新： https://tiaoliang3151.github.io/VALORENT_TL/"
