import re
from collections import Counter

with open('js/data.js', 'r', encoding='utf-8') as f:
    content = f.read()

print('=== 1. 重复ID检查 ===')
id_pattern = r'id:\s*"([^"]+)"'
ids = re.findall(id_pattern, content)
id_counts = Counter(ids)
duplicates = {k: v for k, v in id_counts.items() if v > 1}
if duplicates:
    for k, v in duplicates.items():
        print(f'  {k}: 出现 {v} 次')
else:
    print('  无重复ID')
print(f'  总ID数: {len(ids)}, 唯一ID数: {len(set(ids))}')

print('\n=== 2. tags字段统计 ===')
empty_tags = len(re.findall(r'tags:\s*\[\s*\]', content))
total_tags = len(re.findall(r'tags:\s*\[', content))
print(f'  总tags数: {total_tags}, 空tags数: {empty_tags}')
if total_tags > 0:
    print(f'  空占比: {empty_tags/total_tags*100:.1f}%')

print('\n=== 3. LINEUPS中简单坐标描述 ===')
simple_desc_count = 0
total_abilities = 0
desc_simple = r'"desc":\s*"站位: \([0-9.\s,]+\)"'
cross_simple = r'"crosshair":\s*"技能落点: \([0-9.\s,]+\)"'
for line in content.split('\n'):
    if '"ability"' in line and '"name"' in line:
        total_abilities += 1
    if re.search(desc_simple, line) or re.search(cross_simple, line):
        simple_desc_count += 1
print(f'  简单坐标描述行数: {simple_desc_count}')

print('\n=== 4. 占位符英雄（技能为默认"技能C/Q/E"）===')
placeholder_pattern = r'\{\s*id:\s*"([^"]+)",\s*name:\s*"([^"]+)",[\s\S]*?"技能C"[\s\S]*?"技能Q"[\s\S]*?"技能E"[\s\S]*?\}\s*\],?'
matches = re.findall(placeholder_pattern, content)
for aid, aname in matches:
    print(f'  {aid} ({aname})')

print('\n=== 5. 空的 commonSmokes / wallbangs 地图 ===')
map_sections = re.split(r'\{\s*id:\s*"([a-z]+)",', content)[1:]
for i in range(0, len(map_sections), 2):
    if i+1 >= len(map_sections):
        break
    mid = map_sections[i]
    mbody = map_sections[i+1]
    smokes_match = re.search(r'commonSmokes:\s*\[\s*\]', mbody)
    walls_match = re.search(r'wallbangs:\s*\[\s*\]', mbody)
    name_match = re.search(r'name:\s*"([^"]+)"', mbody)
    mname = name_match.group(1) if name_match else mid
    empty_parts = []
    if smokes_match:
        empty_parts.append('烟位空')
    if walls_match:
        empty_parts.append('穿墙空')
    if empty_parts:
        print(f'  {mid} ({mname}): {", ".join(empty_parts)}')

print('\n=== 6. 资源文件冗余检查 ===')
import os
print('  maps/ 目录（旧版目录，未被MAPS引用）:')
for f in os.listdir('maps'):
    print(f'    - {f}')
print('\n  assets/agents/portrait/ 有头像，assets/agents/ 根目录也有头像（可能重复）:')
root_agents = set()
portrait_agents = set()
if os.path.exists('assets/agents'):
    for f in os.listdir('assets/agents'):
        if f.endswith('.png'):
            root_agents.add(f)
if os.path.exists('assets/agents/portrait'):
    for f in os.listdir('assets/agents/portrait'):
        if f.endswith('.png'):
            portrait_agents.add(f)
common = root_agents & portrait_agents
if common:
    print(f'    两套目录都有的头像: {len(common)} 个')
    for f in sorted(common)[:5]:
        print(f'      - {f}')
    if len(common) > 5:
        print(f'      ... 等共 {len(common)} 个')

print('\n=== 7. LINEUPS 与 MAPS.image 引用差异 ===')
map_ids_in_maps = set(re.findall(r'const MAPS\s*=\s*\[[\s\S]*?id:\s*"([a-z]+)"', content))
lineup_keys = set()
lineup_section = content[content.find('const LINEUPS'):]
for match in re.finditer(r'"([a-z]+)":\s*\{', lineup_section):
    lineup_keys.add(match.group(1))
print(f'  MAPS中定义的地图: {len(map_ids_in_maps)} 个')
print(f'  LINEUPS中有数据的地图: {len(lineup_keys & map_ids_in_maps)} 个')
no_lineups = map_ids_in_maps - lineup_keys
if no_lineups:
    print(f'  LINEUPS中无任何英雄数据的地图: {sorted(no_lineups)}')
