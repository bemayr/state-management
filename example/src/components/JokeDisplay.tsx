import type { JokeResult } from "../types/state";

interface JokeDisplayProps {
  joke: JokeResult;
}

export function JokeDisplay({ joke }: JokeDisplayProps) {
  if (joke.status === "idle") return null;

  return (
    <div className={`joke-display joke-${joke.status}`}>
      {joke.status === "loading" && <span className="joke-loading">Fetching a dad joke...</span>}
      {joke.status === "success" && <p className="joke-text">{joke.joke}</p>}
      {joke.status === "error" && <p className="joke-error">Error: {joke.error}</p>}
    </div>
  );
}
