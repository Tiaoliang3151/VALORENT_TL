import os
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ASSETS = os.path.join(ROOT, 'assets')

def compress_image(src_path, max_width=1920, max_height=1080, quality=80, subsampling=2):
    try:
        with Image.open(src_path) as img:
            # Convert to RGB if needed (Pillow can't save RGBA as JPEG)
            if img.mode == 'RGBA':
                img = img.convert('RGB')
            
            # Resize if larger than max dimensions
            width, height = img.size
            if width > max_width or height > max_height:
                ratio = min(max_width / width, max_height / height)
                new_size = (int(width * ratio), int(height * ratio))
                img = img.resize(new_size, Image.LANCZOS)
            
            # Save with compression
            img.save(src_path, 'JPEG', quality=quality, subsampling=subsampling)
            return True
    except Exception as e:
        print(f"  ❌ {os.path.basename(src_path)}: {e}")
        return False

def compress_png(src_path, quality=80):
    try:
        with Image.open(src_path) as img:
            # For PNG, we can use optimize flag
            img.save(src_path, 'PNG', optimize=True, quality=quality)
            return True
    except Exception as e:
        print(f"  ❌ {os.path.basename(src_path)}: {e}")
        return False

def main():
    print("=== 图片压缩工具 ===\n")
    
    # 1. Map splash images (large background images)
    splash_dir = os.path.join(ASSETS, 'maps', 'splash')
    print(f"[1/4] 压缩地图 splash 图片 ({splash_dir})")
    for f in sorted(os.listdir(splash_dir)):
        if f.endswith('.png'):
            src = os.path.join(splash_dir, f)
            old_size = os.path.getsize(src) / 1024
            if compress_image(src, max_width=1200, max_height=800, quality=75):
                new_size = os.path.getsize(src) / 1024
                print(f"  ✅ {f}: {old_size:.1f}KB -> {new_size:.1f}KB ({(1-new_size/old_size)*100:.0f}% reduction)")
    
    # 2. Map overview images
    maps_dir = os.path.join(ASSETS, 'maps')
    print(f"\n[2/4] 压缩地图 overview 图片 ({maps_dir})")
    for f in sorted(os.listdir(maps_dir)):
        if f.endswith('_overview.png'):
            src = os.path.join(maps_dir, f)
            old_size = os.path.getsize(src) / 1024
            if compress_image(src, max_width=1600, max_height=1600, quality=80):
                new_size = os.path.getsize(src) / 1024
                print(f"  ✅ {f}: {old_size:.1f}KB -> {new_size:.1f}KB ({(1-new_size/old_size)*100:.0f}% reduction)")
    
    # 3. Agent portraits
    agents_dir = os.path.join(ASSETS, 'agents')
    print(f"\n[3/4] 压缩英雄头像 ({agents_dir})")
    for f in sorted(os.listdir(agents_dir)):
        if f.endswith('.png'):
            src = os.path.join(agents_dir, f)
            old_size = os.path.getsize(src) / 1024
            if compress_image(src, max_width=512, max_height=512, quality=85):
                new_size = os.path.getsize(src) / 1024
                print(f"  ✅ {f}: {old_size:.1f}KB -> {new_size:.1f}KB ({(1-new_size/old_size)*100:.0f}% reduction)")
    
    # 4. Ability icons
    abilities_dir = os.path.join(ASSETS, 'abilities')
    print(f"\n[4/4] 压缩技能图标 ({abilities_dir})")
    for f in sorted(os.listdir(abilities_dir)):
        if f.endswith('.png'):
            src = os.path.join(abilities_dir, f)
            old_size = os.path.getsize(src) / 1024
            if compress_png(src, quality=80):
                new_size = os.path.getsize(src) / 1024
                print(f"  ✅ {f}: {old_size:.1f}KB -> {new_size:.1f}KB ({(1-new_size/old_size)*100:.0f}% reduction)")
    
    print("\n=== 压缩完成 ===")

if __name__ == '__main__':
    main()
