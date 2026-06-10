import sys
from PIL import Image

def get_colors():
    img = Image.open('Color Pallet.jpeg')
    print("Image size:", img.size)
    # Let's sample along a vertical line in the center of the image
    width, height = img.size
    center_x = width // 2
    
    # We will sample multiple points vertically to find the colors
    # and print their hex values
    for y in range(0, height, 10):
        pixel = img.getpixel((center_x, y))
        # Print RGB and Hex
        hex_val = '#{:02x}{:02x}{:02x}'.format(*pixel[:3])
        print(f"y={y}: {hex_val}")

if __name__ == '__main__':
    get_colors()
