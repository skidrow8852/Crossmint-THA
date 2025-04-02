// Helper function to draw a pattern for the Polyanet (based on the dimention of the matrix)
// 1st Challenge to draw Polyanets on Megaverse (11x11 matrix)

export async function generateXPattern(
  size: number,
  postPolyanet: (row: number, column: number) => Promise<void>
) {
  if (size < 3) throw new Error("Size must be at least 3 to draw a pattern.");

  let start1 = { row: Math.floor(size / 4), col: Math.floor(size / 4) };
  let start2 = { row: Math.floor(size / 4), col: size - Math.floor(size / 4) - 1 };
  let start3 = { row: size - Math.floor(size / 4) - 1, col: Math.floor(size / 4) };
  let start4 = { row: size - Math.floor(size / 4) - 1, col: size - Math.floor(size / 4) - 1 };
  const requests: Promise<void>[] = [];

  for (let i = 0; i <= size - Math.floor(size / 2); i++) {
    if (start1.row + i < size && start1.col + i < size) {
      requests.push(postPolyanet(start1.row + i, start1.col + i));
    }
    if (start2.row + i < size && start2.col - i >= 0) {
      requests.push(postPolyanet(start2.row + i, start2.col - i));
    }
    if (start3.row - i >= 0 && start3.col + i < size) {
      requests.push(postPolyanet(start3.row - i, start3.col + i));
    }
    if (start4.row - i >= 0 && start4.col - i >= 0) {
      requests.push(postPolyanet(start4.row - i, start4.col - i));
    }
  }

  await Promise.all(requests);
}

// Delay function to avoind hitting the API rate limit
export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
