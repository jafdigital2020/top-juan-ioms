

type TableCardProps = {
  title: string;
  headers: string[];
  rows: string[][];
};

const TableCard = ({ title, headers, rows }: TableCardProps) => {
  return (
    <div className="max-w-full rounded overflow-hidden">
      <div className="px-5 py-6  flex justify-between">
        <h2 className="text-md font-bold">{title}</h2>
        <h2 className="text-sm font-semibold text-gray-600 cursor-pointer hover:text-gray-900">
          View all
        </h2>
      </div>
      <hr className="border-base mx-6 pb-3 " />
      <table className="min-w-full ">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="pb-4 px-8 text-gray-600 text-left">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="py-3 px-8 text-sm">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableCard;
