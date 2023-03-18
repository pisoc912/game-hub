import { CanceledError } from "axios";
import { useState, useEffect } from "react";
import apiClients from "../services/api-clients";
import { Game } from "./useGames";

interface Genre {
    name:string;
    id:number;
}

interface FetchGenresResponse {
    count:number;
    results:Genre[];
}


const useGenres = () => {
const [genres, setGenres] = useState<Genre[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()
    apiClients
      .get<FetchGenresResponse>("/genres",{signal:controller.signal})
      .then((res) => {
        setGenres(res.data.results)
        setIsLoading(false)
      })
      .catch((err) => {
        if(err instanceof CanceledError) return;
        setError(err.message)
        setIsLoading(false)
      });

      return ()=>controller.abort()
  }, []);

  return {genres,error,isLoading}
}

export default useGenres