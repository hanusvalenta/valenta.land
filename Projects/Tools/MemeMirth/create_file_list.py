import os
import json

def create_file_list(folder_path, json_file_path):
    if not os.path.exists(folder_path):
        print(f"Error: Folder '{folder_path}' does not exist.")
        return

    files = [f for f in os.listdir(folder_path) if os.path.isfile(os.path.join(folder_path, f))]

    with open(json_file_path, 'w') as json_file:
        json.dump(files, json_file)

if __name__ == "__main__":
    current_folder = os.path.dirname(os.path.abspath(__file__))
    library_folder = os.path.join(current_folder, "static", "Library")
    json_file = os.path.join(current_folder, "file_list.json")

    create_file_list(library_folder, json_file)
    print(f"File list created and saved to {json_file}")
