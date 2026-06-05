import os
import collections
from PIL import Image

def get_dominant_colors(image_path, num_colors=10):
    img = Image.open(image_path)
    # Resize to speed up and smooth
    img = img.resize((300, 200))
    img = img.convert('RGB')
    
    pixels = list(img.getdata())
    counter = collections.Counter(pixels)
    
    # Get most common colors
    common = counter.most_common(50)
    
    # Filter colors that are very close to each other (deduplicate)
    unique_colors = []
    for rgb, count in common:
        # Check if too close to already selected
        too_close = False
        for u_rgb in unique_colors:
            dist = sum((a - b) ** 2 for a, b in zip(rgb, u_rgb)) ** 0.5
            if dist < 30: # distance threshold
                too_close = True
                break
        if not too_close:
            unique_colors.append(rgb)
            if len(unique_colors) >= num_colors:
                break
                
    return unique_colors

# Inspect extracted images
images = [f for f in os.listdir('d:\\rithika') if f.startswith('image_p18') or f.startswith('image_p19') or f.startswith('image_p20')]
for img_name in sorted(images):
    path = os.path.join('d:\\rithika', img_name)
    colors = get_dominant_colors(path)
    hex_colors = [f"#{r:02x}{g:02x}{b:02x}" for r, g, b in colors]
    print(f"{img_name}: {hex_colors}")
