import useData from "./useData";
import { Genre } from "./useGenres";

export interface PlatForm {
  id: number;
  name: string;
  slug: string;
}
export interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: { platform: PlatForm }[];
  metacritic: number;
}

const useGames = (
  selectedGenre: Genre | null,
  selectedPlatForm: PlatForm | null
) =>
  useData<Game>(
    "/games",
    {
      params: {
        genres: selectedGenre?.id,
        platforms: selectedPlatForm?.id,
      },
    },
    [selectedGenre?.id, selectedPlatForm?.id]
  );

export default useGames;
