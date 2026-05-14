import type { Chunk as ChunkType } from "../../../types/content";

type ChunkProps = {
  chunk: ChunkType;
};

export const Chunk: React.FC<ChunkProps> = ({ chunk }) => {
  return (
    <div>
      <h1>{chunk.title}</h1>
    </div>
  );
};
