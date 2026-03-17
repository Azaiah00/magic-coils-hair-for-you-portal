from PIL import Image

def remove_black_background(input_path, output_path, tolerance=30):
    try:
        img = Image.open(input_path).convert("RGBA")
        data = img.getdata()
        
        new_data = []
        for item in data:
            # item is (R, G, B, A)
            if item[0] <= tolerance and item[1] <= tolerance and item[2] <= tolerance:
                new_data.append((0, 0, 0, 0))
            else:
                new_data.append(item)
                
        img.putdata(new_data)
        img.save(output_path, "PNG")
        print("Success")
    except Exception as e:
        print(f"Error: {e}")

remove_black_background("public/magic-coils-logo.png", "public/magic-coils-logo-transparent.png")
