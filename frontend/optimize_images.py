import os
from PIL import Image

GALLERY_PATH = "/home/sarthak/mujacm-student-chapter/frontend/public/Gallery"
MAX_WIDTH = 1920
QUALITY = 80

def optimize_images():
    for filename in os.listdir(GALLERY_PATH):
        if filename.lower().endswith(('.jpg', '.jpeg', '.png')):
            filepath = os.path.join(GALLERY_PATH, filename)
            try:
                with Image.open(filepath) as img:
                    # Resize if too large
                    if img.width > MAX_WIDTH:
                        ratio = MAX_WIDTH / img.width
                        new_height = int(img.height * ratio)
                        img = img.resize((MAX_WIDTH, new_height), Image.Resampling.LANCZOS)
                        print(f"Resized {filename} to {MAX_WIDTH}x{new_height}")

                    # Save with optimization
                    img.save(filepath, optimize=True, quality=QUALITY)
                    print(f"Optimized {filename}")
            except Exception as e:
                print(f"Error processing {filename}: {e}")

if __name__ == "__main__":
    optimize_images()
