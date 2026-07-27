import os
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ASSETS = os.path.join(ROOT, 'assets')

def compress_png(src_path, quality=70):
    try:
        with Image.open(src_path) as img:
            img.save(src_path, 'PNG', optimize=True, quality=quality)
            return True
    except Exception as e:
        print(f"  ❌ {os.path.basename(src_path)}: {e}")
        return False

def main():
    print("=== 重新压缩 overview 图片（保持 PNG 格式）===\n")
    
    maps_dir = os.path.join(ASSETS, 'maps')
    for f in sorted(os.listdir(maps_dir)):
        if f.endswith('_overview.png'):
            src = os.path.join(maps_dir, f)
            old_size = os.path.getsize(src) / 1024
            if compress_png(src, quality=70):
                new_size = os.path.getsize(src) / 1024
                print(f"  ✅ {f}: {old_size:.1f}KB -> {new_size:.1f}KB ({(1-new_size/old_size)*100:.0f}% reduction)")
    
    print("\n=== 完成 ===")

if __name__ == '__main__':
    main()
