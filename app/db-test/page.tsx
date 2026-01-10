
import { getData } from "../actions";

export default async function DbTestPage() {
  let data = null;
  let error = null;

  try {
    data = await getData();
  } catch (e) {
    error = e instanceof Error ? e.message : "An unknown error occurred";
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Neon DB Connection Test</h1>
      
      {error ? (
        <div className="p-4 bg-red-100 text-red-700 rounded-md">
          <h2 className="font-bold">Error:</h2>
          <p>{error}</p>
        </div>
      ) : (
        <div className="p-4 bg-green-100 text-green-700 rounded-md">
          <h2 className="font-bold mb-2">Connection Successful!</h2>
          <div className="bg-white p-4 rounded shadow-sm">
            <h3 className="font-semibold text-gray-700 mb-2">Database Version:</h3>
            <pre className="text-sm overflow-x-auto">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
