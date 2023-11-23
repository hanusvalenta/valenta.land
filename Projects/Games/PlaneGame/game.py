import pygame
import random
import subprocess

# Initialize Pygame
pygame.init()

# Set up the game window
WIDTH = 1000
HEIGHT = 900
win = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Plane Game")

# Load background image
background = pygame.image.load('city.jpg').convert()
background = pygame.transform.smoothscale(background, (1000, 900))

pygame_icon = pygame.image.load('osama.ico')
pygame.display.set_icon(pygame_icon)

# Define colors
BACKGROUND = (0, 20, 50)
WHITE = (255, 255, 255)

#Score counter
class Score:
    def __init__(self):
        self.score = 0
        self.font = pygame.font.SysFont("Arial", 50)

    def draw(self):
        score_img = self.font.render("Score: " + str(self.score), True, WHITE)
        win.blit(score_img, (100, 100))

# Bird class
class Bird:
    def __init__(self):
        self.x = 100
        self.y = HEIGHT // 2
        self.vel = 0
        self.gravity = 0.5
        self.plane_img = pygame.image.load("plane.png")  # Replace "plane.png" with the actual path to your plane image
        self.plane_img = pygame.transform.scale(self.plane_img, (200, 200))  # Resize the plane image

    def jump(self):
        self.vel = -10

    def move(self):
        self.vel += self.gravity
        self.y += self.vel

    def draw(self):
        win.blit(self.plane_img, (self.x, self.y))

# Pipe class
class Pipe:
    def __init__(self, x):
        self.x = x
        self.height = random.randint(100, 400)
        self.gap = 500
        self.pipe_img = pygame.image.load("twins.png")  # Replace "twins.png" with the actual path to your pipe image

    def move(self):
        self.x -= 5

    def draw(self):
        pipe_top = pygame.transform.scale(self.pipe_img, (500, self.height))
        pipe_bottom = pygame.transform.scale(self.pipe_img, (500, HEIGHT - self.height - self.gap))
        win.blit(pipe_top, (self.x, 0))
        win.blit(pipe_bottom, (self.x, self.height + self.gap))

    def collision(self, bird):
        if bird.y < 0 or bird.y > HEIGHT or (bird.x + 20 > self.x and bird.x < self.x + 50 and (bird.y < self.height or bird.y + 20 > self.height + self.gap)):
            return True
        return False

# Game loop
def game_loop():
    bird = Bird()
    pipes = [Pipe(WIDTH)]
    score = Score()
    score = 0
    clock = pygame.time.Clock()
    running = True

    while running:
        clock.tick(30)

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            elif event.type == pygame.KEYDOWN:
                if event.key == pygame.K_SPACE:
                    bird.jump()

        bird.move()

        for pipe in pipes:
            pipe.move()
            if pipe.x + 50 < 0:
                pipes.remove(pipe)
            if pipe.collision(bird):
                subprocess.call("quit.bat", shell=True)
                running = False
            if pipe.x == bird.x:
                score += 1

        if len(pipes) < 2:
            pipes.append(Pipe(WIDTH))

        win.blit(background, (0, 0))
        bird.draw()
        for pipe in pipes:
            pipe.draw()

        pygame.display.update()

    pygame.quit()

# Start the game
game_loop()