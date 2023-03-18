import { CanceledError } from "axios";
import { useState, useEffect } from "react";
import apiClients from "../services/api-clients";

export interface PlatForm{
    id:number;
    name:string;
    slug:string
}
export interface Game {
  id: number;
  name: string;
  background_image:string;
  parent_platforms:{platform:PlatForm}[]
  metacritic:number
}

interface FetchGameResponse {
  count: number;
  results: Game[];
}
const useGames = ()=>{
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()
    apiClients
      .get<FetchGameResponse>("/games",{signal:controller.signal})
      .then((res) => {
        setGames(res.data.results)
        setIsLoading(false)
      })
      .catch((err) => {
        if(err instanceof CanceledError) return;
        setError(err.message)
        setIsLoading(false)
      });

      return ()=>controller.abort()
  }, []);

  return {games,error,isLoading,setIsLoading}
}

export default useGames

