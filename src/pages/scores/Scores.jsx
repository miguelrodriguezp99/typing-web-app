import { useEffect, useState } from "react";

export const scores = async () => {
  const response = await fetch("http://localhost:8080/scores");
  const data = await response.json();
  return data;
};

const Scores = () => {
  const [scores, setScores] = useState([]);

  //async useEffect
  useEffect(() => {
    const fetchScores = async () => {
      const res = await fetch("http://localhost:8080/scores");
      const data = await res.json();
      console.log(data.data);
      // me devuelve un objeto
      //asi que ahora tengo que recorrerlo
      setScores(data.data);
    };
    fetchScores();
  }, []);

  return (
    <div className="bg-red-50 h-full">
      {scores.map((score) => {
        return (
          <div className="flex flex-row" key={score.id}>
            <p>{score.id}</p>
            <p>{score.score}</p>
            <p>{score.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Scores;
