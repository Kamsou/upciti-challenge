export async function getData() {
  try {
    const response = await fetch('http://localhost:3000/data')
    return response.json()
  }
  catch (error) {
    console.error('Error fetching asset types:', error)
    throw error
  }
};
