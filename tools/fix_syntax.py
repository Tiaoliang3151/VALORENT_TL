import re

with open('js/data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. 先找出所有包含占位符英雄ID的点位对象（深度匹配{...}）
# 把整个文本按字符处理：扫描每个 {，如果其内部的 "id": "xxx_miks_..." 或包含 /(miks|veto|tejo|waylay)/ 就删掉这个对象
# 更安全的是：把 LINEUPS 部分单独处理
lineups_start = content.find('const LINEUPS = {')
before = content[:lineups_start]
lineups = content[lineups_start:]

def remove_bad_objects(text, bad_words):
    """删除包含 bad_words 中关键字的顶层 {...} 对象"""
    result = []
    i = 0
    n = len(text)
    while i < n:
        if text[i] == '{':
            # 找到匹配的 }
            depth = 1
            start = i
            i += 1
            while i < n and depth > 0:
                if text[i] == '{':
                    depth += 1
                elif text[i] == '}':
                    depth -= 1
                i += 1
            obj_text = text[start:i]  # 包含 { 和 }
            bad = False
            for w in bad_words:
                if ('"' + w + '"') in obj_text or ('_' + w + '_') in obj_text:
                    bad = True
                    break
            if not bad:
                result.append(obj_text)
            # 跳过对象之后的逗号、换行、空格
            while i < n and text[i] in ' \t\r\n,':
                i += 1
        else:
            result.append(text[i])
            i += 1
    return ''.join(result)

bad_ids = ["miks", "veto", "tejo", "waylay"]
# 只在 LINEUPS 里执行对象删除（避免影响AGENTS/MAPS/ROLES）
# 简单处理：先找到顶层结构中的对象（不一定完美，但能处理点位）
lineups2 = remove_bad_objects(lineups, bad_ids)

content = before + lineups2

# 2. 清理剩下的"孤儿闭合符"，比如:  ],\n\n  },\n  {  (最后一个{被删了，剩下 },)
# 但我们的 remove_bad_objects 已经处理了逗号，现在再处理模式:
#   "xxx": [\s*],\s*,\s*\n  ->  "xxx": [\s*],\n  (去掉多余逗号)
# 或者 "xxx": [ 后面空的？不太可能

# 3. 再处理孤立的 }, 后面直接跟 }, 或 ]/}
content = re.sub(r'\},\s*\n\s*\},', '},\n', content)
content = re.sub(r'\},\s*\n\s*\}', '}\n}', content)

with open('js/data.js', 'w', encoding='utf-8') as f:
    f.write(content)
print('处理完成，请再验证语法')
