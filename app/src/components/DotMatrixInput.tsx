type Props = {
  input: number[][];
  onValueChange?: (value: number, i: number, j: number) => void;
};

export const DotMatrixInput = ({ input, onValueChange }: Props) => {
  return (
    <div className="flex flex-col">
      <div className="font-bold">Input</div>
      {[...Array(2).keys()].map((i: number) => {
        return (
          <div key={`row-${i}`} className="flex flex-row gap-1">
            {[...Array(2).keys()].map((j) => {
              return (
                <input
                  className="border"
                  key={`input-${i}-${j}`}
                  value={input[i][j]}
                  type="number"
                  onChange={(e) => {
                    e.preventDefault();

                    console.log("sadfadsf", e.target.value);

                    onValueChange?.(Number(e.target.value), i, j);
                  }}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
