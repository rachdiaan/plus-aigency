from PIL import Image

def optimize_favicon():
    try:
        img = Image.open('public/logo.png')
        if img.mode != 'RGBA':
            img = img.convert('RGBA')
            
        width, height = img.size
        new_size = max(width, height)
        
        # Create a new square image with transparent background
        new_img = Image.new('RGBA', (new_size, new_size), (0, 0, 0, 0))
        
        # Paste original image in center
        paste_x = (new_size - width) // 2
        paste_y = (new_size - height) // 2
        new_img.paste(img, (paste_x, paste_y))
        
        # Resize to standard favicon size (e.g., 512x512 for high resolution)
        final_img = new_img.resize((512, 512), Image.Resampling.LANCZOS)
        
        final_img.save('public/favicon.png')
        print("Success: Created optimized public/favicon.png")
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    optimize_favicon()
