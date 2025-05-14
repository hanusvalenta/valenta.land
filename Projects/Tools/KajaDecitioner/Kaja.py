import tkinter as tk
from tkinter import messagebox
import random

class RandomFieldSelector:
    def __init__(self, root):
        self.root = root
        self.root.title("Kaja decition maker")
        self.root.geometry("500x500")
        self.root.configure(bg='#f0f8ff')
        
        self.style = {
            'font': ('Helvetica', 12),
            'bg': '#f0f8ff',
            'button_bg': '#4a7a8c',
            'button_fg': 'white',
            'button_active': '#3a6a7c',
            'entry_bg': 'white',
            'highlight': '#fffacd'
        }
        
        self.header = tk.Label(root, text="Enter your choices below:", 
                             font=('Helvetica', 16, 'bold'), bg=self.style['bg'])
        self.header.pack(pady=20)
        
        self.input_frame = tk.Frame(root, bg=self.style['bg'])
        self.input_frame.pack(pady=10)
        
        self.input_fields = []
        self.add_field()
        
        self.add_button = tk.Button(root, text="➕ Add Option", 
                                  command=self.add_field,
                                  font=self.style['font'],
                                  bg=self.style['button_bg'],
                                  fg=self.style['button_fg'],
                                  activebackground=self.style['button_active'])
        self.add_button.pack(pady=10)
        
        self.select_button = tk.Button(root, text="🎲 Pick Random!", 
                                     command=self.random_select,
                                     font=('Helvetica', 14, 'bold'),
                                     bg='#6b8e23',
                                     fg='white',
                                     activebackground='#5a7d12',
                                     padx=20,
                                     pady=10)
        self.select_button.pack(pady=20)
        
        self.result_label = tk.Label(root, text="", 
                                   font=('Helvetica', 14, 'bold'),
                                   bg=self.style['bg'],
                                   fg='#2e8b57')
        self.result_label.pack(pady=10)
    
    def add_field(self):
        frame = tk.Frame(self.input_frame, bg=self.style['bg'])
        frame.pack(fill=tk.X, pady=5)
        
        entry = tk.Entry(frame, 
                        font=self.style['font'],
                        bg=self.style['entry_bg'],
                        relief=tk.GROOVE,
                        borderwidth=2)
        entry.pack(side=tk.LEFT, expand=True, fill=tk.X, padx=5)
        
        remove_btn = tk.Button(frame, text="✕", 
                             command=lambda: self.remove_field(frame),
                             font=('Helvetica', 10),
                             bg='#ff6b6b',
                             fg='white',
                             activebackground='#ff5252',
                             width=3)
        remove_btn.pack(side=tk.RIGHT)
        
        self.input_fields.append((frame, entry))
    
    def remove_field(self, frame):
        for i, (f, entry) in enumerate(self.input_fields):
            if f == frame:
                frame.destroy()
                self.input_fields.pop(i)
                break
    
    def random_select(self):
        if not self.input_fields:
            messagebox.showwarning("Oops", "Please add at least one option!")
            return
        
        non_empty = [(entry.get(), idx) for idx, (frame, entry) in enumerate(self.input_fields) if entry.get().strip()]
        
        if not non_empty:
            messagebox.showwarning("Oops", "All fields are empty!")
            return
        
        selected_text, selected_idx = random.choice(non_empty)
        
        for idx, (frame, entry) in enumerate(self.input_fields):
            if idx == selected_idx:
                entry.config(bg=self.style['highlight'])
                self.root.after(1500, lambda: entry.config(bg=self.style['entry_bg']))
        
        self.result_label.config(text=f"Selected: {selected_text}")

if __name__ == "__main__":
    root = tk.Tk()
    app = RandomFieldSelector(root)
    root.mainloop()