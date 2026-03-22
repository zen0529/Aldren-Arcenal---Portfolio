import React, { useEffect, useRef, useState } from "react";

interface GameObject {
  x: number;
  y: number;
  width: number;
  height: number;
  velocityX?: number;
  velocityY?: number;
}

interface Enemy extends GameObject {
  health: number;
}

interface Bullet extends GameObject {
  velocityY: number;
}

interface Particle extends GameObject {
  life: number;
  velocityX: number;
  velocityY: number;
  opacity: number;
}

interface GameState {
  player: GameObject & { health: number; velocityX: number };
  bullets: Bullet[];
  enemies: Enemy[];
  particles: Particle[];
  score: number;
  gameOver: boolean;
  wave: number;
  waveTimer: number;
  keys: Record<string, boolean>;
  lastShot: number;
}

const SpaceShooter: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState({
    score: 0,
    gameOver: false,
    wave: 1,
    health: 100,
  });
  const gameRef = useRef({
    player: { x: 0, y: 0, width: 30, height: 40, health: 100, velocityX: 0 },
    bullets: [] as Bullet[],
    enemies: [] as Enemy[],
    particles: [] as Particle[],
    score: 0,
    gameOver: false,
    wave: 1,
    waveTimer: 0,
    keys: {} as Record<string, boolean>,
    lastShot: 0,
  });

  // Initialize game
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set initial player position
    gameRef.current.player = {
      x: canvas.width / 2 - 15,
      y: canvas.height - 60,
      width: 30,
      height: 40,
      health: 100,
      velocityX: 0,
    };

    // Spawn initial enemies
    spawnEnemies(gameRef.current, canvas.width, canvas.height);

    // Event listeners
    const handleKeyDown = (e: KeyboardEvent) => {
      gameRef.current.keys[e.key.toLowerCase()] = true;
      if (e.key === " ") e.preventDefault();
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      gameRef.current.keys[e.key.toLowerCase()] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Game loop
    const gameLoop = setInterval(() => {
      if (!canvas) return;
      update(gameRef.current, canvas.width, canvas.height);
      render(ctx, gameRef.current, canvas.width, canvas.height);
      setGameState({
        score: gameRef.current.score,
        gameOver: gameRef.current.gameOver,
        wave: gameRef.current.wave,
        health: gameRef.current.player.health,
      });
    }, 1000 / 60);

    return () => {
      clearInterval(gameLoop);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const update = (
    game: GameState,
    canvasWidth: number,
    canvasHeight: number
  ) => {
    if (game.gameOver) return;

    const player = game.player;
    const speed = 5;

    // Player movement
    if (game.keys["a"] || game.keys["arrowleft"]) {
      player.x = Math.max(0, player.x - speed);
    }
    if (game.keys["d"] || game.keys["arrowright"]) {
      player.x = Math.min(canvasWidth - player.width, player.x + speed);
    }

    // Shooting
    if ((game.keys[" "] || game.keys["w"]) && Date.now() - game.lastShot > 150) {
      game.bullets.push({
        x: player.x + player.width / 2 - 2,
        y: player.y,
        width: 4,
        height: 10,
        velocityY: -8,
      });
      game.lastShot = Date.now();
    }

    // Update bullets
    game.bullets = game.bullets.filter((bullet: Bullet) => {
      bullet.y += bullet.velocityY;
      return bullet.y > -10;
    });

    // Update enemies
    game.enemies.forEach((enemy: Enemy) => {
      enemy.x += (enemy.velocityX || 2);
      if (enemy.x <= 0 || enemy.x + enemy.width >= canvasWidth) {
        enemy.velocityX = -(enemy.velocityX || 2);
      }
      enemy.y += 0.5;
    });

    // Remove off-screen enemies
    game.enemies = game.enemies.filter((e: Enemy) => e.y < canvasHeight);

    // Collision detection: bullets vs enemies
    game.bullets.forEach((bullet: Bullet, bIndex: number) => {
      game.enemies.forEach((enemy: Enemy, eIndex: number) => {
        if (isColliding(bullet, enemy)) {
          // Create explosion particles
          for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            game.particles.push({
              x: enemy.x + enemy.width / 2,
              y: enemy.y + enemy.height / 2,
              width: 3,
              height: 3,
              velocityX: Math.cos(angle) * 3,
              velocityY: Math.sin(angle) * 3,
              life: 30,
              opacity: 1,
            });
          }

          game.bullets.splice(bIndex, 1);
          enemy.health -= 25;

          if (enemy.health <= 0) {
            game.enemies.splice(eIndex, 1);
            game.score += 100;
          }
        }
      });
    });

    // Update particles
    game.particles = game.particles.filter((particle: Particle) => {
      particle.x += particle.velocityX;
      particle.y += particle.velocityY;
      particle.life--;
      particle.opacity = particle.life / 30;
      return particle.life > 0;
    });

    // Collision detection: enemies vs player
    game.enemies.forEach((enemy: Enemy) => {
      if (isColliding(player, enemy)) {
        player.health -= 5;
        if (player.health <= 0) {
          game.gameOver = true;
        }
      }
    });

    // Wave management
    if (game.enemies.length === 0) {
      game.waveTimer++;
      if (game.waveTimer > 120) {
        game.wave++;
        game.waveTimer = 0;
        spawnEnemies(game, canvasWidth, canvasHeight, game.wave);
      }
    }
  };

  const render = (
    ctx: CanvasRenderingContext2D,
    game: GameState,
    canvasWidth: number,
    canvasHeight: number
  ) => {
    // Clear canvas
    ctx.fillStyle = "rgba(5, 15, 35, 0.3)";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Draw stars background
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    for (let i = 0; i < 50; i++) {
      const x = (i * 137 + game.score) % canvasWidth;
      const y = (i * 73) % canvasHeight;
      ctx.fillRect(x, y, 1, 1);
    }

    // Draw player
    const player = game.player;
    ctx.save();
    ctx.translate(player.x + player.width / 2, player.y + player.height / 2);
    ctx.fillStyle = "#00ff88";
    ctx.fillRect(-15, -20, 30, 40);
    ctx.fillStyle = "#00cc66";
    ctx.fillRect(-12, -15, 24, 25);
    ctx.fillRect(-8, 10, 16, 10);
    ctx.restore();

    // Draw bullets
    ctx.fillStyle = "#ffff00";
    game.bullets.forEach((bullet: Bullet) => {
      ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(bullet.x + 1, bullet.y + 1, 2, 2);
      ctx.fillStyle = "#ffff00";
    });

    // Draw enemies
    game.enemies.forEach((enemy: Enemy) => {
      ctx.fillStyle = "#ff4444";
      const healthPercent = enemy.health / 100;
      ctx.globalAlpha = Math.max(0.5, healthPercent);

      // Enemy shape
      ctx.beginPath();
      ctx.moveTo(enemy.x + enemy.width / 2, enemy.y);
      ctx.lineTo(enemy.x + enemy.width, enemy.y + enemy.height);
      ctx.lineTo(enemy.x + enemy.width / 2, enemy.y + enemy.height - 5);
      ctx.lineTo(enemy.x, enemy.y + enemy.height);
      ctx.closePath();
      ctx.fill();

      ctx.globalAlpha = 1;

      // Health bar
      ctx.fillStyle = "#ff4444";
      ctx.fillRect(enemy.x, enemy.y - 8, enemy.width, 3);
      ctx.fillStyle = "#00ff00";
      ctx.fillRect(enemy.x, enemy.y - 8, (enemy.width * healthPercent) / 1, 3);
    });

    // Draw particles
    game.particles.forEach((particle: Particle) => {
      ctx.fillStyle = `rgba(255, 200, 0, ${particle.opacity})`;
      ctx.fillRect(particle.x, particle.y, particle.width, particle.height);
    });

    // Draw HUD
    ctx.fillStyle = "#00ff88";
    ctx.font = "bold 20px monospace";
    ctx.fillText(`Wave: ${game.wave}`, 20, 30);
    ctx.fillText(`Score: ${game.score}`, canvasWidth - 200, 30);
    ctx.fillText(`Health: ${Math.max(0, game.player.health)}`, 20, 60);

    // Game over screen
    if (game.gameOver) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      ctx.fillStyle = "#ff4444";
      ctx.font = "bold 60px monospace";
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER", canvasWidth / 2, canvasHeight / 2 - 40);

      ctx.fillStyle = "#00ff88";
      ctx.font = "bold 40px monospace";
      ctx.fillText(`Final Score: ${game.score}`, canvasWidth / 2, canvasHeight / 2 + 40);
      ctx.fillText(`Wave Reached: ${game.wave}`, canvasWidth / 2, canvasHeight / 2 + 90);

      ctx.fillStyle = "#ffffff";
      ctx.font = "20px monospace";
      ctx.fillText("Press R to Restart", canvasWidth / 2, canvasHeight / 2 + 150);
      ctx.textAlign = "left";
    }
  };

  const isColliding = (rect1: GameObject, rect2: GameObject) => {
    return (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y
    );
  };

  const spawnEnemies = (
    game: GameState,
    canvasWidth: number,
    _canvasHeight: number,
    wave: number = 1
  ) => {
    const enemyCount = 3 + wave * 2;
    for (let i = 0; i < enemyCount; i++) {
      game.enemies.push({
        x: (canvasWidth / (enemyCount + 1)) * (i + 1),
        y: 40,
        width: 30,
        height: 30,
        health: 100,
        velocityX: 2 + wave * 0.5,
      });
    }
  };

  const handleRestart = () => {
    gameRef.current = {
      player: { x: 0, y: 0, width: 30, height: 40, health: 100, velocityX: 0 },
      bullets: [],
      enemies: [],
      particles: [],
      score: 0,
      gameOver: false,
      wave: 1,
      waveTimer: 0,
      keys: {},
      lastShot: 0,
    };
    
    const canvas = canvasRef.current;
    if (canvas) {
      gameRef.current.player.x = canvas.width / 2 - 15;
      gameRef.current.player.y = canvas.height - 60;
      spawnEnemies(gameRef.current, canvas.width, canvas.height);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "r" && gameState.gameOver) {
        handleRestart();
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [gameState.gameOver]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 flex flex-col items-center justify-center p-4">
      <div className="mb-4">
        <h2 className="text-4xl font-bold text-cyan-400 mb-2">SPACE SHOOTER</h2>
        <p className="text-cyan-300 text-center">
          Use A/D or Arrow Keys to move • Space or W to shoot
        </p>
      </div>
      
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        className="border-4 border-cyan-400 shadow-lg shadow-cyan-500/50 bg-black"
      />
      
      <div className="mt-6 text-center">
        <p className="text-cyan-300 mb-4">
          Score: <span className="text-yellow-400 font-bold text-xl">{gameState.score}</span> | 
          Wave: <span className="text-yellow-400 font-bold text-xl">{gameState.wave}</span> | 
          Health: <span className="text-yellow-400 font-bold text-xl">{Math.max(0, gameState.health)}</span>
        </p>
        {gameState.gameOver && (
          <button
            onClick={handleRestart}
            className="px-6 py-2 bg-cyan-500 text-black font-bold rounded-lg hover:bg-cyan-400 transition"
          >
            Play Again
          </button>
        )}
      </div>
    </div>
  );
};

export default SpaceShooter;
