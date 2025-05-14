import tkinter as tk
from tkinter import messagebox
import random

class RandomFieldSelector:
    def __init__(self, root):
        self.root = root
        self.root.title("Random Field Selector")
        
        # Top text label
        self.header = tk.Label(root, text="Enter your options below:", font=('Arial', 14))
        self.header.pack(pady=10)
        
        # Frame for input fields
        self.input_frame = tk.Frame(root)
        self.input_frame.pack(pady=10)
        
        # List to store input fields
        self.input_fields = []
        
        # Add initial field
        self.add_field()
        
        # Button to add more fields
        self.add_button = tk.Button(root, text="Add Another Field", command=self.add_field)
        self.add_button.pack(pady=5)
        
        # Button to randomly select a field
        self.select_button = tk.Button(root, text="Randomly Select!", command=self.random_select, bg='lightblue', font=('Arial', 12))
        self.select_button.pack(pady=20)
        
        # Label to display selection
        self.result_label = tk.Label(root, text="", font=('Arial', 12, 'bold'))
        self.result_label.pack(pady=10)
    
    def add_field(self):
        """Add a new input field to the window"""
        frame = tk.Frame(self.input_frame)
        frame.pack(fill=tk.X, pady=2)
        
        entry = tk.Entry(frame)
        entry.pack(side=tk.LEFT, expand=True, fill=tk.X)
        
        remove_btn = tk.Button(frame, text="×", command=lambda: self.remove_field(frame))
        remove_btn.pack(side=tk.RIGHT)
        
        self.input_fields.append((frame, entry))
    
    def remove_field(self, frame):
        """Remove a field from the window"""
        for i, (f, entry) in enumerate(self.input_fields):
            if f == frame:
                frame.destroy()
                self.input_fields.pop(i)
                break
    
    def random_select(self):
        """Randomly select one of the input fields and display its content"""
        if not self.input_fields:
            messagebox.showwarning("Warning", "Please add at least one field!")
            return
        
        # Get non-empty fields
        non_empty = [(entry.get(), idx) for idx, (frame, entry) in enumerate(self.input_fields) if entry.get().strip()]
        
        if not non_empty:
            messagebox.showwarning("Warning", "All fields are empty!")
            return
        
        # Random selection
        selected_text, selected_idx = random.choice(non_empty)
        
        # Highlight the selected field temporarily
        for idx, (frame, entry) in enumerate(self.input_fields):
            if idx == selected_idx:
                entry.config(bg='yellow')
                self.root.after(1500, lambda: entry.config(bg='white'))
        
        # Display the result
        self.result_label.config(text=f"Selected: {selected_text}")

if __name__ == "__main__":
    root = tk.Tk()
    root.geometry("500x400")
    app = RandomFieldSelector(root)
    root.mainloop()