"""
Remove background from brain image using rembg
Install: pip install rembg
"""
try:
    from rembg import remove
    from PIL import Image

    def remove_background_rembg(input_path, output_path):
        """Remove background using AI model"""
        input_img = Image.open(input_path)
        output_img = remove(input_img)
        output_img.save(output_path, "PNG")
        print(f"Saved transparent image to: {output_path}")

    if __name__ == "__main__":
        input_file = "public/pozadi.jpeg"
        output_file = "public/mozek.png"

        print("Removing background with AI...")
        remove_background_rembg(input_file, output_file)
        print("Done!")

except ImportError:
    print("ERROR: rembg not installed!")
    print("Please install: pip install rembg")
    print("")
    print("Or use online tool: https://remove.bg")
    print("Then save result as: public/mozek.png")
