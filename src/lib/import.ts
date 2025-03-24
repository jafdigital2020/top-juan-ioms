export function importCSVToDynamicJSON<TData extends object>(
  csvContent: string,
  opts: {
    /**
     * A callback to transform each row of data.
     * Useful for mapping CSV fields to complex JSON structures.
     */
    transformRow?: (row: Record<string, string>) => TData;
    /**
     * Optional callback to handle errors for individual rows.
     */
    onErrorRow?: (row: string, error: Error) => void;
    /**
     * Default values for missing fields.
     */
    defaultValues?: Partial<TData>;
  } = {}
): TData[] {
  const { transformRow, onErrorRow, defaultValues } = opts;

  // Split CSV content into lines and filter out any empty lines
  const lines = csvContent.split("\n").filter((line) => line.trim() !== "");

  if (lines.length < 2) {
    throw new Error("CSV content must include headers and at least one row.");
  }

  // Extract headers from the first line
  const headers = lines[0].split(",").map((header) => header.trim());

  // Process rows dynamically
  const json: TData[] = lines.slice(1).map((line, rowIndex) => {
    try {
      // Split the line into values and clean them
      const values = line.split(",").map((value) =>
        value.replace(/^"|"$/g, "").replace(/""/g, '"').trim()
      );

      // Validate row alignment: ensure values match headers
      if (values.length !== headers.length) {
        throw new Error(
          `Row ${rowIndex + 1} has ${values.length} columns, expected ${headers.length}.`
        );
      }

      // Map headers to values
      const row = headers.reduce<Record<string, string>>((acc, header, index) => {
        acc[header] = values[index] ?? ""; // Use empty string as default
        return acc;
      }, {});

      // Apply default values for missing fields
      const rowWithDefaults = { ...defaultValues, ...row };

      // Apply the transformRow callback if provided
      const transformedRow = transformRow
        ? transformRow(rowWithDefaults)
        : (rowWithDefaults as unknown as TData);

      // Parse nested JSON structures in the transformed row
      Object.keys(transformedRow).forEach((key) => {
        const value = transformedRow[key as keyof TData];
        try {
          if (typeof value === "string" && value.startsWith("{") && value.endsWith("}")) {
            transformedRow[key as keyof TData] = JSON.parse(value);
          } else if (typeof value === "string" && value.startsWith("[") && value.endsWith("]")) {
            transformedRow[key as keyof TData] = JSON.parse(value);
          }
        } catch {
          // Ignore parse errors and keep the value as is
        }
      });

      return transformedRow;
    } catch (error) {
      // Handle row-specific errors
      if (onErrorRow) {
        onErrorRow(line, error as Error);
      } else {
        console.error(`Error processing row ${rowIndex + 1}:`, error);
      }
      return null; // Skip invalid rows
    }
  }).filter((row): row is TData => row !== null);

  return json;
}
