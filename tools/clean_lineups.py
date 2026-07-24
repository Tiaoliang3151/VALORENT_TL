import re

with open('js/data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 找到 LINEUPS 的起始位置
lineups_start = content.find('const LINEUPS = {')
if lineups_start < 0:
    print('ERROR: LINEUPS not found')
    exit(1)

before_lineups = content[:lineups_start]
lineups_section = content[lineups_start:]

# 把 LINEUPS 部分当作独立的代码块，我们做字符串处理
# 目标：删除 4 个占位符英雄的所有条目
for aid in ["miks", "veto", "tejo", "waylay"]:
    # 模式: "aid": [ ... ],
    # 由于点位数组可能非常大，我们用括号深度匹配
    pattern = r'"\s*' + re.escape(aid) + r'"\s*:\s*\['
    match = re.search(pattern, lineups_section)
    while match:
        start = match.start()
        # 找到 '[' 的位置
        bracket_start = lineups_section.find('[', match.start())
        depth = 1
        i = bracket_start + 1
        while i < len(lineups_section) and depth > 0:
            if lineups_section[i] == '[':
                depth += 1
            elif lineups_section[i] == ']':
                depth -= 1
            i += 1
        bracket_end = i  # 此时 ] 已消费
        # 跳过后面的可选逗号和空白
        while bracket_end < len(lineups_section) and (lineups_section[bracket_end] in ' \t\r\n,'):
            bracket_end += 1
        removed_text = lineups_section[start:bracket_end]
        print(f'  清理 {aid}: {start}-{bracket_end}, 删除 {len(removed_text)} 字符, {removed_text[:50]}...')
        lineups_section = lineups_section[:start] + lineups_section[bracket_end:]
        # 继续搜索下一处
        match = re.search(pattern, lineups_section)

content = before_lineups + lineups_section

# 再处理"孤立"的语法错误 - 可能有 "    ],\n      },\n      {" 这种情况（多余的 ] 和 },）
# 让我们做简单修复：任何连续出现 2+ }/]/, 的混乱部分规范下
# 但更安全的是先保存并验证语法
with open('js/data.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("\nLINEUPS 清理完成，请再验证语法")
