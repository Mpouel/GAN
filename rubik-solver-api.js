export async function solve(scramble) {
    const url = 'https://rubiks-cube-solver.com/ajax'; // hypothetical endpoint
    const params = new URLSearchParams({ scramble, mode: 'kociemba' });
  
    const response = await fetch(`${url}?${params.toString()}`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    });
  
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Solver API error: ${response.status} ${errorText}`);
    }
  
    const data = await response.json();
    // Assuming API returns: { solution: "R U R' U' F2 ..." }
    if (!data.solution) throw new Error('Invalid response from solver API');
    return data.solution;
  }